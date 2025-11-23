'use client';
import { useAchievements } from './AchievementProvider';

export default function Footer() {
  const { achievements } = useAchievements() || { achievements: [] };
  const unlockedCount = achievements?.filter(a => a.unlocked).length || 0;
  const totalCount = achievements?.length || 0;

  return (
    <footer
      style={{ background: 'var(--deep-charcoal)', color: 'var(--warm-cream)', padding: '80px 0 40px' }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 60 }}>
            <div>
                <h3 style={{ fontFamily: 'var(--font-fraunces, serif)', marginBottom: 24 }}>Navigate</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <li><a href="#" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>Home</a></li>
                    <li><a href="#about" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>About</a></li>
                    <li><a href="#projects" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>Projects</a></li>
                    <li><a href="#contact" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>Contact</a></li>
                </ul>
            </div>

            <div>
                <h3 style={{ fontFamily: 'var(--font-fraunces, serif)', marginBottom: 24 }}>Connect</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <li><a href="#" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>Email</a></li>
                    <li><a href="#" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>LinkedIn</a></li>
                    <li><a href="#" style={{ color: 'var(--warm-cream)', textDecoration: 'none', opacity: 0.8 }}>GitHub</a></li>
                </ul>
            </div>

            <div>
                <h3 style={{ fontFamily: 'var(--font-fraunces, serif)', marginBottom: 24 }}>Exploration</h3>
                <div style={{ opacity: 0.8, marginBottom: 16 }}>
                    This site rewards curiosity 👀
                </div>
                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: 8,
                    display: 'inline-block',
                    fontSize: 14
                }}>
                    {unlockedCount} / {totalCount} Discoveries Found
                </div>
            </div>
        </div>

        <div
            style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: 32,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16
            }}
        >
            <div>
            <div style={{ fontWeight: 600 }}>© {new Date().getFullYear()} Sumanth Udupi</div>
            <div style={{ opacity: 0.6, fontSize: 14, marginTop: 4 }}>Built with care, React, and a few Easter eggs.</div>
            </div>
            <div style={{ fontSize: 14 }}>
            <a href="#" style={{ color: 'var(--warm-cream)', marginRight: 24, opacity: 0.6, textDecoration: 'none' }}>
                Privacy
            </a>
            <a href="#" style={{ color: 'var(--warm-cream)', opacity: 0.6, textDecoration: 'none' }}>
                Credits
            </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
