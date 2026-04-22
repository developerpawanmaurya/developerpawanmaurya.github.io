import { useEffect, useRef } from 'react';
import { testimonials } from '../data/testimonials.js';

export default function Testimonials() {
  const rowARef = useRef(null);
  const rowBRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rowA = rowARef.current;
    const rowB = rowBRef.current;
    if (!rowA || !rowB) return;

    let rafA, rafB;
    let xA = 0;
    let xB = -rowB.scrollWidth / 2;
    let pausedA = false, pausedB = false;

    const speedA = 0.35;
    const speedB = 0.28;

    const tickA = () => {
      if (!pausedA) {
        xA -= speedA;
        if (Math.abs(xA) >= rowA.scrollWidth / 2) xA = 0;
        rowA.style.transform = `translate3d(${xA}px, 0, 0)`;
      }
      rafA = requestAnimationFrame(tickA);
    };
    const tickB = () => {
      if (!pausedB) {
        xB += speedB;
        if (xB >= 0) xB = -rowB.scrollWidth / 2;
        rowB.style.transform = `translate3d(${xB}px, 0, 0)`;
      }
      rafB = requestAnimationFrame(tickB);
    };

    rafA = requestAnimationFrame(tickA);
    rafB = requestAnimationFrame(tickB);

    const onEnterA = () => { pausedA = true; };
    const onLeaveA = () => { pausedA = false; };
    const onEnterB = () => { pausedB = true; };
    const onLeaveB = () => { pausedB = false; };

    rowA.addEventListener('mouseenter', onEnterA);
    rowA.addEventListener('mouseleave', onLeaveA);
    rowB.addEventListener('mouseenter', onEnterB);
    rowB.addEventListener('mouseleave', onLeaveB);

    return () => {
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
      rowA.removeEventListener('mouseenter', onEnterA);
      rowA.removeEventListener('mouseleave', onLeaveA);
      rowB.removeEventListener('mouseenter', onEnterB);
      rowB.removeEventListener('mouseleave', onLeaveB);
    };
  }, []);

  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);
  const loopA = [...rowA, ...rowA];
  const loopB = [...rowB, ...rowB];

  return (
    <section id="reviews" className="testimonials-wrap">
      <div className="container">
        <div className="eyebrow">Reviews</div>
        <h2 className="section-title">What clients say.</h2>
        <p className="section-lead">
          Real feedback from teams I've shipped for — across healthcare, fintech, and brand consultancies.
        </p>
      </div>

      <div className="tmarquee">
        <div className="tmarquee-row" ref={rowARef}>
          {loopA.map((t, i) => (
            <TestimonialCard t={t} key={`a-${t.id}-${i}`} />
          ))}
        </div>
        <div className="tmarquee-row reverse" ref={rowBRef}>
          {loopB.map((t, i) => (
            <TestimonialCard t={t} key={`b-${t.id}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <article className="tcard">
      <div className="tcard-top">
        <span className="tcard-mark" style={{ color: t.accent }}>&ldquo;</span>
        <div className="tcard-stars" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
          ))}
        </div>
      </div>
      <p className="tcard-quote">{t.quote}</p>
      <div className="tcard-foot">
        <div className="tcard-avatar" style={{ background: `linear-gradient(135deg, ${t.accent}, #1a1a24)` }}>
          <span>{t.initials}</span>
        </div>
        <div className="tcard-who">
          <div className="tcard-name">{t.name}</div>
          <div className="tcard-role">{t.role}</div>
        </div>
      </div>
    </article>
  );
}
