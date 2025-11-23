'use client';

export default function Footer() {
  return (
    <footer
      style={{ background: 'var(--deep-charcoal)', color: 'var(--warm-cream)', padding: '40px 0' }}
    >
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <div style={{ fontWeight: 700 }}>© {new Date().getFullYear()} Sumanth Udupi</div>
          <div style={{ opacity: 0.85, fontSize: 14 }}>Built with care and a few Easter eggs.</div>
        </div>
        <div>
          <a href="#" style={{ color: 'var(--warm-cream)', marginRight: 12 }}>
            Privacy
          </a>
          <a href="#" style={{ color: 'var(--warm-cream)' }}>
            Credits
          </a>
        </div>
      </div>
    </footer>
  );
}
