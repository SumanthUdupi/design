'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 variants={item}>
        Hi, I&apos;m Sumanth — I craft thoughtful digital experiences.
      </motion.h1>
      <motion.p variants={item}>
        Designing with care at the intersection of art and code. I build warm, performance-minded
        interfaces with subtle delights for curious visitors.
      </motion.p>
      <motion.div variants={item}>
        <Link href="#projects" className="cta btn btn-primary">
          View My Work
        </Link>
      </motion.div>
    </motion.div>
  );
}
