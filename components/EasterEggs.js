'use client';
import { useEffect, useState } from 'react';
import { useAchievements } from './AchievementProvider';

export default function EasterEggs() {
  const { unlock } = useAchievements() || {};
  const [canvasMode, setCanvasMode] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [colorChallenge, setColorChallenge] = useState({ active: false, found: [] });

  // Konami Code
  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setCanvasMode(true);
          try {
            unlock && unlock('secret-keeper');
          } catch (err) {}
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlock]);

  // Secret Words
  useEffect(() => {
    let typedText = '';
    const secretWords = ['create', 'wonder'];

    const handleKeyPress = (e) => {
      typedText += e.key.toLowerCase();
      typedText = typedText.slice(-10);

      if (typedText.includes('create')) {
        setDrawingMode(true);
        try {
            unlock && unlock('artist-touch');
        } catch(err) {}
        typedText = '';
        setTimeout(() => setDrawingMode(false), 30000); // Disable after 30s
      }

      if (typedText.includes('wonder')) {
        // Trigger wonder effect
        try {
            unlock && unlock('wonderer');
        } catch(err) {}
        typedText = '';
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [unlock]);

  return (
    <>
      {canvasMode && (
        <div className="canvas-mode-overlay" onClick={() => setCanvasMode(false)}>
          <style jsx>{`
            .canvas-mode-overlay {
              position: fixed;
              inset: 0;
              background-color: #fdfbf7;
              background-image: url('/textures/paper-grain.svg');
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              opacity: 0;
              animation: fadeIn 1s forwards;
            }
            @keyframes fadeIn { to { opacity: 1; } }
            h2 {
                font-family: 'Reenie Beanie', cursive; /* Fallback handled */
                font-size: 48px;
                color: var(--warm-brown);
                transform: rotate(-5deg);
            }
            p {
                font-family: var(--font-inter);
                color: var(--deep-charcoal);
                max-width: 500px;
                text-align: center;
            }
          `}</style>
          <h2>You've found the secret sketchbook!</h2>
          <p>This is where ideas start. Rough, unpolished, and full of potential.</p>
          <p style={{marginTop: 20, fontSize: 14, opacity: 0.6}}>(Click anywhere to close)</p>
        </div>
      )}

      {drawingMode && (
        <div style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--sage-green)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 20,
            zIndex: 9000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            ✏️ Creative Mode Active
        </div>
      )}
    </>
  );
}
