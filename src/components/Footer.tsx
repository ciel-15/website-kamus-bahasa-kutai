export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" id="tentang">
      <div className="container footer-inner">
        <p className="footer-title">Kamus Bahasa Kutai</p>
        <p className="footer-desc">Media digital untuk mengenal dan melestarikan Bahasa Kutai.</p>
        <p className="footer-copy">&copy; {year} Kamus Bahasa Kutai</p>
      </div>
    </footer>
  )
}
