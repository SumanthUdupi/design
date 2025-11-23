'use client';
import Image from 'next/image';

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" tabIndex={0} aria-labelledby={`title-${project.id}`}>
      <div className="thumb">
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={560}
          height={315}
          style={{ borderRadius: 8 }}
          sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
          priority={false}
        />
      </div>
      <div style={{ padding: 16 }}>
        <h3
          id={`title-${project.id}`}
          style={{ margin: '0 0 8px 0', fontFamily: 'FrauncesLocal, Fraunces, Georgia, serif' }}
        >
          {project.title}
        </h3>
        <p style={{ margin: '0 0 12px 0', color: 'var(--deep-charcoal)', opacity: 0.9 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                background: 'var(--soft-clay)',
                color: 'var(--warm-brown)',
                padding: '6px 10px',
                borderRadius: 16,
                fontSize: 13,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <button className="cta" onClick={() => onOpen(project)} aria-haspopup="dialog">
          View Details →
        </button>
      </div>
    </article>
  );
}
