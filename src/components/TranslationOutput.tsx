import { useState } from 'react'

type Props = {
  value: string
  note?: string
  status: 'idle' | 'ok' | 'not_found' | 'partial' | 'empty'
}

export default function TranslationOutput({ value, note, status }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const showPlaceholder = !value
  const display = value || 'Hasil terjemahan akan muncul di sini...'

  return (
    <div className="panel output-panel">
      <div className={`output-text ${showPlaceholder ? 'placeholder' : ''}`}>{display}</div>
      {note && (status === 'not_found' || status === 'partial') && (
        <div className={`note ${status === 'not_found' ? 'note-warn' : 'note-info'}`}>{note}</div>
      )}
      <div className="panel-actions">
        <span className="copy-status">{copied ? 'Tersalin' : ''}</span>
        <button type="button" className="text-btn" onClick={handleCopy} disabled={!value}>
          Salin hasil
        </button>
      </div>
    </div>
  )
}
