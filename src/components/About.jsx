import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../data/experience.js';

export default function About() {
  const statsRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      statsRef.current.querySelectorAll('.stat-num').forEach((el) => {
        const text = el.textContent.trim();
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const num = parseFloat(text.replace(/[^\d.]/g, ''));
        if (Number.isNaN(num)) return;
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: num,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                const display = num % 1 === 0 ? Math.round(obj.v) : obj.v.toFixed(1);
                el.textContent = display + (hasPercent ? '%' : hasPlus ? '+' : '');
              },
            });
          },
        });
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="eyebrow reveal">About</div>
        <h2 className="section-title reveal">
          I don't just build websites. I engineer AI-augmented digital solutions that accelerate your business.
        </h2>
        <div className="about-grid">
          <div className="reveal">
            <p>
              Six years ago I started as an intern writing HTML and jQuery. Today, I lead end-to-end web builds and run engineering teams — from gathering stakeholder briefs and architecting scalable WordPress or React solutions, to shipping, monitoring, and squeezing every last millisecond out of page loads.
            </p>
            <p>
              At <strong>PolicyAdvisor</strong>, I sustain <strong>99.9% uptime</strong>, drove a site-wide overhaul that cut load time by <strong>~30%</strong> and lifted Lighthouse by <strong>25 points</strong>, and pioneered <strong>LLM-powered automation</strong> inside the WordPress stack — turning prompt engineering into shipped, revenue-driving features.
            </p>
            <p>
              I'm equally comfortable writing PHP and React, leading a team of devs through Agile sprints, and translating senior-stakeholder asks into clean technical roadmaps. Before PolicyAdvisor I mentored juniors at Memorres, freelanced across healthcare, ed-tech and e-commerce, and built an ed-tech platform from scratch at Infinity Pillars.
            </p>
            <p>
              <strong>What I care about:</strong> performance budgets, accessibility, clean architecture, AI-driven workflows that actually save hours, and a design system that doesn't collapse under pressure.
            </p>
            <div className="signature">— Pawan</div>
          </div>
          <div className="stats reveal" ref={statsRef}>
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
