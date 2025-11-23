'use client';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) setTheme(saved);
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        if (theme === 'default') {
          delete document.documentElement.dataset.theme;
        } else {
          document.documentElement.dataset.theme = theme;
        }
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
        console.error('Failed to set theme', e);
    }
  }, [theme]);

  const toggle = (next) => {
    if (next) return setTheme(next);
    setTheme((t) => (t === 'default' ? 'dark' : t === 'dark' ? 'twilight' : 'default'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggle }}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
