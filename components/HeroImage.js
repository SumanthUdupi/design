'use client';
import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0],
        borderRadius: ["24px", "50px", "30px", "24px"]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: '100%',
        height: 300,
        background: 'linear-gradient(135deg, rgba(198,123,92,0.12), rgba(139,157,131,0.08))',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
        {/* Inner floating shapes */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: 'rgba(198,123,92,0.2)'
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '20%',
            width: 80,
            height: 80,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            backgroundColor: 'rgba(139,157,131,0.2)'
          }}
        />
    </motion.div>
  );
}
