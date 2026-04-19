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
          I don't just write code — I ship products people love using.
        </h2>
        <div className="about-grid">
          <div className="reveal">
            <p>
              Six years ago I started as an intern writing HTML and jQuery. Today, I lead end-to-end web builds — from gathering stakeholder requirements and architecting scalable WordPress or React solutions, to shipping, monitoring, and squeezing every last millisecond out of page loads.
            </p>
            <p>
              At <strong>PolicyAdvisor</strong>, I keep the primary site at <strong>99.9% uptime</strong>, rebuilt the blog to improve load time <strong>~30%</strong> and lift Lighthouse by <strong>25 points</strong>, and shipped custom PHP plugins that turned marketing ideas into real revenue tools.
            </p>
            <p>
              Before that I mentored junior devs at Memorres, freelanced across healthcare, ed-tech and e-commerce, and cut my teeth at Infinity Pillars building an ed-tech platform from scratch.
            </p>
            <p>
              <strong>What I care about:</strong> performance budgets, accessibility, clean PHP/JS, a design system that doesn't collapse under pressure, and shipping on time.
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
