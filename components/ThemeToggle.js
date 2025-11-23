'use client';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.button
      className="theme-toggle"
      aria-label={`Current theme: ${theme}. Click to toggle.`}
      onClick={() => setTheme()}
      title="Toggle Theme"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="icon"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.span>
      </AnimatePresence>
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
          overflow: hidden;
        }
        .icon {
          font-size: 18px;
          line-height: 1;
          display: block;
        }
      `}</style>
    </motion.button>
  );
}
