import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import soulyRoThumb from '../assets/souly.ro/banner12.png';
import blueThumb from '../assets/BLUE/BLUE2.jpg';
import beerstationThumb from '../assets/BEERSTATION.RO/img3.jpg';

const featuredProjects = [
  {
    id: 1,
    title: 'SOULY.RO',
    category: 'Shopify E-commerce',
    preview: 'Magazin online Shopify pentru produse personalizabile, cu secțiuni custom pentru încărcarea imaginilor și textelor direct în pagina de produs.',
    image: soulyRoThumb,
    num: '01',
    link: '/portofoliu/souly-ro'
  },
  {
    id: 2,
    title: 'BLUE',
    category: 'Fotografie de Produs',
    preview: 'Fotografie editorială și 360° pentru o sticlă de apă — fundal negru, lumini albastre, atmosferă dramatică.',
    image: blueThumb,
    num: '02',
    link: '/portofoliu/blue'
  },
  {
    id: 3,
    title: 'BEERSTATION.RO',
    category: 'Shopify E-commerce',
    preview: 'Magazin online de bere craft construit de la zero, cu popup custom de verificare vârstă și integrare automată a taxei SGR în coș.',
    image: beerstationThumb,
    num: '03',
    link: '/portofoliu/beerstation-ro'
  }
];

/* ─── Mobile: Liquid Glass Stacking ─── */
function MobileProjects() {
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
    const cardStep = 1 / featuredProjects.length;
    const start = index * cardStep;
    const end = (index + 1) * cardStep;

    const isPast = progress >= end && index < featuredProjects.length - 1;

    let opacity = 0;
    let y = 60;
    let scale = 0.92;
    let filter = 'blur(12px)';

    if (progress >= start) {
      const entryProgress = Math.min(1, (progress - start) / (cardStep * 0.35));
      opacity = entryProgress;
      y = 60 * (1 - entryProgress);
      scale = 0.92 + (0.08 * entryProgress);
      filter = `blur(${12 * (1 - entryProgress)}px)`;
    }

    if (isPast) {
      const exitProgress = Math.min(1, (progress - end) / (cardStep * 0.35));
      opacity = 1 - exitProgress;
      y = -50 * exitProgress;
      scale = 1 - (0.06 * exitProgress);
      filter = `blur(${12 * exitProgress}px)`;
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

        {/* Background glow */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(63,183,188,0.1) 0%, transparent 80%)' }} />

        {/* Section Header */}
        <div className="absolute top-20 left-6 right-6 z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-black text-text uppercase tracking-tight leading-[0.85] mb-4">
              Portofoliu
            </h2>
            <p className="text-muted text-lg font-medium leading-relaxed max-w-xs opacity-80">
              Munca vorbește mai bine decât orice descriere.
            </p>
          </motion.div>
        </div>

        {/* Projects Stack */}
        <div className="relative w-full h-[60vh] mt-32">
          {featuredProjects.map((project, i) => {
            const styles = getCardStyle(i);

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={styles}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: styles.display,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Link
                  to={project.link || "#"}
                  className="relative h-full w-full overflow-hidden block"
                  style={{
                    background: 'rgba(15, 15, 20, 0.98)',
                    backdropFilter: window.innerWidth < 768 ? 'none' : 'blur(20px)',
                    WebkitBackdropFilter: window.innerWidth < 768 ? 'none' : 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '2.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Full Project Image Background */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-50 transition-opacity duration-700"
                    />
                    {/* Gradient for content readability */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,15,20,0.4) 0%, rgba(15,15,20,0.95) 100%)' }} />
                  </div>

                  {/* Project Details */}
                  <div className="relative z-10 flex flex-col flex-1 p-9 justify-end">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
                      {project.category}
                    </span>

                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-5">
                      {project.title}
                    </h3>

                    <p className="text-muted text-base font-medium leading-relaxed mb-8 opacity-80">
                      {project.preview}
                    </p>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform"
                      >
                        Vezi proiectul <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Removed Progress Indicator per request */}
      </div>
    </section>
  );
}

/* ─── Desktop: original sticky card animation ─── */
function DesktopProjects() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - sectionTop;
      setProgress(Math.min(1, Math.max(0, scrolled / sectionHeight)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const card1 = {
    x: progress < 0.25 ? `${120 - (progress / 0.25) * 120}vw` : '0vw',
    scale: progress < 0.33 ? 1 : 1 - (Math.min(progress, 0.9) - 0.33) / 0.57 * 0.18,
    rotate: progress < 0.33 ? 0 : -(Math.min(progress, 0.9) - 0.33) / 0.57 * 8,
    opacity: progress < 0.33 ? 1 : 1 - (Math.min(progress, 0.9) - 0.33) / 0.57 * 0.7,
  };
  const card2 = {
    x: progress < 0.33 ? '120vw' : progress < 0.58 ? `${120 - ((progress - 0.33) / 0.25) * 120}vw` : '0vw',
    scale: progress < 0.66 ? 1 : 1 - (Math.min(progress, 0.9) - 0.66) / 0.24 * 0.08,
    rotate: progress < 0.66 ? 0 : -(Math.min(progress, 0.9) - 0.66) / 0.24 * 4,
    opacity: progress < 0.66 ? 1 : 1 - (Math.min(progress, 0.9) - 0.66) / 0.24 * 0.3,
  };
  const card3 = {
    x: progress < 0.66 ? '120vw' : progress < 0.90 ? `${120 - ((progress - 0.66) / 0.24) * 120}vw` : '0vw',
    scale: 1, rotate: 0, opacity: 1,
  };
  const cards = [card1, card2, card3];

  return (
    <section ref={sectionRef} style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="max-w-5xl mx-auto w-full px-6 flex flex-row items-center justify-between gap-12">
          <div className="w-[42%] z-20 flex flex-col justify-center text-left">
            <h2 className="text-7xl font-black text-text uppercase tracking-tight leading-[0.85]">Portofoliu</h2>
            <p className="mt-8 text-muted text-lg font-medium leading-relaxed max-w-lg">
              Munca vorbește mai bine decât orice descriere. Iată câteva proiecte.
            </p>
            <div className="mt-12">
              <Link to="/portofoliu" className="inline-flex items-center gap-3 text-sm text-text font-bold uppercase tracking-widest border border-white/20 px-8 py-4 rounded-full hover:bg-accent hover:text-background hover:border-accent transition-all duration-500">
                Vezi Tot Portofoliul <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="w-[50%] h-[75vh] relative z-10 flex items-center justify-center">
            {featuredProjects.map((project, index) => {
              const c = cards[index];
              return (
                <Link to={project.link || "#"} key={project.id} style={{ transform: `translateX(${c.x}) scale(${c.scale}) rotate(${c.rotate}deg)`, opacity: c.opacity, zIndex: index + 10, transition: 'none' }}
                  className="absolute block w-full h-full bg-background-secondary rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group origin-bottom-left cursor-pointer">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2.5s] ease-out opacity-60 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
                  </div>
                  <div className="relative z-20 p-12 h-full flex flex-col justify-end text-left">
                    <span className="inline-block text-accent font-bold tracking-[0.3em] text-xs uppercase mb-4">{project.category}</span>
                    <h3 className="text-4xl font-black text-text uppercase tracking-tight mb-4 leading-[0.9]">{project.title}</h3>
                    <p className="text-muted text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.preview}</p>
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

export default function HomeProjects() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}
