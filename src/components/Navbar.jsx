import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#top" className="logo">
        <div className="logo-mark"><span>P</span></div>
        Pawan Maurya
      </a>
      <div className="nav-links">
        <a href="#work" data-hover>Work</a>
        <a href="#about" data-hover>About</a>
        <a href="#skills" data-hover>Skills</a>
        <a href="#experience" data-hover>Experience</a>
        <a href="#contact" className="cta" data-hover>Let's talk</a>
      </div>
    </nav>
  );
}
