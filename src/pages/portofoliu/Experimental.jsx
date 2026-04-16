import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ImageLightbox from '../../components/ImageLightbox';
import heroImg from '../../assets/EXPERIMENTAL/banner ulei.jpg';
import ulei1 from '../../assets/EXPERIMENTAL/ulei1.png';
import ulei2 from '../../assets/EXPERIMENTAL/ulei2.png';
import ulei3 from '../../assets/EXPERIMENTAL/DSC013362.png';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const allImages = [heroImg, ulei1, ulei2, ulei3];
const allAlts = ['Experimental Hero', 'Ulei Detaliu 1', 'Ulei Detaliu 2', 'Ulei Detaliu 3'];

export default function Experimental() {
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
        title="Experimental | Product Photography Study"
        description="Explorare vizuală pe produse cosmetice: Fotografie editorială și 360° cu focalizare pe lumini și atmosferă premium."
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
            Fotografie de produs
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.85] mb-8">
            EXPERIMENTAL<span className="text-accent font-['Russo_One'] ml-1">.</span>
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
            src={heroImg} alt="Experimental Project Hero" className="w-full h-full object-cover origin-center" />
        </motion.div>
      </section>

      {/* 3. TEXT INFO SPLIT */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Despre proiect</h3>
            <p className="text-muted text-sm leading-relaxed">
              Fotografie editorială și 360° pe produse cosmetice și parfumuri — explorare de lumini, atmosferă și unghiuri pentru categorii cu complexitate vizuală ridicată.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Servicii</h3>
            <ul className="text-muted text-sm leading-relaxed space-y-2">
              <li>Fotografie atmospheric</li>
              <li>Fotografie 360</li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-widest text-accent mb-4">Utilizare</h3>
            <p className="text-muted text-sm leading-relaxed">E-commerce & campanii digitale</p>
          </div>
        </div>
      </section>

      {/* 4. SECONDARY IMAGE / GALLERIES */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(1)} className="rounded-[2.5rem] overflow-hidden aspect-[1/2] border border-white/10 cursor-zoom-in">
            <img src={ulei1} alt="Product detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(2)} className="rounded-[2.5rem] overflow-hidden aspect-[1/2] border border-white/10 cursor-zoom-in">
            <img src={ulei2} alt="Product detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} onClick={() => openLightbox(3)} className="rounded-[2.5rem] overflow-hidden aspect-[1/2] border border-white/10 cursor-zoom-in">
            <img src={ulei3} alt="Product detail 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* 5. INTERACTIVE 360 VIEW */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text uppercase tracking-tight mb-4">Experiență 360°<span className="text-accent font-['Russo_One'] ml-1">.</span></h2>
          <p className="text-muted text-lg">Interacționează cu produsul vizualizând fiecare detaliu.</p>
        </motion.div>

        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} className="w-full rounded-[2.5rem] overflow-hidden aspect-video md:aspect-[21/9] border border-white/10 bg-white relative flex items-center justify-center p-4">
          <iframe src="https://alex97man.sirv.com/360/360kelvin.spin" width="100%" height="100%" frameBorder="0" allowFullScreen className="w-full h-full absolute inset-0"></iframe>
        </motion.div>
      </section>

      {/* 6. NEXT PROJECT BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
        <Link to="/portofoliu/kv-verde-la-teatru-2024" className="group inline-flex items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto">
          <div className="text-left">
            <div className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">VEZI PROIECTUL URMĂTOR</div>
            <div className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">
              KV VERDE LA TEATRU 2024
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
