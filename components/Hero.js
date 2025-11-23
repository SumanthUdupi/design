'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`hero-content ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
      <style jsx>{`
        .hero-content {
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
        .opacity-0 {
          opacity: 0;
          transform: translateY(30px);
        }
        h1 {
          font-family: var(--font-fraunces, 'Fraunces'), Georgia, serif;
          font-size: clamp(36px, 5vw, 72px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--deep-charcoal);
          margin-bottom: 24px;
        }
        h1 .name {
          display: block;
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 400;
          color: var(--warm-brown);
          margin-bottom: 16px;
        }
        p {
            font-family: var(--font-inter, sans-serif);
            font-size: clamp(18px, 2vw, 22px);
            line-height: 1.6;
            max-width: 540px;
            margin-bottom: 40px;
            color: var(--deep-charcoal);
            opacity: 0.9;
        }
        .hero-cta {
            display: inline-block;
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 500;
            color: var(--warm-brown);
            border: 2px solid var(--warm-brown);
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease-out;
        }
        .hero-cta:hover {
            background-color: var(--warm-brown);
            color: var(--warm-cream);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(107, 93, 79, 0.2);
        }
        .hero-cta:active {
            transform: scale(0.98);
        }
      `}</style>

      <h1>
        <span className="name">Sumanth Udupi</span>
        I craft digital experiences that feel intentional
      </h1>
      <p>
        Creating thoughtful work at the intersection of art and code.
        Designing with purpose, building with care.
      </p>
      <Link href="#projects" className="hero-cta">
        View My Work
      </Link>
    </div>
  );
}
