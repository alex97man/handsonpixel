import { useState, useEffect } from 'react';
import { ShoppingCart, PenTool, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const SERVICES = [
  {
    icon: ShoppingCart,
    title: 'Configurare Magazine Shopify',
    subtitle: 'E-commerce',
    description: 'Configurăm magazinul de la zero: temă premium inclusă, metode de plată, curieri, livrare locker, produse listate și automatizări active. Predăm un magazin funcțional, nu un schelet.',
    link: '/servicii',
    num: '01',
  },
  {
    icon: PenTool,
    title: 'Design print & digital',
    subtitle: 'Design',
    description: 'Pregătim fișiere DTP corecte tehnic — CMYK, bleed, rezoluție — și livrăm design pentru print de mari dimensiuni, colantări, mesh și materiale digitale pentru e-commerce și social media.',
    link: '/servicii',
    num: '02',
  },
  {
    icon: Camera,
    title: 'Fotografie de produs',
    subtitle: 'Fotografie',
    description: 'Fotografiem produsele cu focus pe funcționalitate și detaliu. Editare completă în Photoshop și Lightroom, cu opțiuni de fotografie 360° — video sau integrare interactivă directă în site.',
    link: '/servicii',
    num: '03',
  },
];

const DESKTOP_BAND = 1 / SERVICES.length;
function desktopCardState(progress, index) {
  const start = index * DESKTOP_BAND;
  const local = Math.min(1, Math.max(0, (progress - start) / DESKTOP_BAND));
  const active = progress >= start;
  return { local, active };
}

/* ─── Mobile: Liquid Glass Stacking ─── */
function MobileServices() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = sectionRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionHeight = el.offsetHeight - window.innerHeight;
          const scrolled = window.scrollY - sectionTop;
          if (sectionHeight > 0) {
            setProgress(Math.min(1, Math.max(0, scrolled / sectionHeight)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardStyle = (index) => {
    const cardStep = 1 / SERVICES.length;
    const start = index * cardStep;
    const end = (index + 1) * cardStep;

    const isActive = progress >= start && (index === SERVICES.length - 1 ? true : progress < end);
    const isPast = progress >= end && index < SERVICES.length - 1;

    // Transition values
    // Card slides in from bottom when progress reaches 'start'
    // Card stays sticky
    // Card fades out when next card is active (isPast)

    let opacity = 0;
    let y = 50;
    let scale = 0.9;
    let filter = 'blur(10px)';

    if (progress >= start) {
      // Entry transition (first 20% of card's scroll area)
      const entryProgress = Math.min(1, (progress - start) / (cardStep * 0.3));
      opacity = entryProgress;
      y = 50 * (1 - entryProgress);
      scale = 0.9 + (0.1 * entryProgress);
      filter = `blur(${10 * (1 - entryProgress)}px)`;
    }

    if (isPast) {
      // Exit transition (last 20% of card's scroll area)
      const exitProgress = Math.min(1, (progress - end) / (cardStep * 0.3));
      opacity = 1 - exitProgress;
      y = -40 * exitProgress;
      scale = 1 - (0.05 * exitProgress);
      filter = `blur(${10 * exitProgress}px)`;
    }

    return {
      opacity,
      y,
      scale,
      filter,
      zIndex: 10 + index,
      display: opacity === 0 ? 'none' : 'flex'
    };
  };

  return (
    <section ref={sectionRef} style={{ height: '350vh' }} className="relative bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">

        {/* Background glow specific to this section */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(63,183,188,0.12) 0%, transparent 70%)' }} />

        {/* Section Header (Fixed in sticky container) */}
        <div className="absolute top-20 left-6 right-6 z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-black text-text uppercase tracking-tight leading-[0.85] mb-4">
              CE FACEM
            </h2>
            <p className="text-muted text-lg font-medium leading-relaxed max-w-xs opacity-80">
              Lucrăm în trei direcții care se completează natural.
            </p>
          </motion.div>
        </div>

        {/* Cards Stack */}
        <div className="relative w-full h-[55vh] mt-32">
          {SERVICES.map((service, i) => {
            const styles = getCardStyle(i);
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={false}
                animate={styles}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: styles.display,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    background: 'rgba(15, 15, 20, 0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '2.5rem',
                    padding: '2.25rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Liquid accent inside card */}
                  <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100%', height: '100%', background: 'radial-gradient(circle at 100% 0%, rgba(63,183,188,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 w-14 h-14 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center shadow-[0_0_15px_rgba(63,183,188,0.2)]">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>

                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.25em] mb-3">
                      {service.subtitle}
                    </span>

                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-5">
                      {service.title}
                    </h3>

                    <p className="text-muted text-base font-medium leading-relaxed mb-auto opacity-70">
                      {service.description}
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <Link
                        to={service.link}
                        className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest hover:text-accent-hover transition-colors"
                      >
                        Vezi detalii <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar (Liquid style) */}
        <div className="absolute bottom-16 left-12 right-12 z-30">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ width: `${progress * 100}%` }}
              className="h-full bg-accent shadow-[0_0_10px_rgba(63,183,188,0.5)]"
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop: original sticky scroll ─── */
function DesktopServices() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - sectionTop;
      setProgress(Math.min(1, Math.max(0, scrolled / scrollable)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto w-full px-6 lg:px-8">
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-text uppercase tracking-tight leading-[0.85]">CE FACEM</h2>
            <p className="mt-5 text-muted text-lg max-w-xl font-medium leading-relaxed">
              Lucrăm în trei direcții care se completează natural.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const { local, active } = desktopCardState(progress, i);
              const scale = active ? 0.88 + local * 0.12 : 0.88;
              const glowO = active ? Math.min(1, local * 1.4) : 0;
              const borderO = active ? 0.08 + local * 0.32 : 0.05;
              const cardBg = active ? `rgba(20,20,20,${0.5 + local * 0.5})` : 'rgba(20,20,20,0.5)';
              return (
                <Link key={service.title} to={service.link} style={{ transform: `scale(${scale})`, transition: 'transform 0.05s linear', transformOrigin: 'center bottom', display: 'block' }}>
                  <div style={{ background: cardBg, border: `1px solid rgba(63,183,188,${borderO})`, borderRadius: '2rem', padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden', transition: 'border-color 0.05s linear, background 0.05s linear' }} className="group flex flex-col h-full">
                    <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: '2rem', background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(63,183,188,${glowO * 0.22}) 0%, transparent 70%)`, pointerEvents: 'none' }} />
                    <div aria-hidden style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1px', background: `linear-gradient(90deg, transparent, rgba(63,183,188,${glowO * 0.6}), transparent)`, pointerEvents: 'none' }} />
                    <div style={{ width: '3.25rem', height: '3.25rem', borderRadius: '1rem', background: `rgba(63,183,188,${0.03 + glowO * 0.06})`, border: `1px solid rgba(63,183,188,${0.1 + glowO * 0.3})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem', position: 'relative', zIndex: 10 }}>
                      <Icon style={{ width: '1.4rem', height: '1.4rem', color: '#3fb7bc', opacity: 0.7 + glowO * 0.3 }} />
                    </div>
                    <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{service.subtitle}</p>
                      <h3 className="text-2xl font-black text-text uppercase tracking-tight mb-4">{service.title}</h3>
                      <p className="text-muted text-sm font-medium leading-relaxed">{service.description}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: active ? '#3fb7bc' : '#8A8A8A', position: 'relative', zIndex: 10 }}>
                      <span>Vezi pachete</span>
                      <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeServices() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? <MobileServices /> : <DesktopServices />;
}
