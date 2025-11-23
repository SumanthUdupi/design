'use client';

export default function About() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, alignItems: 'center' }}>
      <div className="card">
        <h2 style={{ marginTop: 0, fontFamily: 'Fraunces, Georgia, serif' }}>About Me</h2>
        <p>
          I approach product and interface design with curiosity and care. My work favors thoughtful
          interactions, accessible patterns, and visual warmth.
        </p>
        <p>
          I'm interested in projects that blend craft with user-centered outcomes — editorial
          interfaces, refined portfolios, and playful-but-purposeful easter eggs.
        </p>
      </div>
    </div>
  );
}
