'use client';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="copyright">© {new Date().getFullYear()} Sumanth Udupi</div>
          <div className="tagline">Built with care and a few Easter eggs.</div>
        </div>
        <div className="footer-right">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Credits</a>
        </div>
      </div>
      <style jsx>{`
        .site-footer {
          background-color: var(--footer-bg);
          color: var(--footer-text);
          padding: 60px 0;
          margin-top: 80px;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .copyright {
          font-weight: 700;
          font-family: var(--font-fraunces);
          margin-bottom: 8px;
        }
        .tagline {
          opacity: 0.7;
          font-size: 14px;
          font-family: var(--font-inter);
        }
        .footer-link {
          color: var(--footer-text);
          margin-left: 24px;
          font-size: 14px;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }
        .footer-link:hover {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 32px;
            text-align: center;
            align-items: center;
          }
          .footer-link {
            margin: 0 12px;
          }
        }
      `}</style>
    </footer>
  );
}
