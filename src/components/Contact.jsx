const cards = [
  { label: 'Email', val: 'developerpawanmaurya@gmail.com', href: 'mailto:developerpawanmaurya@gmail.com', cta: 'Send a message →' },
  { label: 'Phone', val: '+91 91614 77168', href: 'tel:+919161477168', cta: 'Give me a call →' },
  { label: 'LinkedIn', val: '/in/developerpawanmaurya', href: 'https://www.linkedin.com/in/developerpawanmaurya', cta: 'Connect →', external: true },
  { label: 'GitHub', val: '@developerpawanmaurya', href: 'https://github.com/developerpawanmaurya', cta: 'See code →', external: true },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-hero">
          <div className="eyebrow reveal">Let's work together</div>
          <h2 className="reveal">
            Have a project?<br />
            <span className="outline">Let's talk.</span>
          </h2>
          <p className="section-lead reveal">
            I'm currently open to full-time senior front-end / WordPress roles and premium freelance engagements. The fastest way to reach me is email.
          </p>
        </div>

        <div className="contact-grid">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="contact-card reveal"
              data-hover
              {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <div className="label">{c.label}</div>
              <div className="val">{c.val}</div>
              <div className="arrow">{c.cta}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
