'use client';
import { motion } from 'framer-motion';

export default function BackgroundDecorations() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
        <motion.div
          animate={{ y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '-5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(198,123,92,0.05) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%'
          }}
        />
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(139,157,131,0.05) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%'
          }}
        />
      </div>
  );
}
