import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;
    let visible = false;

    const show = () => {
      if (!visible) {
        visible = true;
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
      }
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      show();
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const onLeave = () => {
      visible = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };

    const loop = () => {
      rx += (mx - rx) * 0.35;
      ry += (my - ry) * 0.35;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    // Hover effect delegation — catches elements added later too.
    // Headings (h1..h4) also trigger the hover state.
    const HOVER_SEL = 'a, button, [data-hover], h1, h2, h3, h4';
    const onOver = (e) => {
      if (e.target.closest(HOVER_SEL)) {
        document.body.classList.add('hovering');
      }
    };
    const onOut = (e) => {
      if (e.target.closest(HOVER_SEL)) {
        document.body.classList.remove('hovering');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Click pulse
    const onDown = () => document.body.classList.add('clicking');
    const onUp = () => document.body.classList.remove('clicking');
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}
