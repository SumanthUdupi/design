'use client';
import { useState, useEffect } from 'react';
import { useAchievements } from './AchievementProvider';

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredCount, setHoveredCount] = useState(0);
  const [hoveredSkills, setHoveredSkills] = useState(new Set());
  const { unlock } = useAchievements() || {};

  const skills = [
    { id: 'react', name: 'React', category: 'Frontend', level: 90, color: '#61dafb' },
    { id: 'js', name: 'JavaScript', category: 'Frontend', level: 95, color: '#f7df1e' },
    { id: 'css', name: 'CSS/Tailwind', category: 'Frontend', level: 90, color: '#38bdf8' },
    { id: 'next', name: 'Next.js', category: 'Frontend', level: 85, color: '#000000' },
    { id: 'node', name: 'Node.js', category: 'Backend', level: 80, color: '#68a063' },
    { id: 'figma', name: 'Figma', category: 'Design', level: 85, color: '#f24e1e' },
    { id: 'a11y', name: 'Accessibility', category: 'Core', level: 90, color: '#2c3e50' },
    { id: 'git', name: 'Git', category: 'Tools', level: 85, color: '#f05032' },
  ];

  const handleHover = (id) => {
    if (!hoveredSkills.has(id)) {
        const next = new Set(hoveredSkills).add(id);
        setHoveredSkills(next);
        if (next.size === skills.length) {
            try {
                unlock && unlock('skill-scout'); // Assuming this exists or will exist
            } catch (e) {}
        }
    }
  };

  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <h2 style={{ fontFamily: 'var(--font-fraunces, serif)', fontSize: '32px', marginBottom: '40px', textAlign: 'center' }}>
        Skills & Tools
      </h2>

      <div className="skills-grid">
        <style jsx>{`
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 24px;
            max-width: 900px;
            margin: 0 auto;
          }
          .skill-card {
            background: var(--warm-white);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(107, 93, 79, 0.08);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .skill-card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 12px 24px rgba(107, 93, 79, 0.15);
          }
          .skill-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--skill-color);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }
          .skill-card:hover::before {
            transform: scaleX(1);
          }
          .skill-name {
            font-weight: 600;
            color: var(--deep-charcoal);
            margin-bottom: 8px;
          }
          .skill-cat {
            font-size: 12px;
            color: var(--warm-brown);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
        `}</style>

        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card"
            style={{ '--skill-color': skill.color }}
            onMouseEnter={() => handleHover(skill.id)}
            onClick={() => setSelectedSkill(skill)}
            role="button"
            tabIndex={0}
          >
            <div className="skill-name">{skill.name}</div>
            <div className="skill-cat">{skill.category}</div>
          </div>
        ))}
      </div>

      {selectedSkill && (
          <div style={{
              textAlign: 'center',
              marginTop: 40,
              padding: 24,
              background: 'var(--warm-white)',
              borderRadius: 12,
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
              animation: 'fadeIn 0.5s ease'
          }}>
              <h3 style={{fontFamily: 'var(--font-fraunces, serif)'}}>{selectedSkill.name}</h3>
              <p>I use {selectedSkill.name} to build scalable and accessible interfaces.</p>
              <button onClick={() => setSelectedSkill(null)} style={{background: 'transparent', border: '1px solid var(--warm-brown)', padding: '8px 16px', borderRadius: 6, cursor: 'pointer'}}>Close</button>
          </div>
      )}
    </section>
  );
}
