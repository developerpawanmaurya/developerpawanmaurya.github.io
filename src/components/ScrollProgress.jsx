import { useEffect, useRef } from 'react';

/**
 * Thin gradient progress bar fixed to the top of the viewport.
 * Reflects how far the user has scrolled through the page.
 */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;

    const update = () => {
      raf = null;
      const doc = document.documentElement;
      const scrollable = (doc.scrollHeight - doc.clientHeight) || 1;
      const progress = Math.min(1, Math.max(0, doc.scrollTop / scrollable));
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
