'use client';
import { useEffect } from 'react';

export default function AchievementToast({ achievement, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 4000);
    return () => clearTimeout(t);
  }, [achievement, onDone]);

  if (!achievement) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 16,
        bottom: 16,
        background: 'rgba(255,250,244,0.98)',
        padding: 16,
        borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        maxWidth: 320,
        zIndex: 9999,
      }}
      role="status"
      aria-live="polite"
    >
      <div style={{ fontSize: 18, marginBottom: 6 }}>✨ {achievement.name}</div>
      <div style={{ opacity: 0.9, fontSize: 14 }}>{achievement.description}</div>
    </div>
  );
}
