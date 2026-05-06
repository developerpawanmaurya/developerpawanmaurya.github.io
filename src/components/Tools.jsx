import { useEffect, useRef } from 'react';
import { tools } from '../data/tools.js';

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export default function Tools() {
  const gridRef = useRef(null);

  // Cursor-following radial glow on each tool card.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      const card = e.target.closest('.tool-card');
      if (!card || !grid.contains(card)) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    };

    grid.addEventListener('mousemove', onMove);
    return () => grid.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="tools" className="tools-section">
      <div className="container">
        <div className="eyebrow reveal">Side Builds</div>
        <h2 className="section-title reveal">
          Small tools, shipped for the joy of it.
        </h2>
        <p className="section-lead reveal">
          Quick utilities I built between projects — every one of them live, browser-based, and free.
          More are coming.
        </p>

        <div className="tools-grid" ref={gridRef}>
          {tools.map((t) => {
            const isLink = !!t.href;
            const Tag = isLink ? 'a' : 'div';
            const linkProps = isLink
              ? { href: t.href, target: '_blank', rel: 'noopener', 'data-hover': true }
              : {};
            return (
              <Tag
                key={t.id}
                className={`tool-card reveal accent-${t.accent}${t.soon ? ' is-soon' : ''}`}
                {...linkProps}
              >
                <div className="tool-glyph" aria-hidden="true">{t.glyph}</div>
                <div className="tool-head">
                  <h4>{t.name}</h4>
                  <span className="tool-arrow" aria-hidden="true">
                    {isLink ? <ArrowOut /> : null}
                  </span>
                </div>
                <p className="tool-tagline">{t.tagline}</p>
                <p className="tool-desc">{t.desc}</p>
                <div className="tool-tags">
                  {t.tags.map((tag) => (<span key={tag}>{tag}</span>))}
                </div>
                {isLink && (
                  <div className="tool-cta">
                    <span>Open tool</span>
                    <ArrowOut />
                  </div>
                )}
                {t.soon && (
                  <div className="tool-cta soon">
                    <span>Brewing</span>
                    <span className="dot-pulse" aria-hidden="true" />
                  </div>
                )}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
