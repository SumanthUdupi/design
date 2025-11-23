'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import SkillModal from './SkillModal';

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 style={{ marginBottom: 40 }}>Skills &amp; Tools</h2>

        <motion.div
          className="skills-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 24,
          }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={item}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
                boxShadow: 'var(--shadow-md)'
              }}
              onClick={() => setSelectedSkill(skill)}
              style={{
                background: 'var(--warm-white)',
                borderRadius: 12,
                padding: 24,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(107, 93, 79, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: skill.color || 'var(--sage-green)',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                {/* Fallback to first letter if no icon SVG available yet */}
                {skill.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: 16, margin: 0, marginBottom: 4 }}>{skill.name}</h3>
              <span style={{ fontSize: 12, opacity: 0.6 }}>{skill.category}</span>

              {/* Color accent line at bottom */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                background: skill.color || 'var(--sage-green)',
                opacity: 0.8
              }} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SkillModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </section>
  );
}
