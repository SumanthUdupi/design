'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { useAchievements } from './AchievementProvider';

export default function Header() {
  const [clicks, setClicks] = useState(0);
  const { unlock } = useAchievements() || {};

  const handleLogoClick = (e) => {
    e.preventDefault && e.preventDefault();
    const next = clicks + 1;
    setClicks(next);

    if (next === 7) {
      try {
        unlock && unlock('patient-explorer');
      } catch (err) {
        console.error('Failed to unlock achievement', err);
      }
      setClicks(0);
    }
  };

  return (
    <header className="site-header container">
      <div className="logo">
        <Link href="/" onClick={handleLogoClick}>
          Sumanth Udupi
        </Link>
      </div>
      <nav className="main-nav">
        <Link href="#projects" className="nav-link">Projects</Link>
        <Link href="#about" className="nav-link">About</Link>
        <Link href="#contact" className="nav-link">Contact</Link>
        <ThemeToggle />
      </nav>
      <style jsx>{`
        .main-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          font-family: var(--font-inter);
          font-weight: 500;
          font-size: 16px;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--terracotta);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        @media (max-width: 768px) {
          .main-nav {
            display: none; /* Todo: Mobile Menu */
          }
        }
      `}</style>
    </header>
  );
}
