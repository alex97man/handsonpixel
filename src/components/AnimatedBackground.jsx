import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">

      {/* ── Glow 1: top-left (animat) ── */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full opacity-[0.22]"
        style={{
          background: 'radial-gradient(circle, #3fb7bc 0%, transparent 60%)',
          filter: 'blur(100px)',
          top: '-10%',
          left: '-20%',
        }}
        animate={{
          x: ['0%', '15%', '-5%', '0%'],
          y: ['0%', '20%', '-10%', '0%'],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Glow 2: bottom-right (animat) ── */}
      <motion.div
        className="absolute w-[50vw] h-[60vw] rounded-full opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, #3fb7bc 0%, transparent 60%)',
          filter: 'blur(90px)',
          bottom: '-20%',
          right: '-10%',
        }}
        animate={{
          x: ['0%', '-20%', '10%', '0%'],
          y: ['0%', '-15%', '20%', '0%'],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Glow 3: center (breathing) ── */}
      <motion.div
        className="absolute w-[80vw] h-[40vw] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, #3fb7bc 0%, transparent 60%)',
          filter: 'blur(120px)',
          top: '30%',
          left: '10%',
        }}
        animate={{
          opacity: [0.05, 0.13, 0.05],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Glow 4: mid-lower left — umple golul dintre secțiuni ── */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #3fb7bc 0%, transparent 60%)',
          filter: 'blur(110px)',
          top: '55%',
          left: '-10%',
        }}
        animate={{
          x: ['0%', '10%', '-8%', '0%'],
          y: ['0%', '-12%', '8%', '0%'],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear', delay: 5 }}
      />

      {/* ── Glow 5: lower-right — acoperă footer area ── */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] rounded-full opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, #3fb7bc 0%, transparent 60%)',
          filter: 'blur(100px)',
          top: '75%',
          right: '-15%',
        }}
        animate={{
          x: ['0%', '-15%', '5%', '0%'],
          y: ['0%', '10%', '-8%', '0%'],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear', delay: 10 }}
      />

      {/* ── Vignette: margini întunecate pentru profunzime ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(10, 10, 10, 0.8) 100%)',
        }}
      />
    </div>
  );
}
