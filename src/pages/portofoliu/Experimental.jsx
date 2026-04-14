import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Experimental() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div className="w-full relative break-words text-text pb-24">
      {/* 1. HERO SECTION */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-8 max-w-5xl mx-auto relative z-10 w-full">
        <Link to="/portofoliu" className="inline-flex items-center gap-2 text-accent text-sm font-bold tracking-widest uppercase mb-12 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la portofoliu
        </Link>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          <motion.p variants={fadeUpVariants} className="text-white/50 uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6 flex items-center gap-4">
            Fotografie de produs / 360
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.85] mb-8">
            EXPERIMENTAL<span className="text-accent font-['Russo_One'] ml-1">.</span>
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed">
             Proiect cu focus pe vizualizări 360° și fundaluri dinamice.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. MAIN IMAGE BANNER */}
      <section ref={targetRef} className="px-6 md:px-8 max-w-5xl mx-auto mb-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-[2.5rem] overflow-hidden aspect-video border border-white/10 relative"
        >
          <motion.img 
             style={{ y, scale: 1.3 }}
             src="https://handsonpixel.ro/wp-content/uploads/2026/01/PNGALCALIA-scaled.png" alt="Experimental Showcase" className="w-full h-full object-cover origin-center" />
        </motion.div>
      </section>

      {/* 3. TEXT INFO SPLIT */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
               <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Focusul Sesiunii</h3>
               <p className="text-muted text-sm leading-relaxed">
                  Testarea setup-ului pentru interacțiuni 360 pe web, cu texturi și iluminații complexe (sticlă, reflexii).
               </p>
            </div>
            <div className="md:col-span-1">
               <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Servicii</h3>
               <ul className="text-muted text-sm leading-relaxed space-y-2">
                  <li>Sesiune Foto 360°</li>
                  <li>Retuș avansat</li>
                  <li>Integrare Spinner Web</li>
               </ul>
            </div>
            <div className="md:col-span-1">
               <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Utilizare</h3>
               <p className="text-muted text-sm leading-relaxed">Web Interactiv / Portofoliu Intern</p>
            </div>
         </div>
      </section>

      {/* 4. SECONDARY IMAGE / GALLERIES */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10">
          <img src="https://handsonpixel.ro/wp-content/uploads/2026/01/PNGALCALIA-scaled.png" alt="Detail 1" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 relative">
          <div className="absolute inset-0 bg-accent/5 flex items-center justify-center p-8 text-center">
             <p className="text-white text-xl font-medium tracking-wide">Aici poți insera plugin-ul de rotire 360.</p>
          </div>
        </motion.div>
      </section>

      {/* 5. NEXT PROJECT BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
         <Link to="/portofoliu/blue" className="group inline-flex items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto">
            <div className="text-left">
               <div className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">VEZI PROIECTUL URMĂTOR</div>
               <div className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">
                  BLUE
               </div>
            </div>
            <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
               <ArrowRight className="w-5 h-5 text-white group-hover:text-background transition-colors" />
            </div>
         </Link>
      </section>
    </div>
  );
}
