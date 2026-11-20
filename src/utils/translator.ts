export type Lang = 'id' | 'kutai'

export type DictionaryEntry = {
  indonesia: string
  kutai: string
  keterangan?: string
  contoh?: string
}

export type TranslateStatus = 'ok' | 'not_found' | 'partial' | 'empty'

export type TranslateResult = {
  text: string
  status: TranslateStatus
  note?: string
}

const normalizeKey = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase()

const buildMaps = (entries: DictionaryEntry[]) => {
  const idToKutai = new Map<string, string>()
  const kutaiToId = new Map<string, string>()
  for (const e of entries) {
    const idKey = normalizeKey(e.indonesia)
    const ktKey = normalizeKey(e.kutai)
    if (idKey && !idToKutai.has(idKey)) idToKutai.set(idKey, e.kutai)
    if (ktKey && !kutaiToId.has(ktKey)) kutaiToId.set(ktKey, e.indonesia)
  }
  return { idToKutai, kutaiToId }
}

const splitToken = (token: string) => {
  const m = token.match(/^([\p{P}\p{S}]*)(.*?)([\p{P}\p{S}]*)$/u)
  if (!m) return { lead: '', core: token, trail: '' }
  return { lead: m[1], core: m[2], trail: m[3] }
}

export const createTranslator = (entries: DictionaryEntry[]) => {
  const { idToKutai, kutaiToId } = buildMaps(entries)

  const translate = (input: string, from: Lang, to: Lang): TranslateResult => {
    const raw = input ?? ''
    if (!raw.trim()) return { text: '', status: 'empty' }

    const map = from === 'id' && to === 'kutai' ? idToKutai : kutaiToId
    const normalized = normalizeKey(raw)
    const direct = map.get(normalized)
    if (direct) return { text: direct, status: 'ok' }

    const tokens = raw.trim().split(/\s+/)
    if (tokens.length === 1) {
      return {
        text: '',
        status: 'not_found',
        note: 'Kata belum ditemukan dalam database kamus.',
      }
    }

    const missing: string[] = []
    const out = tokens.map((tok) => {
      const { lead, core, trail } = splitToken(tok)
      if (!core) return tok
      const found = map.get(normalizeKey(core))
      if (found) return `${lead}${found}${trail}`
      missing.push(core)
      return `${lead}${core}${trail}`
    })

    if (missing.length === tokens.filter((t) => splitToken(t).core).length) {
      return {
        text: '',
        status: 'not_found',
        note: 'Kata belum ditemukan dalam database kamus.',
      }
    }

    const uniqMissing = Array.from(new Set(missing.map((m) => m.toLowerCase())))
    return {
      text: out.join(' '),
      status: 'partial',
      note: `Beberapa kata belum ditemukan dalam database kamus: ${uniqMissing.join(', ')}.`,
    }
  }

  return { translate }
}
