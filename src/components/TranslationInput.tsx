type Props = {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  maxLength: number
}

export default function TranslationInput({ value, onChange, onClear, maxLength }: Props) {
  return (
    <div className="panel">
      <textarea
        className="text-area"
        placeholder="Ketik atau paste teks di sini..."
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="panel-actions">
        <span className="char-count">{value.length}/{maxLength}</span>
        {value && (
          <button type="button" className="text-btn" onClick={onClear} aria-label="Hapus teks">
            Hapus teks
          </button>
        )}
      </div>
    </div>
  )
}
