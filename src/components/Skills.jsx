import { skills } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" className="h-scroll-section" data-h-scroll>
      <div className="h-scroll-inner">
        <div className="h-scroll-head">
          <div className="eyebrow">Stack &amp; Capabilities</div>
          <h2 className="section-title">The toolkit behind the work.</h2>
          <p className="section-lead">I pick tools based on outcomes, not trends. Here's what I reach for most — swipe through.</p>
        </div>

        <div className="h-scroll-track">
          {skills.map((s) => (
            <div className="skill-card" key={s.title}>
              <div className="skill-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map((t) => (<span key={t}>{t}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
