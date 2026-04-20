import { useEffect, useRef } from 'react';

const words = [
  'WordPress', 'React', 'Next.js', 'PHP', 'Headless CMS', 'GSAP',
  'Tailwind', 'GraphQL', 'WooCommerce', 'Gutenberg', 'Performance', 'SEO',
];

export default function Marquee() {
  const trackRef = useRef(null);
  const stateRef = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    velocity: 0,
    lastX: 0,
    auto: true,
    resumeTimer: null,
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf;
    const speed = 1.2; // px per frame — ~2x faster

    const loop = () => {
      const s = stateRef.current;
      if (s.auto && !s.isDown) {
        el.scrollLeft += speed;
        // loop: reset once we pass half (since content is duplicated)
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      } else if (!s.isDown && Math.abs(s.velocity) > 0.1) {
        // inertia
        el.scrollLeft -= s.velocity;
        s.velocity *= 0.95;
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = (e) => {
      const s = stateRef.current;
      s.isDown = true;
      s.startX = e.pageX ?? e.touches?.[0].pageX;
      s.lastX = s.startX;
      s.startScroll = el.scrollLeft;
      s.velocity = 0;
      s.auto = false;
      clearTimeout(s.resumeTimer);
      el.classList.add('dragging');
    };
    const onMove = (e) => {
      const s = stateRef.current;
      if (!s.isDown) return;
      const x = e.pageX ?? e.touches?.[0].pageX;
      const walk = x - s.startX;
      el.scrollLeft = s.startScroll - walk;
      s.velocity = x - s.lastX;
      s.lastX = x;
      if (e.cancelable) e.preventDefault();
    };
    const onUp = () => {
      const s = stateRef.current;
      if (!s.isDown) return;
      s.isDown = false;
      el.classList.remove('dragging');
      // Resume auto-scroll after user is idle for a moment
      s.resumeTimer = setTimeout(() => { s.auto = true; }, 1800);
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(stateRef.current.resumeTimer);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  // Duplicate the list so the loop is seamless
  const list = [...words, ...words];

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        {list.map((w, i) => (
          <span key={i} className="marquee-item">
            <strong>{w}</strong>
            <span className="dot"></span>
          </span>
        ))}
      </div>
      <div className="marquee-hint">drag →</div>
    </div>
  );
}
