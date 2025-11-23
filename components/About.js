'use client';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const thingsILove = [
    { icon: '☕', label: 'Coffee', animation: 'bounce' },
    { icon: '📚', label: 'Books', animation: 'tilt' },
    { icon: '🎨', label: 'Design', animation: 'spin' },
    { icon: '🎹', label: 'Music', animation: 'pulse' },
    { icon: '🌱', label: 'Nature', animation: 'sway' },
    { icon: '✨', label: 'Magic', animation: 'twinkle' },
  ];

  return (
    <div ref={sectionRef} className={`about-section ${visible ? 'visible' : ''}`}>
      <style jsx>{`
        .about-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .about-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
            .about-section {
                grid-template-columns: 40% 60%;
                align-items: start;
            }
        }

        .profile-image-container {
            position: relative;
            width: 100%;
            max-width: 400px;
            aspect-ratio: 1;
            margin: 0 auto;
        }

        .profile-image {
            width: 100%;
            height: 100%;
            background-color: var(--soft-clay);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            overflow: hidden;
            position: relative;
            box-shadow: 0 12px 24px rgba(107, 93, 79, 0.15);
            transition: border-radius 5s ease-in-out infinite alternate;
        }

        .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .content {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        h2 {
            font-family: var(--font-fraunces, 'Fraunces'), Georgia, serif;
            font-size: 32px;
            color: var(--deep-charcoal);
            margin: 0;
        }

        p {
            font-family: var(--font-inter, sans-serif);
            font-size: 18px;
            line-height: 1.7;
            color: var(--warm-brown);
            margin: 0;
        }

        .timeline {
            margin-top: 40px;
            position: relative;
            padding-left: 20px;
            border-left: 2px solid var(--soft-clay);
        }

        .timeline-item {
            position: relative;
            margin-bottom: 32px;
            padding-left: 24px;
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: -25px; /* Adjust based on border width and circle size */
            top: 6px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--terracotta);
            border: 2px solid var(--warm-cream);
            transition: transform 0.3s ease;
        }

        .timeline-item:hover::before {
            transform: scale(1.5);
        }

        .timeline-year {
            font-family: var(--font-fraunces, serif);
            font-weight: 600;
            color: var(--terracotta);
            margin-bottom: 4px;
            display: block;
        }

        .things-i-love {
            display: flex;
            gap: 16px;
            margin-top: 40px;
            flex-wrap: wrap;
        }

        .love-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--warm-white);
            border-radius: 50%;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(107, 93, 79, 0.1);
            cursor: help;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .love-icon:hover {
            transform: scale(1.2) rotate(10deg);
        }
      `}</style>

      <div className="profile-image-container">
        <div className="profile-image">
            {/* Placeholder for user image */}
             <div style={{width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--sage-green), var(--terracotta))', opacity: 0.8}}></div>
        </div>
      </div>

      <div className="content">
        <h2>About Me</h2>
        <p>
          I believe the best work comes from curiosity, craft, and a deep respect for the people who'll use it. Every project is a chance to learn something new and make something meaningful.
        </p>
        <p>
          My background bridges technical precision with artistic intuition. I don't just write code; I consider the rhythm, the weight, and the feeling of every interaction.
        </p>

        <div className="timeline">
            <div className="timeline-item">
                <span className="timeline-year">2024</span>
                <div>Refining my craft in digital product design, focusing on accessibility and delight.</div>
            </div>
             <div className="timeline-item">
                <span className="timeline-year">2022</span>
                <div>Transitioned to full-stack development, embracing the complexity of modern web apps.</div>
            </div>
             <div className="timeline-item">
                <span className="timeline-year">2020</span>
                <div>Started my journey with a passion for visual storytelling and clean typography.</div>
            </div>
        </div>

        <div>
            <h3 style={{fontFamily: 'var(--font-fraunces, serif)', fontSize: '20px', marginBottom: '16px'}}>Things I Love</h3>
            <div className="things-i-love">
                {thingsILove.map((item, index) => (
                    <div key={index} className="love-icon" title={item.label} aria-label={item.label}>
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
