import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP enhancements. Runs once after the preloader has finished.
 *  - Blur fade-up on section headings
 *  - Soft fade + rise on stat cards and testimonials (non-pinned)
 *  - Parallax on project visuals
 *  - Magnetic pull on .btn and [data-magnetic] elements
 *  - Horizontal pin-scroll on [data-h-scroll] sections (desktop)
 */
export function useGsapEnhancements({ enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const fadeUp = (el, { start = 'top 88%', y = 28, duration = 0.8, delay = 0 } = {}) => {
        gsap.fromTo(
          el,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            ease: 'power3.out',
            delay,
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none reverse',
            },
          }
        );
      };

      // Headings — blur fade up
      document.querySelectorAll('.section-title').forEach((el) => {
        const pinnedSection = el.closest('.h-scroll-section, .testimonials-wrap');
        const trigger = pinnedSection || el;
        const start = pinnedSection ? 'top 70%' : 'top 85%';
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, filter: 'blur(16px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            immediateRender: true,
            scrollTrigger: {
              trigger,
              start,
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      document.querySelectorAll('.section-lead').forEach((el) => {
        const pinnedSection = el.closest('.h-scroll-section, .testimonials-wrap');
        const trigger = pinnedSection || el;
        const start = pinnedSection ? 'top 65%' : 'top 88%';
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.12,
            immediateRender: true,
            scrollTrigger: { trigger, start, toggleActions: 'play none none reverse' },
          }
        );
      });
      document.querySelectorAll('.eyebrow').forEach((el) => {
        const pinnedSection = el.closest('.h-scroll-section, .testimonials-wrap');
        const trigger = pinnedSection || el;
        const start = pinnedSection ? 'top 72%' : 'top 90%';
        gsap.fromTo(
          el,
          { y: 16, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            immediateRender: true,
            scrollTrigger: { trigger, start, toggleActions: 'play none none reverse' },
          }
        );
      });
      document.querySelectorAll('.pitch-quote').forEach((el) => {
        fadeUp(el, { y: 32, duration: 1.0, start: 'top 80%' });
      });

      // Project visual parallax
      document.querySelectorAll('.project-visual').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });

      // Stat cards + counters
      document.querySelectorAll('.stat').forEach((el, i) => {
        fadeUp(el, { y: 28, duration: 0.8, delay: i * 0.08, start: 'top 88%' });
      });
      document.querySelectorAll('.stat-num').forEach((el) => {
        const raw = el.textContent.trim();
        const match = raw.match(/^(\d+)(.*)$/);
        if (!match) return;
        const end = parseInt(match[1], 10);
        const suffix = match[2] || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // NOTE: removed .skill-card fade — was re-triggering after horizontal pin ended.
      // NOTE: removed .tl-item fade — no longer exists; timeline uses .htimeline-item inside pinned h-scroll.

      // Magnetic buttons
      const magnets = document.querySelectorAll('.btn, [data-magnetic]');
      magnets.forEach((el) => {
        const strength = 0.3;
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
          gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        el._magCleanup = () => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        };
      });

      // Horizontal pin-scroll sections (desktop only, ≥1025px)
      const horizontalMq = window.matchMedia('(min-width: 1025px)');
      if (horizontalMq.matches) {
        document.querySelectorAll('[data-h-scroll]').forEach((section) => {
          const track = section.querySelector('.h-scroll-track');
          if (!track) return;

          const getMaxX = () => Math.max(0, track.scrollWidth - section.clientWidth);
          if (getMaxX() <= 0) return;

          gsap.to(track, {
            x: () => -getMaxX(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getMaxX() + window.innerHeight * 0.35}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      }

      ScrollTrigger.refresh();
    });

    return () => {
      document.querySelectorAll('.btn, [data-magnetic]').forEach((el) => {
        el._magCleanup?.();
      });
      ctx.revert();
    };
  }, [enabled]);
}
