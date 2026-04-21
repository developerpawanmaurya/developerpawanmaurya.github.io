import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const percentRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const percent = percentRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    const root = rootRef.current;
    if (!percent || !ring || !text || !root) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const state = { p: 0, rot: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.pl-orbit-wrap', {
          scale: 0.8,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        });
        gsap.to(root, {
          yPercent: -110,
          duration: 0.95,
          ease: 'power4.inOut',
          onComplete: () => {
            document.body.style.overflow = prevOverflow;
            setDone(true);
            onDone?.();
          },
        }, '-=0.1');
      },
    });

    tl.fromTo('.pl-orbit-wrap', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo(
        text,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.25'
      )
      .to(state, {
        p: 100,
        rot: 360,
        duration: 1.85,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(state.p);
          percent.textContent = `${String(v).padStart(3, '0')}%`;
          ring.style.setProperty('--p', `${v}%`);
          gsap.set(ring, { rotate: state.rot });
        },
      })
      .to({}, { duration: 0.25 });

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [onDone]);

  if (done) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="pl-grain"></div>
      <div className="pl-inner">
        <div className="pl-orbit-wrap">
          <div className="pl-orbit" ref={ringRef}>
            <div className="pl-core"></div>
            <span className="pl-dot pl-dot-a"></span>
            <span className="pl-dot pl-dot-b"></span>
          </div>
          <div className="pl-percent" ref={percentRef}>000%</div>
        </div>
        <div className="pl-row" ref={textRef}>
          <span className="pl-label">Initializing experience</span>
          <span className="pl-sub">Crafting pixels and motion</span>
        </div>
      </div>
    </div>
  );
}
