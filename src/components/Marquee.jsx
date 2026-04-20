const words = [
  'WordPress', 'React', 'PHP', 'Headless CMS', 'GSAP', 'Tailwind', 'GraphQL', 'Performance',
];

function Row() {
  return (
    <span>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <strong>{w}</strong>
          <span className="dot"></span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
