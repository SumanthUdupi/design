'use client';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ProjectCard({ project, onOpen }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Random rotation between -2 and 2 degrees for tags
    setRotation(Math.random() * 4 - 2);
  }, []);

  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -8, rotate: 1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      tabIndex={0}
      aria-labelledby={`title-${project.id}`}
      style={{
        background: 'var(--warm-white)',
        borderRadius: 12,
        padding: 32,
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(107, 93, 79, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div className="thumb" style={{ overflow: 'hidden', borderRadius: 8, marginBottom: 20 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            width={560}
            height={315}
            style={{ borderRadius: 8, width: '100%', height: 'auto' }}
            sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
            priority={false}
          />
        </motion.div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3
          id={`title-${project.id}`}
          style={{ margin: '0 0 8px 0', fontFamily: 'Fraunces, Georgia, serif' }}
        >
          {project.title}
        </h3>
        <p style={{ margin: '0 0 16px 0', color: 'var(--deep-charcoal)', opacity: 0.9, flexGrow: 1 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                background: 'var(--soft-clay)',
                color: 'var(--warm-brown)',
                padding: '6px 10px',
                borderRadius: 16,
                fontSize: 13,
                transform: `rotate(${rotation}deg)`,
                display: 'inline-block'
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <motion.button
          className="cta btn-outline"
          onClick={() => onOpen(project)}
          aria-haspopup="dialog"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 20px',
            borderRadius: 8,
            cursor: 'pointer',
            border: '2px solid var(--warm-brown)',
            background: 'transparent',
            fontWeight: 600
          }}
        >
          View Details →
        </motion.button>
      </div>
    </motion.article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  onOpen: PropTypes.func,
};
