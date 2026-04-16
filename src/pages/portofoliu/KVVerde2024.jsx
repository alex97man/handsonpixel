import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ImageLightbox from '../../components/ImageLightbox';
import heroImg from '../../assets/KV-VLT-2024/hero_kv_vlt2024.jpg';
import secondaryImg from '../../assets/KV-VLT-2024/img1_kv_vlt2024.jpg';
import secondaryImg2 from '../../assets/KV-VLT-2024/img2_kv_vlt2024.jpg';
import secondaryImg3 from '../../assets/KV-VLT-2024/img3_kv_vlt2024.jpg';
import secondaryImg4 from '../../assets/KV-VLT-2024/img4_kv_vlt2024.jpg';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const allImages = [heroImg, secondaryImg, secondaryImg2, secondaryImg3, secondaryImg4];
const allAlts = ['Key Visual 2024 Hero', 'KV 2024 Detail 1', 'KV 2024 Detail 2', 'KV 2024 Detail 3', 'KV 2024 Detail 4'];

export default function KVVerde2024() {
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
      <SEO 
        title="Key Visual Verde la Teatru 2024"
        description="Identitate vizuală și materiale promoționale pentru ediția a 6-a a festivalului Verde la Teatru. Design grafic pentru print și digital."
      />
      <ImageLightbox images={allImages} alts={allAlts} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      {/* 1. HERO SECTION */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-8 max-w-5xl mx-auto relative z-10 w-full">
        <Link to="/portofoliu" className="inline-flex items-center gap-2 text-accent text-sm font-bold tracking-widest uppercase mb-12 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la portofoliu
        </Link>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          <motion.p variants={fadeUpVariants} className="text-white/50 uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6 flex items-center gap-4">
            Design Grafic
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.85] mb-8">
            KEY VISUAL VERDE LA TEATRU 2024<span className="text-accent font-['Russo_One'] ml-1">.</span>
          </motion.h1>
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
            src={heroImg} alt="Key Visual 2024 Hero" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* 3. TEXT INFO SPLIT */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Despre Proiect</h3>
            <p className="text-muted text-sm leading-relaxed">

              Key visual și materiale promoționale pentru ediția a 6-a a festivalului Verde la Teatru — declinări pentru print și digital.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Servicii Oferite</h3>
            <ul className="text-muted text-sm leading-relaxed space-y-2">
              <li>Identitate vizuală</li>
              <li>Social Media</li>
              <li>Materiale promoționale</li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Tool-uri</h3>
            <p className="text-muted text-sm leading-relaxed">Adobe Illustrator</p>
            <p className="text-muted text-sm leading-relaxed">Adobe Photoshop</p>
          </div>
        </div>
      </section>

      {/* 4. SECONDARY IMAGE / GALLERIES */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(1)} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 cursor-zoom-in">
            <img src={secondaryImg} alt="KV 2024 Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(2)} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 cursor-zoom-in">
            <img src={secondaryImg2} alt="KV 2024 Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(3)} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 cursor-zoom-in">
            <img src={secondaryImg3} alt="KV 2024 Detail 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(4)} className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 cursor-zoom-in">
            <img src={secondaryImg4} alt="KV 2024 Detail 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* 5. NEXT PROJECT BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
        <Link to="/portofoliu/rebranding-verde-la-teatru" className="group inline-flex items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto">
          <div className="text-left">
            <div className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">VEZI PROIECTUL URMĂTOR</div>
            <div className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">
              REBRANDING VERDE LA TEATRU
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
