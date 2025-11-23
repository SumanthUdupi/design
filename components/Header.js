'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { useAchievements } from './AchievementProvider';
import { motion } from 'framer-motion';

export default function Header() {
  const [clicks, setClicks] = useState(0);
  const { unlock } = useAchievements() || {};

  const handleLogoClick = () => {
    // e.preventDefault && e.preventDefault(); // Don't prevent default on link
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

  const navItems = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="site-header container">
      <div className="logo">
        <Link href="/" onClick={handleLogoClick}>
          <motion.span
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            Sumanth Udupi
          </motion.span>
        </Link>
      </div>
      <nav className="main-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
             <motion.span
              whileHover={{ y: -2 }}
              style={{ display: 'inline-block' }}
             >
              {item.label}
             </motion.span>
          </Link>
        ))}
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
          height: 2px;
          background-color: var(--terracotta);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
          border-radius: 2px;
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
