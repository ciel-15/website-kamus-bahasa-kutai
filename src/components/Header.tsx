type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: Props) {
  const logoSrc = `${import.meta.env.BASE_URL}images/lembuswana.png`
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <img src={logoSrc} alt="Logo Lembuswana" className="logo" />
          <span className="site-name">Kamus Bahasa Kutai</span>
          <span className="badge">ID</span>
        </div>
        <div className="header-right">
          <a className="nav-link" href="#tentang">Tentang</a>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
            title={theme === 'light' ? 'Mode gelap' : 'Mode terang'}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5h1.5v3H12V2zm0 17h1.5v3H12v-3zM4.22 5.64l1.06-1.06 2.12 2.12-1.06 1.06-2.12-2.12zm12.38 12.38l1.06-1.06 2.12 2.12-1.06 1.06-2.12-2.12zM2 12v-1.5h3V12H2zm17 0v-1.5h3V12h-3zM4.22 18.36l2.12-2.12 1.06 1.06-2.12 2.12-1.06-1.06zM16.6 7.3l2.12-2.12 1.06 1.06-2.12 2.12-1.06-1.06z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
