'use client';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AchievementToast from './AchievementToast';

const AchievementContext = createContext(null);

export function useAchievements() {
  return useContext(AchievementContext);
}

const DEFAULTS = [
  {
    id: 'patient-explorer',
    name: 'Patient Explorer',
    description: 'Clicked the logo 7 times',
    unlocked: false,
    unlockedAt: null,
  },
];

export default function AchievementProvider({ children }) {
  const [achievements, setAchievements] = useState(DEFAULTS);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('portfolio-achievements');
      if (raw) setAchievements(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to parse achievements', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
    } catch (e) {
      console.error('Failed to save achievements', e);
    }
  }, [achievements]);

  const unlock = useCallback((id) => {
    setAchievements((prev) => {
      const next = prev.map((a) => {
        if (a.id === id && !a.unlocked) {
          const unlockedAt = new Date().toISOString();
          // queue toast
          setQueue((q) => [...q, { ...a, unlocked: true, unlockedAt }]);
          return { ...a, unlocked: true, unlockedAt };
        }
        return a;
      });
      return next;
    });
  }, []);

  const popToast = () => setQueue((q) => q.slice(1));

  return (
    <AchievementContext.Provider value={{ achievements, unlock }}>
      {children}
      {queue.length > 0 && <AchievementToast achievement={queue[0]} onDone={popToast} />}
    </AchievementContext.Provider>
  );
}

AchievementProvider.propTypes = {
  children: PropTypes.node,
};
