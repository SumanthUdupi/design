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
    // debounce rapid clicks: only count if spaced > 250ms handled by user pace assumption; simple implementation
    if (next === 7) {
      try {
        unlock && unlock('patient-explorer');
      } catch (e) {}
      setClicks(0);
    }
  };

  return (
    <header className="site-header container">
      <div className="logo">
        <a href="#" onClick={handleLogoClick}>
          Sumanth Udupi
        </a>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="#projects">Projects</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
