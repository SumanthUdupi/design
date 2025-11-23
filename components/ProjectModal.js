'use client';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ProjectModal({ project, onClose }) {
  const containerRef = useRef(null);
  const closeId = `modal-close-${project ? project.id : 'none'}`;

  useEffect(() => {
    if (!project) return;

    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.activeElement;
    // focus trap: focus first tabbable element inside modal
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
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
      try {
        prev && prev.focus();
      } catch (e) {
        // ignore if cannot focus previous element
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
        background: 'rgba(10,8,6,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--warm-white)',
          borderRadius: 12,
          maxWidth: 960,
          width: '94%',
          maxHeight: '90%',
          overflowY: 'auto',
          padding: 24,
        }}
      >
        <button
          id={closeId}
          onClick={onClose}
          style={{ float: 'right', background: 'transparent', border: 'none', fontSize: 20 }}
          aria-label="Close"
        >
          ×
        </button>
        {/* Use next/image for optimized responsive hero image */}
        <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden', position: 'relative', width: '100%', minHeight: '200px' }}>
           <Image
            src={project.hero.src}
            alt={project.hero.alt}
            width={900}
            height={500}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
        <h2
          id={`title-${project.id}`}
          style={{ fontFamily: 'FrauncesLocal, Fraunces, Georgia, serif' }}
        >
          {project.title}
        </h2>
        <div style={{ opacity: 0.9, marginBottom: 12 }}>
          {project.category} • {project.year}
        </div>
        <p style={{ lineHeight: 1.7 }}>{project.details.overview}</p>
        <h3>Challenge</h3>
        <p>{project.details.challenge}</p>
        <h3>Solution</h3>
        <p>{project.details.solution}</p>
        <h3>Results</h3>
        <p>{project.details.results}</p>
      </div>
    </div>
  );
}

ProjectModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
