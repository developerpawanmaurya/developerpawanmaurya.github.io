import { useState } from 'react';
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
const ChevronDown = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{
      transition: 'transform 0.3s cubic-bezier(.2,.8,.2,1)',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function CaseStudy({ cs }) {
  if (!cs) return null;
  return (
    <div className="case-study">
      <div className="cs-meta">
        {cs.role && (
          <div>
            <div className="cs-label">Role</div>
            <div className="cs-val">{cs.role}</div>
          </div>
        )}
        {cs.timeline && (
          <div>
            <div className="cs-label">Timeline</div>
            <div className="cs-val">{cs.timeline}</div>
          </div>
        )}
      </div>

      {cs.overview && (
        <div className="cs-section">
          <h4>Overview</h4>
          <p>{cs.overview}</p>
        </div>
      )}

      {cs.challenge && (
        <div className="cs-section">
          <h4>The challenge</h4>
          <p>{cs.challenge}</p>
        </div>
      )}

      {cs.approach && cs.approach.length > 0 && (
        <div className="cs-section">
          <h4>Approach</h4>
          <ul>
            {cs.approach.map((a, i) => (<li key={i}>{a}</li>))}
          </ul>
        </div>
      )}

      {cs.stack && cs.stack.length > 0 && (
        <div className="cs-section">
          <h4>Stack</h4>
          <div className="cs-chips">
            {cs.stack.map((t) => (<span key={t}>{t}</span>))}
          </div>
        </div>
      )}

      {cs.outcomes && cs.outcomes.length > 0 && (
        <div className="cs-section">
          <h4>Outcomes</h4>
          <ul>
            {cs.outcomes.map((o, i) => (<li key={i}>{o}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="work">
      <div className="container">
        <div className="eyebrow reveal">Selected Work</div>
        <h2 className="section-title reveal">A few projects I'm proud of.</h2>
        <p className="section-lead reveal">
          Healthcare, fintech, ed-tech, e-commerce — different industries, same standard: fast, clean, and built to last. Click any project to read the full case study.
        </p>

        {projects.map((p, i) => {
          const isOpen = openId === p.id;
          return (
            <article className={`project reveal ${isOpen ? 'is-open' : ''}`} key={p.id}>
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

                <div className="project-actions">
                  {p.caseStudy && (
                    <button
                      type="button"
                      className="project-link cs-toggle"
                      data-hover
                      aria-expanded={isOpen}
                      onClick={() => toggle(p.id)}
                    >
                      {isOpen ? 'Hide case study' : 'Read case study'}
                      <ChevronDown open={isOpen} />
                    </button>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      className="project-link ghost"
                      data-hover
                      {...(p.external ? { target: '_blank', rel: 'noopener' } : {})}
                    >
                      {p.linkLabel}
                      {p.external ? <ArrowOut /> : <ArrowRight />}
                    </a>
                  )}
                </div>
              </div>

              {isOpen && <CaseStudy cs={p.caseStudy} />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
