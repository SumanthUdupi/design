'use client';
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
    icon: '🌟',
    category: 'creative-soul',
    unlocked: false,
    unlockedAt: null,
    hint: 'Sometimes the logo wants attention',
  },
  {
    id: 'secret-keeper',
    name: 'Secret Keeper',
    description: 'Entered the Konami Code',
    icon: '✨',
    category: 'creative-soul',
    unlocked: false,
    unlockedAt: null,
    hint: 'Up, up, down, down...',
  },
  {
    id: 'artist-touch',
    name: 'Artist\'s Touch',
    description: 'Discovered the drawing mode',
    icon: '✏️',
    category: 'creative-soul',
    unlocked: false,
    unlockedAt: null,
    hint: 'Type "create" to express yourself',
  },
  {
    id: 'story-seeker',
    name: 'Story Seeker',
    description: 'Found hidden narratives',
    icon: '📖',
    category: 'story-collector',
    unlocked: false,
    unlockedAt: null,
    hint: 'Type "story" while viewing a project',
  },
  {
    id: 'color-composer',
    name: 'Color Composer',
    description: 'Completed the color challenge',
    icon: '🎨',
    category: 'creative-soul',
    unlocked: false,
    unlockedAt: null,
    hint: 'Find the hidden swatches',
  },
  {
    id: 'wonderer',
    name: 'Wonderer',
    description: 'Triggered the wonder effect',
    icon: '✨',
    category: 'mindful-explorer',
    unlocked: false,
    unlockedAt: null,
    hint: 'Type "wonder" to see magic',
  },
];

export default function AchievementProvider({ children }) {
  const [achievements, setAchievements] = useState(DEFAULTS);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-achievements');
      if (saved) {
          const parsed = JSON.parse(saved);
          // Merge saved state with defaults to ensure new achievements exist
          const merged = DEFAULTS.map(def => {
              const existing = parsed.find(p => p.id === def.id);
              return existing ? { ...def, ...existing } : def;
          });
          setAchievements(merged);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
    } catch (e) {}
  }, [achievements]);

  const unlock = useCallback((id) => {
    setAchievements((prev) => {
      // check if already unlocked
      const existing = prev.find(a => a.id === id);
      if (existing && existing.unlocked) return prev;

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
