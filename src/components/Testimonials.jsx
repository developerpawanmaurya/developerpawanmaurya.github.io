import { useEffect, useRef } from 'react';
import { testimonials } from '../data/testimonials.js';

/**
 * Auto-scroll + drag/swipe over a horizontally-scrollable row.
 * direction:  +1 → content moves left (scrollLeft increases)
 *             -1 → content moves right (scrollLeft decreases)
 */
function useDragScroll(elRef, { speed = 0.4, direction = 1 } = {}) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const state = {
      isDown: false,
      startX: 0,
      startScroll: 0,
      lastX: 0,
      velocity: 0,
      auto: true,
      resumeTimer: null,
    };

    // Wait for layout — start scrolling once we have real width.
    const init = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return false;
      if (direction < 0) el.scrollLeft = half;
      return true;
    };
    let initialized = init();

    let raf;
    const loop = () => {
      const half = el.scrollWidth / 2;
      if (!initialized) initialized = init();

      if (initialized && half > 0) {
        if (state.auto && !state.isDown) {
          el.scrollLeft += speed * direction;
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          else if (el.scrollLeft < 0) el.scrollLeft += half;
        } else if (!state.isDown && Math.abs(state.velocity) > 0.1) {
          el.scrollLeft -= state.velocity;
          state.velocity *= 0.94;
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          else if (el.scrollLeft < 0) el.scrollLeft += half;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = (e) => {
      state.isDown = true;
      state.startX = e.pageX ?? (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
      state.lastX = state.startX;
      state.startScroll = el.scrollLeft;
      state.velocity = 0;
      state.auto = false;
      clearTimeout(state.resumeTimer);
      el.classList.add('dragging');
    };
    const onMove = (e) => {
      if (!state.isDown) return;
      const x = e.pageX ?? (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
      const walk = x - state.startX;
      el.scrollLeft = state.startScroll - walk;
      state.velocity = x - state.lastX;
      state.lastX = x;
      if (e.cancelable && e.type === 'touchmove') e.preventDefault();
    };
    const onUp = () => {
      if (!state.isDown) return;
      state.isDown = false;
      el.classList.remove('dragging');
      // Resume auto-scroll after the user stops interacting.
      state.resumeTimer = setTimeout(() => { state.auto = true; }, 1200);
    };
    const onEnter = () => {
      // Slow but DON'T fully stop — keeps motion alive while reading.
      state.auto = false;
      clearTimeout(state.resumeTimer);
      state.resumeTimer = setTimeout(() => { state.auto = true; }, 800);
    };
    const onLeave = () => {
      if (state.isDown) return;
      state.auto = true;
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(state.resumeTimer);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [elRef, speed, direction]);
}

function TestimonialCard({ t }) {
  return (
    <article className="tcard">
      <div className="tcard-top">
        <span className="tcard-mark" style={{ color: t.accent }}>&ldquo;</span>
        <div className="tcard-stars" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
            </svg>
          ))}
        </div>
      </div>
      <p className="tcard-quote">{t.quote}</p>
      <div className="tcard-foot">
        <div className="tcard-avatar" style={{ background: 'linear-gradient(135deg, ' + t.accent + ', #1a1a24)' }}>
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

export default function Testimonials() {
  const rowARef = useRef(null);
  const rowBRef = useRef(null);
  useDragScroll(rowARef, { speed: 0.4, direction: 1 });
  useDragScroll(rowBRef, { speed: 0.32, direction: -1 });

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
          Real feedback from teams I've shipped for — across healthcare, fintech, and brand consultancies. Hover to pause · drag to browse.
        </p>
      </div>

      <div className="tmarquee">
        <div className="tmarquee-row" ref={rowARef}>
          <div className="tmarquee-track">
            {loopA.map((t, i) => (<TestimonialCard t={t} key={'a-' + t.id + '-' + i} />))}
          </div>
        </div>
        <div className="tmarquee-row" ref={rowBRef}>
          <div className="tmarquee-track">
            {loopB.map((t, i) => (<TestimonialCard t={t} key={'b-' + t.id + '-' + i} />))}
          </div>
        </div>
      </div>
      <div className="tmarquee-hint">drag · swipe →</div>
    </section>
  );
}
