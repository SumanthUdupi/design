'use client';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  const containerRef = useRef(null);
  const closeId = `modal-close-${project ? project.id : 'none'}`;

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State for easter egg reveal
  const [showBehindScenes, setShowBehindScenes] = useState(false);

  // Reset states when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setShowBehindScenes(false);
  }, [project]);

  // Gallery Navigation
  const nextImage = () => {
    if (!project?.gallery) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    if (!project?.gallery) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  useEffect(() => {
    if (!project) return;

    // Better implementation for typedKeys using a mutable ref to avoid re-renders on every keystroke
    const keysBuffer = { current: '' };

    function onKeyWithBuffer(e) {
        if (e.key === 'Escape') onClose && onClose();

        // Navigation
        if (e.key === 'ArrowRight' && project?.gallery) {
           setCurrentImageIndex(prev => (prev + 1) % project.gallery.length);
        }
        if (e.key === 'ArrowLeft' && project?.gallery) {
           setCurrentImageIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length);
        }

        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            keysBuffer.current = (keysBuffer.current + e.key).slice(-10).toLowerCase();
            if (keysBuffer.current.includes('story')) {
                setShowBehindScenes(true);
                keysBuffer.current = '';
            }
        }
    }

    document.addEventListener('keydown', onKeyWithBuffer);
    const prev = document.activeElement;

    // focus trap
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

    return () => {
      document.removeEventListener('keydown', onKeyWithBuffer);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
      try {
        prev && prev.focus();
      } catch (e) {
        // ignore
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${project.id}`}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,8,6,0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ type: "spring", duration: 0.5 }}
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--warm-white)',
          borderRadius: 12,
          maxWidth: 960,
          width: '94%',
          height: '90%', // Fixed height for scrolling content inside
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header / Nav */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
           <button
            id={closeId}
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: 'var(--deep-charcoal)'
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ overflowY: 'auto', padding: '0 24px 40px', flex: 1 }}>

          {/* Hero / Gallery Section */}
          <div style={{
            marginBottom: 32,
            marginTop: 24,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--soft-clay)'
          }}>
             {project.gallery && project.gallery.length > 0 ? (
               <Image
                 key={currentImageIndex}
                 src={project.gallery[currentImageIndex].src}
                 alt={project.gallery[currentImageIndex].alt}
                 width={900}
                 height={500}
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               />
             ) : (
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  width={900}
                  height={500}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
             )}

             {/* Gallery Controls */}
             {project.gallery && project.gallery.length > 1 && (
               <>
                 <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer' }}
                 >←</button>
                 <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer' }}
                 >→</button>
               </>
             )}
          </div>

          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <h2
              id={`title-${project.id}`}
              style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 36, marginBottom: 8 }}
            >
              {project.title}
            </h2>
            <div style={{ opacity: 0.7, marginBottom: 32, fontFamily: 'var(--font-inter)' }}>
              {project.category} • {project.year} • {project.tags.join(', ')}
            </div>

            <p style={{ lineHeight: 1.8, fontSize: 18, marginBottom: 40 }}>{project.details.overview}</p>

            <div style={{ display: 'grid', gap: 32 }}>
              <div>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24 }}>Challenge</h3>
                <p style={{ lineHeight: 1.7 }}>{project.details.challenge}</p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24 }}>Solution</h3>
                <p style={{ lineHeight: 1.7 }}>{project.details.solution}</p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24 }}>Results</h3>
                <p style={{ lineHeight: 1.7 }}>{project.details.results}</p>
              </div>
            </div>

            {/* Hidden Behind-the-Scenes Section */}
            <AnimatePresence>
              {showBehindScenes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    marginTop: 60,
                    padding: 32,
                    background: 'var(--warm-cream)',
                    borderRadius: 12,
                    border: '1px dashed var(--warm-brown)',
                    overflow: 'hidden'
                  }}
                >
                  <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: 32, color: 'var(--terracotta)', marginTop: 0 }}>
                    Behind the Scenes ✏️
                  </h3>
                  <p style={{ fontStyle: 'italic' }}>
                    Every project has a messy middle. Here are some of the early sketches and rejected concepts for {project.title}.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                    <div style={{ height: 150, background: 'rgba(0,0,0,0.05)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.3)' }}>Sketch 1</div>
                    <div style={{ height: 150, background: 'rgba(0,0,0,0.05)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.3)' }}>Wireframe</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showBehindScenes && (
              <div style={{ marginTop: 40, textAlign: 'center', opacity: 0.5, fontSize: 14 }}>
                (Psst... try typing &quot;story&quot;)
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
}

ProjectModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tags: PropTypes.array,
    gallery: PropTypes.array,
    details: PropTypes.shape({
      overview: PropTypes.string,
      challenge: PropTypes.string,
      solution: PropTypes.string,
      results: PropTypes.string,
    }),
    hero: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func,
};
