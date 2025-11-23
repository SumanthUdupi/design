'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme() || { theme: 'default', setTheme: () => {} };

  return (
    <div style={{ display: 'inline-block' }}>
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme()}
        style={{
          padding: 8,
          borderRadius: 8,
          border: '1px solid var(--soft-clay)',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        {theme === 'default' && '🌤️ Default'}
        {theme === 'dark' && '🌙 Dark'}
        {theme === 'twilight' && '🌆 Twilight'}
      </button>
    </div>
  );
}
