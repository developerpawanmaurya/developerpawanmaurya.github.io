import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="eyebrow reveal">Experience</div>
        <h2 className="section-title reveal">Six years, four companies, one obsession: better web.</h2>

        <div className="timeline">
          {experience.map((e) => (
            <div className="tl-item reveal" key={e.company + e.date}>
              <div className="tl-date">{e.date}</div>
              <h4>{e.company}</h4>
              <div className="tl-role">{e.role}</div>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
