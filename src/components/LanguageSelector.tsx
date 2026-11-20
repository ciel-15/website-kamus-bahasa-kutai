import type { Lang } from '../utils/translator'

type Props = {
  label: string
  value: Lang
  onChange: (value: Lang) => void
  options: { value: Lang; label: string }[]
  id: string
}

export default function LanguageSelector({ label, value, onChange, options, id }: Props) {
  return (
    <label className="lang-select" htmlFor={id}>
      <span className="lang-label">{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as Lang)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
