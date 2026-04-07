import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/* ─── Cycling words ───────────────────────────────────────────────── */
const WORDS = ['PIXEL', 'DESIGN', 'IMPACT', 'VÂNZARE'];

/* ─── Hero ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex(p => (p + 1) % WORDS.length),
      2200
    );
    return () => clearInterval(id);
  }, []);



  return (
    /*
      Section fills viewport height.
    */
    <section
      id="acasa"
      style={{ minHeight: '100dvh', position: 'relative', background: '#0A0A0A', zIndex: 1, isolation: 'isolate' }}
    >
      {/* Soft radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 60% 55% at 50% 55%, rgba(63,183,188,0.07) 0%, transparent 68%)',
        }}
      />

      {/* Dot Grid Layer from Workspace pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: `
            radial-gradient(rgba(148, 163, 184, 0.25) 1px, transparent 1px),
            radial-gradient(rgba(63, 183, 188, 0.08) 2px, transparent 2px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 0 0',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
        }}
      />



      {/* Vignette effect for focus on headline */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background: 'radial-gradient(circle at center, transparent 25%, rgba(10, 10, 10, 0.3) 60%, rgba(10, 10, 10, 0.9) 100%)',
        }}
      />

      {/*
        Text layer: flex column, centred, full viewport height.
        pt-28 pushes content below the fixed navbar.
        z-20 keeps text above images.
      */}
      <div
        className="relative z-20 min-h-[100dvh] flex flex-col items-center justify-evenly md:justify-center px-6 text-center pt-[6rem] pb-[4rem] md:pt-[7rem] md:pb-[3rem] md:gap-12"
      >

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-accent text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] mb-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md"
        >
          E-commerce & Graphic Design
        </motion.div>

        {/* Central Morphing Animation */}
        <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="relative h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[14rem] flex items-center justify-center w-full">
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={wordIndex}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', position: 'absolute' }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 0.6 },
                  filter: { duration: 0.6 }
                }}
                className={`${WORDS[wordIndex] === 'PIXEL' ? 'text-accent' : 'text-white'} text-[17vw] sm:text-8xl md:text-9xl lg:text-[12rem] leading-none font-black uppercase tracking-tighter drop-shadow-[0_0_60px_rgba(63,183,188,0.4)]`}
              >
                {WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.85 }}
          style={{
            color: '#ffffff',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
            fontWeight: 500,
            maxWidth: '480px',
            lineHeight: 1.8,
            opacity: 0.8
          }}
        >
          Ne focusăm pe e-commerce, fotografie de produs și design de print sau digital.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
        >
          <Link
            to="/portofoliu"
            className="px-9 py-4 bg-accent text-background font-bold text-sm uppercase tracking-wider rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_0_24px_rgba(63,183,188,0.25)] hover:shadow-[0_0_40px_rgba(63,183,188,0.5)]"
          >
            Proiectele Noastre
          </Link>
          <Link
            to="/contact"
            className="px-9 py-4 border border-white/20 text-text font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white hover:text-background transition-all duration-300 backdrop-blur-sm"
          >
            Hai să discutăm
          </Link>
        </motion.div>

      </div>



    </section>
  );
}
