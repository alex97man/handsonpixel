import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageLightbox from '../../components/ImageLightbox';
import heroImg from '../../assets/souly-logo/banner.jpg';
import img1 from '../../assets/souly-logo/img1.jpg';
import img2 from '../../assets/souly-logo/img2.jpg';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const allImages = [heroImg, img1, img2];
const allAlts = ['Logo Souly Hero', 'Logo Souly Detail 1', 'Logo Souly Detail 2'];

export default function LogoSouly() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length);
  const nextImage = () => setLightboxIndex(i => (i + 1) % allImages.length);

  return (
    <div className="w-full relative break-words text-text pb-24">
      <ImageLightbox images={allImages} alts={allAlts} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />

      {/* 1. HERO SECTION */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-8 max-w-5xl mx-auto relative z-10 w-full">
        <Link to="/portofoliu" className="inline-flex items-center gap-2 text-accent text-sm font-bold tracking-widest uppercase mb-12 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la portofoliu
        </Link>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          <motion.p variants={fadeUpVariants} className="text-white/50 uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6 flex items-center gap-4">
            Design Grafic / Identitate
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.85] mb-8">
            LOGO SOULY<span className="text-accent font-['Russo_One'] ml-1">.</span>
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed">
             Crearea unui simbol atemporal care îmbină minimalismul cu esența brandului.
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
          className="w-full rounded-[2.5rem] overflow-hidden aspect-video border border-white/10 relative cursor-zoom-in"
          onClick={() => openLightbox(0)}
        >
          <motion.img
             style={{ y, scale: 1.3 }}
             src={heroImg} alt="Logo Souly Design" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* 3. TEXT INFO SPLIT */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
               <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Despre Proiect</h3>
               <p className="text-muted text-sm leading-relaxed">
                  Procesul creativ pentru Logo-ul Souly s-a bazat pe puritatea formelor și pe o estetică modernă, capabilă să rezoneze pe termen lung.
               </p>
            </div>
            <div className="md:col-span-1">
               <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Servicii Oferite</h3>
               <ul className="text-muted text-sm leading-relaxed space-y-2">
                  <li>Visual Discovery</li>
                  <li>Sketching &amp; Refinement</li>
                  <li>Final Vector Assets</li>
               </ul>
            </div>
            <div className="md:col-span-1">
               <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Client</h3>
               <p className="text-muted text-sm leading-relaxed">Souly</p>
            </div>
         </div>
      </section>

      {/* 4. SECONDARY IMAGE / GALLERIES */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(1)} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 cursor-zoom-in">
          <img src={img1} alt="Logo Souly Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </motion.div>
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(2)} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 cursor-zoom-in">
          <img src={img2} alt="Logo Souly Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </motion.div>
      </section>

      {/* 5. NEXT PROJECT BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
         <Link to="/portofoliu/kv-verde-la-teatru-2025" className="group inline-flex items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto">
            <div className="text-left">
               <div className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">VEZI PROIECTUL URMĂTOR</div>
               <div className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">
                  KV VERDE LA TEATRU 2025
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
