import { skills } from '../data/skills.js';

export default function Skills() {
  return (
    <div className="skills-wrap">
      <section id="skills">
        <div className="container">
          <div className="eyebrow reveal">Stack &amp; Capabilities</div>
          <h2 className="section-title reveal">The toolkit behind the work.</h2>
          <p className="section-lead reveal">I pick tools based on outcomes, not trends. Here's what I reach for most.</p>

          <div className="skill-grid">
            {skills.map((s) => (
              <div className="skill-card reveal" key={s.title}>
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
    </div>
  );
}
