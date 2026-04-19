import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero h1 .line > span', {
        yPercent: 110,
        duration: 1.0,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      });
      gsap.from('.hero-tag, .hero-sub, .hero-ctas', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.6,
      });
      gsap.to('.hero-bg', {
        yPercent: 30,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero-bg"></div>
      <div className="grain"></div>
      <div className="container">
        <div className="hero-tag">
          <span className="pulse"></span>
          Available for full-time &amp; premium freelance · Based in Kanpur, India
        </div>
        <h1>
          <span className="line"><span>I build</span></span>
          <span className="line"><span className="italic">fast, beautiful</span></span>
          <span className="line"><span>websites that</span></span>
          <span className="line"><span className="outline">convert.</span></span>
        </h1>
        <p className="hero-sub">
          I'm <strong>Pawan</strong> — a Senior Web Developer with <strong>6+ years</strong> of
          experience shipping production-grade WordPress, React, and headless CMS builds for
          healthcare, fintech, ed-tech and e-commerce. Currently at <strong>PolicyAdvisor</strong>.
        </p>
        <div className="hero-ctas">
          <a href="#work" className="btn btn-primary" data-hover>
            See selected work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-ghost" data-hover>Hire me</a>
        </div>
      </div>
      <div className="hero-meta">
        <div>Scroll</div>
        <div className="scroll-line"></div>
        <div>© {new Date().getFullYear()}</div>
      </div>
    </header>
  );
}
