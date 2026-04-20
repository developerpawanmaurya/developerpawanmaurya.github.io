import { projects } from '../data/projects.js';
import ProjectMock from './ProjectMock.jsx';

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function Projects() {
  return (
    <section id="work">
      <div className="container">
        <div className="eyebrow reveal">Selected Work</div>
        <h2 className="section-title reveal">A few projects I'm proud of.</h2>
        <p className="section-lead reveal">
          Healthcare, fintech, ed-tech, e-commerce — different industries, same standard: fast, clean, and built to last.
        </p>

        {projects.map((p, i) => (
          <article className="project reveal" key={p.id}>
            <div className={`project-visual ${p.bgClass}`}>
              <div
                className="badge"
                style={p.badgeDark ? { color: '#333', borderColor: 'rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.05)' } : undefined}
              >
                {p.badge}
              </div>
              <ProjectMock project={p} />
            </div>
            <div className="project-info">
              <div className="project-meta">
                <span className="project-num">{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                <span>·</span>
                <span>{p.meta}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tech-list">
                {p.tech.map((t) => (<span key={t}>{t}</span>))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  className="project-link"
                  data-hover
                  {...(p.external ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {p.linkLabel}
                  {p.external ? <ArrowOut /> : <ArrowRight />}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
