'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <div>
      <h1>Hi, I'm Sumanth — I craft thoughtful digital experiences.</h1>
      <p>
        Designing with care at the intersection of art and code. I build warm, performance-minded
        interfaces with subtle delights for curious visitors.
      </p>
      <Link href="#projects" className="cta">
        View My Work
      </Link>
    </div>
  );
}
