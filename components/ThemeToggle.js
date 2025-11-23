'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme() || { theme: 'default', setTheme: () => {} };

  const getIcon = () => {
    switch (theme) {
      case 'dark': return '🌙';
      case 'twilight': return '🌆';
      default: return '☀️';
    }
  };

  return (
    <button
      className="theme-toggle"
      aria-label={`Current theme: ${theme}. Click to toggle.`}
      onClick={() => setTheme()}
      title="Toggle Theme"
    >
      <span className="icon">{getIcon()}</span>
      <style jsx>{`
        .theme-toggle {
          padding: 8px;
          border-radius: 50%;
          border: 1px solid rgba(107, 93, 79, 0.2);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          background-color: var(--soft-clay);
          transform: rotate(15deg);
        }
        .icon {
          font-size: 18px;
          line-height: 1;
        }
      `}</style>
    </button>
  );
}
