'use client';
import { useEffect, useState, useMemo } from 'react';
import { useAchievements } from './AchievementProvider';

export default function EasterEggs() {
  const { unlock } = useAchievements();
  const [typedKeys, setTypedKeys] = useState('');
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Konami Code Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = useMemo(() => [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ], []);

  // Secret Words
  const secretWords = useMemo(() => [
    { word: 'create', achievementId: 'artists-touch' },
    { word: 'story', achievementId: 'story-seeker' },
    { word: 'journey', achievementId: 'pathfinder' },
    { word: 'wonder', achievementId: 'wonderer' }
  ], []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Konami Code Logic
      if (e.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);
        if (nextIndex === konamiCode.length) {
          unlock('secret-keeper');
          // Activate Canvas Mode visual effect
          document.body.classList.add('canvas-mode');
          setTimeout(() => document.body.classList.remove('canvas-mode'), 5000);
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }

      // 2. Secret Word Logic
      // Only track letters to avoid huge strings
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        setTypedKeys(prev => (prev + e.key).slice(-20).toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, unlock, konamiCode]);

  // Check typed keys for secret words
  useEffect(() => {
    secretWords.forEach(({ word, achievementId }) => {
      if (typedKeys.includes(word)) {
        unlock(achievementId);
        setTypedKeys(''); // Reset to prevent double trigger
      }
    });
  }, [typedKeys, unlock, secretWords]);

  // 3. Time-based Logic (Run once on mount)
  useEffect(() => {
    const hour = new Date().getHours();

    // Midnight
    if (hour === 0) {
      unlock('night-thinker');
    }
  }, [unlock]);

  return null; // This component is logic-only
}
