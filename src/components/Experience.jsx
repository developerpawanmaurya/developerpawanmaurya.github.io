import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section id="experience" className="h-scroll-section exp-section" data-h-scroll>
      <div className="h-scroll-inner">
        <div className="h-scroll-head">
          <div className="eyebrow">Experience</div>
          <h2 className="section-title">Six years, four companies, one obsession: better web.</h2>
        </div>

        <div className="h-scroll-track htimeline">
          <div className="htimeline-line" aria-hidden="true" />
          {experience.map((e, i) => (
            <div className={`htimeline-item ${i % 2 === 0 ? 'above' : 'below'}`} key={e.company + e.date}>
              <div className="htimeline-node" aria-hidden="true" />
              <div className="htimeline-card">
                <div className="tl-date">{e.date}</div>
                <h4>{e.company}</h4>
                <div className="tl-role">{e.role}</div>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
