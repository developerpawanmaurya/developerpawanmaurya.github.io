export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="big-word">PAWAN</div>
        <div>© {new Date().getFullYear()} Pawan Maurya · Senior Web Developer · Kanpur, India</div>
        <div style={{ color: 'var(--ink-fade)', fontSize: 12 }}>Designed &amp; built by me. No templates.</div>
      </div>
    </footer>
  );
}
