'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAchievements } from './AchievementProvider';

export default function ProjectModal({ project, onClose }) {
  const containerRef = useRef(null);
  const { unlock } = useAchievements() || {};
  const [showBehindTheScenes, setShowBehindTheScenes] = useState(false);

  // Konami code Easter egg handling specific to modal context (optional)
  // Or secret word detection

  useEffect(() => {
    if (!project) return;

    // Reset states
    setShowBehindTheScenes(false);

    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose();
    }
    document.addEventListener('keydown', onKey);

    const el = containerRef.current;
    const focusable = el
      ? el.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      : [];
    if (focusable && focusable.length) focusable[0].focus();
    document.body.style.overflow = 'hidden';

    function handleTab(e) {
      if (e.key !== 'Tab') return;
      const elements = Array.from(focusable);
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleTab);

    // Secret word "story" detection to unlock behind the scenes
    let keystrokes = '';
    const secretWord = 'story';

    function handleTyping(e) {
        keystrokes += e.key.toLowerCase();
        if (keystrokes.length > secretWord.length) {
            keystrokes = keystrokes.slice(-secretWord.length);
        }
        if (keystrokes === secretWord) {
            setShowBehindTheScenes(true);
            try {
                unlock && unlock('story-seeker');
            } catch (err) {}
        }
    }
    document.addEventListener('keypress', handleTyping);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keypress', handleTyping);
      document.body.style.overflow = '';
    };
  }, [project, onClose, unlock]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
      className="modal-overlay"
      onClick={onClose}
    >
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,8,6,0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        .modal-content {
          background: var(--warm-white);
          width: 94%;
          max-width: 1100px;
          height: 90vh;
          max-height: 90vh;
          border-radius: 16px;
          overflow-y: auto;
          position: relative;
          transform: scale(0.95);
          animation: scaleUp 0.3s 0.1s forwards cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
        }
        @keyframes scaleUp {
            to { transform: scale(1); }
        }
        .close-btn {
            position: sticky;
            top: 24px;
            left: calc(100% - 60px);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--warm-white);
            border: 1px solid rgba(0,0,0,0.1);
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            color: var(--deep-charcoal);
        }
        .close-btn:hover {
            transform: scale(1.1);
        }

        .hero-image {
            position: relative;
            width: 100%;
            height: 50vh;
            min-height: 400px;
        }

        .content-wrapper {
            padding: 48px 8%;
            max-width: 900px;
            margin: 0 auto;
        }

        h2 {
            font-family: var(--font-fraunces, serif);
            font-size: clamp(32px, 4vw, 48px);
            color: var(--deep-charcoal);
            margin: 0 0 16px 0;
            line-height: 1.1;
        }

        .meta {
            display: flex;
            gap: 16px;
            color: var(--warm-brown);
            font-size: 16px;
            margin-bottom: 40px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .body-content {
            font-size: 18px;
            line-height: 1.7;
            color: var(--deep-charcoal);
        }

        .body-content h3 {
            font-family: var(--font-fraunces, serif);
            font-size: 24px;
            margin: 48px 0 16px 0;
            color: var(--deep-charcoal);
        }

        .body-content p {
            margin-bottom: 24px;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin: 40px 0;
        }

        .bts-section {
            margin-top: 60px;
            padding: 32px;
            background-color: var(--warm-cream);
            border-radius: 12px;
            border: 1px dashed var(--warm-brown);
            animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .bts-note {
            font-family: var(--font-caveat, cursive);
            font-size: 24px;
            color: var(--terracotta);
            margin-bottom: 16px;
        }
      `}</style>

      <div ref={containerRef} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>

        <div className="hero-image">
            <Image
                src={project.hero.src}
                alt={project.hero.alt}
                fill
                style={{ objectFit: 'cover' }}
                priority
            />
        </div>

        <div className="content-wrapper">
            <h2 id={`modal-title-${project.id}`}>{project.title}</h2>
            <div className="meta">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
            </div>

            <div className="body-content">
                <p style={{ fontSize: '22px', color: 'var(--warm-brown)' }}>
                    {project.details.overview}
                </p>

                <h3>The Challenge</h3>
                <p>{project.details.challenge}</p>

                <h3>The Solution</h3>
                <p>{project.details.solution}</p>

                {project.gallery && (
                    <div className="gallery-grid">
                        {project.gallery.map((img, i) => (
                             <div key={i} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden' }}>
                                <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
                             </div>
                        ))}
                    </div>
                )}

                <h3>Results</h3>
                <p>{project.details.results}</p>
            </div>

            {showBehindTheScenes ? (
                <div className="bts-section">
                    <div className="bts-note">From the sketchbook...</div>
                    <p>Here is a look at the early concepts for this project. We explored several directions before landing on the final visual language.</p>
                    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
                        {/* Placeholders for sketches */}
                        <div style={{ width: 200, height: 150, background: '#fff', flexShrink: 0, border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>Sketch 1</div>
                        <div style={{ width: 200, height: 150, background: '#fff', flexShrink: 0, border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>Sketch 2</div>
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: 60, textAlign: 'center', opacity: 0.6, fontSize: 14, fontStyle: 'italic' }}>
                    (Psst... try typing "story" to see behind the scenes)
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
