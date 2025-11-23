'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';
import { useAchievements } from './AchievementProvider';

export default function Header() {
  const [clicks, setClicks] = useState(0);
  const [logoStyle, setLogoStyle] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const { unlock } = useAchievements() || {};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Milestone Markers Easter Egg
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.25 && scrollPercent < 0.26) {
          // Trigger subtle notification/state could go here
      }
      if (scrollPercent >= 0.99) {
           try {
             // This would be where 'Journey Complete' triggers
          } catch (e) {}
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault && e.preventDefault();
    const next = clicks + 1;
    setClicks(next);

    // Logo transformations
    const transforms = [
      'rotate(5deg)',
      'scale(1.1)',
      'rotate(-5deg)',
      'scale(0.9)',
      'rotate(3deg)',
      'scale(1.05)',
      'rotate(0) scale(1)',
    ];

    setLogoStyle({
        transform: transforms[Math.min(next - 1, transforms.length - 1)],
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });

    if (next === 7) {
      try {
        unlock && unlock('patient-explorer');
        // In a real implementation, this would open the Creative Process Timeline
      } catch (e) {}
      setClicks(0);
      setTimeout(() => setLogoStyle({ transform: 'none' }), 500);
    }
  };

  return (
    <>
    <header className={`site-header container ${scrolled ? 'scrolled' : ''}`}>
       <style jsx>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.3s ease;
          padding: 24px 24px;
          width: 100%;
          max-width: var(--max-content-width);
          margin: 0 auto;
          background: transparent;
        }
        .site-header.scrolled {
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .logo a {
            text-decoration: none;
            color: var(--deep-charcoal);
            font-size: 24px;
            display: inline-block;
        }
        nav a {
            text-decoration: none;
            color: var(--warm-brown);
            font-weight: 500;
            position: relative;
            transition: color 0.2s;
        }
        nav a:hover {
            color: var(--terracotta);
        }
        nav a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--terracotta);
            transition: width 0.3s ease;
        }
        nav a:hover::after {
            width: 100%;
        }
      `}</style>
      <div className="logo">
        <a href="#" onClick={handleLogoClick} style={logoStyle}>
          Sumanth Udupi
        </a>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link href="#projects">Projects</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        <ThemeToggle />
      </nav>
    </header>
    {/* Spacer to prevent content jump since header is fixed */}
    <div style={{ height: 80 }} />
    </>
  );
}
