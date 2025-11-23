'use client';
import { motion } from 'framer-motion';
export default function About() {
  // "Things I Love" Icons (SVG paths or emojis for now, styled nicely)
  const thingsILove = [
    { name: 'Coffee', icon: '☕', desc: 'Pour-over, always.' },
    { name: 'Books', icon: '📚', desc: 'Sci-fi & Design theory.' },
    { name: 'Hiking', icon: '🌲', desc: 'Getting lost in nature.' },
    { name: 'Music', icon: '🎵', desc: 'Lo-fi beats while coding.' },
    { name: 'Sketching', icon: '✏️', desc: 'Paper before pixels.' },
    { name: 'Gaming', icon: '🎮', desc: 'Narrative-driven indies.' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>

      {/* Intro Section with Image */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
        gap: 48,
        alignItems: 'center'
      }} className="about-intro">
        <div className="card">
          <h2 style={{ marginTop: 0, fontFamily: 'Fraunces, Georgia, serif' }}>About Me</h2>
          <p>
            I approach product and interface design with curiosity and care. My work favors thoughtful
            interactions, accessible patterns, and visual warmth.
          </p>
          <p>
            I&apos;m interested in projects that blend craft with user-centered outcomes — editorial
            interfaces, refined portfolios, and playful-but-purposeful easter eggs.
          </p>
          <p>
            When I&apos;m not coding, you can find me exploring local coffee shops, sketching in my notebook,
            or trying to keep my houseplants alive.
          </p>
        </div>

        <motion.div
          className="profile-photo"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            width: '100%',
            aspectRatio: '1/1',
            background: 'var(--soft-clay)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', // Organic shape
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
           {/* Placeholder for profile image - using a pattern for now */}
           <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--sage-green), var(--terracotta))', opacity: 0.8 }}></div>
        </motion.div>
      </div>

      {/* Journey Timeline */}
      <div className="card" style={{ padding: 40 }}>
        <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', marginBottom: 32 }}>My Journey</h3>
        <div className="timeline" style={{ position: 'relative', paddingLeft: 24 }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--soft-clay)'
          }}></div>

          {[
            { year: '2024', title: 'Senior Creative Developer', desc: 'Building immersive web experiences at Studio X.' },
            { year: '2022', title: 'Frontend Engineer', desc: 'Focused on design systems and accessibility at Tech Y.' },
            { year: '2020', title: 'Started Coding', desc: 'Transitioned from graphic design to web development.' },
            { year: '2018', title: 'Graphic Designer', desc: 'Print and branding work for various clients.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ marginBottom: 32, position: 'relative', paddingLeft: 24 }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: -29,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'var(--terracotta)',
                border: '2px solid var(--warm-white)'
              }}></div>

              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--sage-green)',
                display: 'block',
                marginBottom: 4
              }}>{item.year}</span>
              <h4 style={{ margin: 0, fontSize: 18, marginBottom: 4 }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: 16, opacity: 0.8 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Things I Love */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', marginBottom: 32 }}>Things I Love</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 24
        }}>
          {thingsILove.map((thing, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, rotate: [-1, 1, -1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 16,
                background: 'var(--warm-white)',
                borderRadius: 16,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span style={{ fontSize: 32, marginBottom: 8 }}>{thing.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{thing.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
