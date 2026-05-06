import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/experience.js';

gsap.registerPlugin(ScrollTrigger);

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
      const markers = section.querySelectorAll('.vexp-marker');
      const rows = section.querySelectorAll('.vexp-row');
      const updateActive = (p) => {
        markers.forEach((m, i) => {
          const t = (i + 0.5) / Math.max(1, markers.length);
          const on = p >= t;
          m.classList.toggle('is-active', on);
          rows[i] && rows[i].classList.toggle('is-active', on);
        });
      };

      setProgress(0);
      if (reduced) {
        setProgress(1);
        markers.forEach((m) => m.classList.add('is-active'));
        rows.forEach((r) => r.classList.add('is-active'));
        return;
      }

      // Heading entrance — owned by Experience so the global hooks can't hide it.
      gsap.from(section.querySelectorAll('.vexp-head > *'), {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Card rows — stagger in as each enters viewport.
      rows.forEach((row, i) => {
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
      });

      // Progress rail — drives fill + marker activation.
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 35%',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (s) => { setProgress(s.progress); updateActive(s.progress); },
        onRefresh: (s) => { setProgress(s.progress); updateActive(s.progress); },
      });

      // Card hover-tilt.
      const cards = section.querySelectorAll('.vexp-card');
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
        trigger.kill();
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
                  <span className="vexp-marker-letter">{e.company.charAt(0)}</span>
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
