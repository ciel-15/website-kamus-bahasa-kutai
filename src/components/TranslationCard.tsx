import { useMemo, useState } from 'react'
import LanguageSelector from './LanguageSelector'
import TranslationInput from './TranslationInput'
import TranslationOutput from './TranslationOutput'
import { createTranslator, type Lang } from '../utils/translator'
import data from '../data/kamusKutai.json'

const MAX = 500
const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'kutai', label: 'Bahasa Kutai' },
]

export default function TranslationCard() {
  const translator = useMemo(() => createTranslator(data), [])
  const [from, setFrom] = useState<Lang>('id')
  const [to, setTo] = useState<Lang>('kutai')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [note, setNote] = useState<string | undefined>()
  const [status, setStatus] = useState<'idle' | 'ok' | 'not_found' | 'partial' | 'empty'>('idle')
  const [loading, setLoading] = useState(false)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setOutput('')
    setNote(undefined)
    setStatus('idle')
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setNote(undefined)
    setStatus('idle')
  }

  const translate = () => {
    if (!input.trim()) return
    setLoading(true)
    setTimeout(() => {
      const res = translator.translate(input, from, to)
      setOutput(res.text)
      setNote(res.note)
      setStatus(res.status === 'empty' ? 'idle' : res.status)
      setLoading(false)
    }, 250)
  }

  return (
    <section className="translation-card" aria-label="Penerjemah Bahasa Kutai">
      <div className="lang-row">
        <LanguageSelector id="from-lang" label="TERJEMAHKAN DARI" value={from} onChange={(v) => { setFrom(v); if (v === to) setTo(v === 'id' ? 'kutai' : 'id'); setOutput(''); setNote(undefined); setStatus('idle') }} options={OPTIONS} />
        <button type="button" className="swap-btn" onClick={swap} aria-label="Tukar bahasa">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M7 7h11l-3.5-3.5 1.42-1.42L21.84 8l-5.92 5.92-1.42-1.42L18 9H7V7zm10 10H6l3.5 3.5-1.42 1.42L2.16 16l5.92-5.92 1.42 1.42L6 15h11v2z"/></svg>
        </button>
        <LanguageSelector id="to-lang" label="TERJEMAHKAN KE" value={to} onChange={(v) => { setTo(v); if (v === from) setFrom(v === 'id' ? 'kutai' : 'id'); setOutput(''); setNote(undefined); setStatus('idle') }} options={OPTIONS} />
      </div>

      <div className="panes">
        <TranslationInput value={input} onChange={setInput} onClear={clearAll} maxLength={MAX} />
        <TranslationOutput value={output} note={note} status={status} />
      </div>

      <div className="card-footer">
        <button type="button" className="btn-secondary" onClick={clearAll}>Hapus</button>
        <button type="button" className="btn-primary" onClick={translate} disabled={!input.trim() || loading}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
          {loading ? 'Menerjemahkan...' : 'Terjemahkan'}
        </button>
      </div>
    </section>
  )
}
