'use client';
import Image from 'next/image';

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" tabIndex={0} aria-labelledby={`title-${project.id}`}>
      <style jsx>{`
        .project-card {
          background: var(--warm-white);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover, .project-card:focus {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(107, 93, 79, 0.15);
          outline: none;
        }
        .project-card:focus-visible {
           outline: 2px solid var(--warm-brown);
           outline-offset: 4px;
        }
        .thumb {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background-color: var(--soft-clay);
        }
        .thumb img {
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        .project-card:hover .thumb img {
            transform: scale(1.05);
        }
        .content {
            padding: 24px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        h3 {
            margin: 0 0 12px 0;
            font-family: var(--font-fraunces, serif);
            font-size: 22px;
            color: var(--deep-charcoal);
        }
        p {
            margin: 0 0 20px 0;
            color: var(--warm-brown);
            line-height: 1.6;
            font-size: 16px;
            flex-grow: 1;
        }
        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 24px;
        }
        .tag {
            background: var(--soft-clay);
            color: var(--warm-brown);
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 13px;
            font-weight: 500;
        }
        .view-link {
            color: var(--terracotta);
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 15px;
            transition: gap 0.2s;
        }
        .project-card:hover .view-link {
            gap: 10px;
        }
      `}</style>
      <div className="thumb" onClick={() => onOpen(project)}>
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="content" onClick={() => onOpen(project)}>
        <h3 id={`title-${project.id}`}>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <span className="view-link">
          View Details <span>→</span>
        </span>
      </div>
    </article>
  );
}
