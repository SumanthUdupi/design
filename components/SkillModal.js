'use client';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SkillModal({ skill, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!skill) return;

    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [skill, onClose]);

  if (!skill) return null;

  return (
    <AnimatePresence>
      {skill && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,8,6,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            ref={containerRef}
            style={{
              background: 'var(--warm-white)',
              borderRadius: 16,
              maxWidth: 500,
              width: '90%',
              padding: 32,
              position: 'relative',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid rgba(107, 93, 79, 0.1)',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'transparent',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: 'var(--warm-brown)',
              }}
              aria-label="Close"
            >
              ×
            </button>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  background: skill.color || 'var(--sage-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginRight: 16,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                }}
              >
                {skill.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 28 }}>{skill.name}</h3>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: 'var(--soft-clay)',
                  fontSize: 14,
                  marginTop: 4,
                  color: 'var(--deep-charcoal)'
                }}>
                  {skill.category}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                <span>Proficiency</span>
                <span>{skill.proficiency}/10</span>
              </div>
              <div style={{ height: 8, background: 'var(--soft-clay)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency * 10}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ height: '100%', background: skill.color || 'var(--sage-green)' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 18, marginBottom: 8 }}>My Journey</h4>
              <p style={{ lineHeight: 1.6, fontSize: 16 }}>{skill.story}</p>
            </div>

            {skill.learningResources && (
              <div>
                <h4 style={{ fontSize: 18, marginBottom: 8 }}>Resources</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {skill.learningResources.map((res, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}
                      >
                        {res.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

SkillModal.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    proficiency: PropTypes.number,
    story: PropTypes.string,
    color: PropTypes.string,
    learningResources: PropTypes.array,
  }),
  onClose: PropTypes.func,
};
