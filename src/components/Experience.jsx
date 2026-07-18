import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/experience.js';

gsap.registerPlugin(ScrollTrigger);

// Icons for the timeline markers — one per role, all in a consistent style.
const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c-1 1-1 3-1 3s2 0 3-1l3-3M14 9l1 1M21 3s-3 0-6 1c-3 1-6 4-7 7l5 5c3-1 6-4 7-7 1-3 1-6 1-6zM9 11l-3 1-2-2 4-2"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5-9 5-9-5 9-5z"/>
      <path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"/>
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>
    </svg>
  ),
};

export default function Experience() {
  const sectionRef = useRef(null);
  const railFillRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = railFillRef.current;
    if (!section || !fill) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const setProgress = (p) => fill.style.setProperty('--p', p);
      const markers = Array.from(section.querySelectorAll('.vexp-marker'));
      const rows = Array.from(section.querySelectorAll('.vexp-row'));

      setProgress(0);
      if (reduced) {
        setProgress(1);
        markers.forEach((m) => m.classList.add('is-active'));
        rows.forEach((r) => r.classList.add('is-active'));
        return;
      }

      // Heading entrance — owned by Experience so the global hooks can't hide it.
      gsap.from(section.querySelectorAll('.vexp-head > *'), {
        y: 40, opacity: 0,
        duration: 0.85, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      // Per-row entrance + per-row activation. Each marker activates as
      // soon as its card enters the viewport, not when it's halfway through.
      const rowTriggers = rows.map((row, i) => {
        gsap.fromTo(
          row,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: (i % 2) * 0.05,
          }
        );
        return ScrollTrigger.create({
          trigger: row,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => {
            row.classList.add('is-active');
            markers[i] && markers[i].classList.add('is-active');
          },
          onEnterBack: () => {
            row.classList.add('is-active');
            markers[i] && markers[i].classList.add('is-active');
          },
          onLeave: () => {
            // Stay active once seen (looks better than flickering off).
          },
          onLeaveBack: () => {
            row.classList.remove('is-active');
            markers[i] && markers[i].classList.remove('is-active');
          },
        });
      });

      // Progress rail — fills as user scrolls through the timeline.
      const railTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        end: 'bottom 40%',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (s) => setProgress(s.progress),
        onRefresh: (s) => setProgress(s.progress),
      });

      // Card hover-tilt.
      const cards = Array.from(section.querySelectorAll('.vexp-card'));
      cards.forEach((card) => {
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--rx', (-y * 4).toFixed(2) + 'deg');
          card.style.setProperty('--ry', (x * 5).toFixed(2) + 'deg');
          card.style.setProperty('--mx', (x * 100 + 50).toFixed(1) + '%');
          card.style.setProperty('--my', (y * 100 + 50).toFixed(1) + '%');
        };
        const onLeave = () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        card._cleanup = () => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        };
      });

      const settle = setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => {
        clearTimeout(settle);
        railTrigger.kill();
        rowTriggers.forEach((t) => t.kill());
        cards.forEach((c) => c._cleanup && c._cleanup());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="vexp">
      <div className="vexp-bg" aria-hidden="true" />
      <div className="container">
        <header className="vexp-head">
          <div className="vexp-tag">Experience</div>
          <h2 className="vexp-headline">Six years, four companies, one obsession: better web.</h2>
          <p className="vexp-intro">
            From intern to engineering manager — every role added a new instrument to the toolkit.
            Scroll through the milestones, the lessons, and the occasional production fire.
          </p>
        </header>

        <div className="vexp-timeline">
          <div className="vexp-rail" aria-hidden="true">
            <div className="vexp-rail-fill" ref={railFillRef} />
          </div>

          {experience.map((e, i) => (
            <div className="vexp-row" key={e.company + e.date}>
              <aside className="vexp-side">
                <div className="vexp-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="vexp-period">{e.date}</div>
                {e.location && <div className="vexp-location">{e.location}</div>}
              </aside>

              <div className="vexp-marker" aria-hidden="true">
                <div className="vexp-marker-ring" />
                <div className="vexp-marker-dot">
                  <span className="vexp-marker-icon">
                    {ICONS[e.icon] || ICONS.briefcase}
                  </span>
                </div>
                <div className="vexp-marker-pulse" />
              </div>

              <article className="vexp-card">
                <div className="vexp-card-glow" aria-hidden="true" />
                <h3 className="vexp-company">{e.company}</h3>
                <div className="vexp-role">{e.role}</div>
                <p className="vexp-desc">{e.desc}</p>
                {e.tags && (
                  <div className="vexp-tags">
                    {e.tags.map((t) => (<span key={t}>{t}</span>))}
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
