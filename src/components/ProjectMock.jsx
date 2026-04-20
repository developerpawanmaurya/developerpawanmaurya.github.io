// Stylized browser mockups that vary by project.kind
export default function ProjectMock({ project }) {
  const m = project.mock || {};

  const BrowserBar = () => (
    <div className="mock-browser-bar">
      <span></span><span></span><span></span>
    </div>
  );

  if (m.kind === 'memorres') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #f5a623' }}></div>
            <strong style={{ fontFamily: 'Space Grotesk', fontSize: 15 }}>memorres</strong>
          </div>
          <div className="mock-title" style={{ marginTop: 16, fontSize: 26 }}>Explore Our Blog</div>
          <div style={{ fontSize: 11, color: '#777' }}>Articles on Digital Transformation, Strategy &amp; More</div>
          <div className="mock-pill" style={{ background: '#f5a623', color: '#111', marginTop: 14 }}>Get an Estimate →</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'kiss') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 18 }}>
            KISS <span style={{ color: '#c0392b', fontSize: 10 }}>Professional Solutions</span>
          </div>
          <div className="mock-title" style={{ marginTop: 12, fontSize: 22 }}>Phone systems</div>
          <div style={{ fontSize: 12, color: '#555' }}>Advanced phone systems for modern orgs.</div>
          <div className="mock-pill red">Get a Quote</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'deqollab') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, letterSpacing: '0.15em', fontSize: 16 }}>DEQOLLAB</div>
          <div className="mock-title" style={{ marginTop: 14, fontSize: 22 }}>
            WHERE STORIES BECOME THE MOST POWERFUL ASSET
          </div>
          <div className="mock-line med" style={{ marginTop: 8 }}></div>
          <div className="mock-pill" style={{ background: '#f39c12', color: '#fff' }}>Know More</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'jaipur') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 20, color: '#d63384' }}>Jaipur Pink</div>
          <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.15em' }}>HANDCRAFTED HERITAGE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12 }}>
            <div style={{ aspectRatio: 1, background: '#ffc0d7', borderRadius: 6 }}></div>
            <div style={{ aspectRatio: 1, background: '#ff8fb5', borderRadius: 6 }}></div>
            <div style={{ aspectRatio: 1, background: '#d63384', borderRadius: 6 }}></div>
          </div>
          <div className="mock-pill pink">Shop Collection</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'edutech') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#312e81' }}>LearnHub</div>
          <div className="mock-title" style={{ fontSize: 20, marginTop: 10 }}>Master new skills, online.</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <div style={{ flex: 1, height: 40, background: '#e0e7ff', borderRadius: 6 }}></div>
            <div style={{ flex: 1, height: 40, background: '#c7d2fe', borderRadius: 6 }}></div>
          </div>
          <div className="mock-pill violet">Enroll Now</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'cosmetics') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, letterSpacing: '0.2em', fontSize: 14 }}>LUXE BEAUTY</div>
          <div className="mock-title" style={{ fontSize: 18, marginTop: 10 }}>Curated cosmetics, delivered.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 10 }}>
            <div style={{ aspectRatio: 1, background: '#f3e8ff', borderRadius: 6 }}></div>
            <div style={{ aspectRatio: 1, background: '#e9d5ff', borderRadius: 6 }}></div>
            <div style={{ aspectRatio: 1, background: '#d8b4fe', borderRadius: 6 }}></div>
          </div>
          <div className="mock-pill" style={{ background: '#1a0a1a' }}>Add to Bag</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'leadsguru') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#0891b2' }}>Leads<span style={{ color: '#1e40af' }}>Guru</span></div>
          <div className="mock-title" style={{ marginTop: 10, fontSize: 20 }}>More leads. Less guesswork.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 10 }}>
            <div style={{ height: 36, background: '#e0f2fe', borderRadius: 6 }}></div>
            <div style={{ height: 36, background: '#bae6fd', borderRadius: 6 }}></div>
            <div style={{ height: 36, background: '#0891b2', borderRadius: 6 }}></div>
          </div>
          <div className="mock-pill" style={{ background: '#0891b2' }}>Start Free Trial →</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'jajabor') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#ea580c', letterSpacing: '-0.02em' }}>jajabor<span style={{ color: '#f59e0b' }}>.io</span></div>
          <div className="mock-title" style={{ marginTop: 10, fontSize: 20 }}>Wander, build, ship.</div>
          <div className="mock-line med" style={{ marginTop: 8 }}></div>
          <div className="mock-line short"></div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <div style={{ flex: 1, height: 34, background: '#fed7aa', borderRadius: 6 }}></div>
            <div style={{ flex: 1, height: 34, background: '#fdba74', borderRadius: 6 }}></div>
          </div>
          <div className="mock-pill" style={{ background: '#ea580c' }}>Explore →</div>
        </div>
      </div>
    );
  }

  if (m.kind === 'branded') {
    return (
      <div className="mock-browser">
        <BrowserBar />
        <div className="mock-browser-body">
          <div style={{ color: m.brandColor || '#f97316', fontWeight: 700, fontFamily: 'Space Grotesk', fontSize: 18 }}>
            {m.brand}
          </div>
          <div className="mock-title" style={{ marginTop: 8 }}>{m.title}</div>
          <div style={{ fontSize: 13, color: '#555' }}>{m.subtitle}</div>
          <div className={`mock-pill ${m.pillClass || ''}`}>{m.pillText}</div>
          <div className="mock-line med" style={{ marginTop: 10 }}></div>
          <div className="mock-line short"></div>
        </div>
      </div>
    );
  }

  // generic (PolicyAdvisor)
  return (
    <div className="mock-browser">
      <BrowserBar />
      <div className="mock-browser-body">
        <div className="mock-title">{m.title || 'Your brand here.'}</div>
        <div className="mock-line med"></div>
        <div className="mock-line short"></div>
        <div className={`mock-pill ${m.pillClass || ''}`}>{m.pillText || 'Get Started →'}</div>
        {m.extra === 'tiles' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <div style={{ flex: 1, height: 60, background: '#f4f4f4', borderRadius: 8 }}></div>
            <div style={{ flex: 1, height: 60, background: '#f4f4f4', borderRadius: 8 }}></div>
            <div style={{ flex: 1, height: 60, background: '#ff5e3a', borderRadius: 8 }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
