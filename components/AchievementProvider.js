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
    icon: '🌟'
  },
  {
    id: 'secret-keeper',
    name: 'Secret Keeper',
    description: 'Unlocked the Konami Code',
    unlocked: false,
    unlockedAt: null,
    icon: '🔐'
  },
  {
    id: 'artists-touch',
    name: 'Artist\'s Touch',
    description: 'Activated drawing mode',
    unlocked: false,
    unlockedAt: null,
    icon: '✏️'
  },
  {
    id: 'story-seeker',
    name: 'Story Seeker',
    description: 'Found hidden narratives',
    unlocked: false,
    unlockedAt: null,
    icon: '📖'
  },
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    description: 'Revealed the journey timeline',
    unlocked: false,
    unlockedAt: null,
    icon: '🗺️'
  },
  {
    id: 'wonderer',
    name: 'Wonderer',
    description: 'Discovered the wonder mode',
    unlocked: false,
    unlockedAt: null,
    icon: '✨'
  },
  {
    id: 'night-thinker',
    name: 'Night Thinker',
    description: 'Visited during the midnight hour',
    unlocked: false,
    unlockedAt: null,
    icon: '🌙'
  },
  {
    id: 'hidden-friend',
    name: 'Hidden Friend',
    description: 'Found the shy character',
    unlocked: false,
    unlockedAt: null,
    icon: '🌱'
  }
];

export default function AchievementProvider({ children }) {
  const [achievements, setAchievements] = useState(DEFAULTS);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('portfolio-achievements');
      if (raw) {
        const saved = JSON.parse(raw);
        // Merge saved state with DEFAULTS to ensure new achievements exist
        setAchievements(prev => {
          return prev.map(def => {
            const found = saved.find(s => s.id === def.id);
            return found ? { ...def, ...found } : def;
          });
        });
      }
    } catch (e) {
      console.error('Failed to parse achievements', e);
    }
  }, []);

  useEffect(() => {
    try {
      if (achievements !== DEFAULTS) {
        localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
      }
    } catch (e) {
      console.error('Failed to save achievements', e);
    }
  }, [achievements]);

  const unlock = useCallback((id) => {
    setAchievements((prev) => {
      // Check if already unlocked to avoid duplicate toasts
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        const unlockedAt = new Date().toISOString();
        const updated = { ...achievement, unlocked: true, unlockedAt };

        // Add to toast queue
        setQueue((q) => [...q, updated]);

        return prev.map((a) => (a.id === id ? updated : a));
      }
      return prev;
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
