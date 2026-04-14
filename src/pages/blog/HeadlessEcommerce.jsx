import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeadlessEcommerce() {
  return (
    <div className="w-full relative break-words text-text pb-24 min-h-screen">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-8 max-w-5xl mx-auto relative z-10 w-full text-left">
        <Link to="/blog" className="inline-flex items-center gap-2 text-accent text-sm font-bold tracking-widest uppercase mb-12 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la Blog
        </Link>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          <motion.div variants={fadeUpVariants} className="flex items-center justify-start gap-4 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold uppercase tracking-widest">
                Tehnologie
            </span>
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                24 Sep 2024
            </span>
          </motion.div>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.9] mb-8">
             Headless E-commerce: Sfârșitul temelor grele
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
             De ce abandonăm temele monolitice pentru dezvoltare modernă și arhitecturi complet decouple-ate orientate pe rezultate infinite.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. MAIN IMAGE BANNER */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-20 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-[2.5rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80" alt="Headless Ecommerce Cover" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* 3. EDITORIAL TEXT (Reading Zone) */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 text-left">
         {/* Container pentru formatare editorială cursivă */}
         <div className="w-full">
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
               Magazinul tradițional, cel care își deține „baza de date” legată strâns în același cod sursă cu interfața sa (front-end), devine perimat. Limitările codului, a temelor prestabilite, toate acestea pot fi îndepărtate cu un singur concept radical — decuplarea. Așa a apărut conceptul „Headless”.
            </p>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
               Libertatea Front-End
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Headless e-commerce înseamnă literalmente desfacerea „capului” unui site. Baza de date cu produse (Shopify, de exemplu) continuă să guverneze logica grea, însă prezentarea (designul pe care îl vizitează clientul) este scrisă într-un framework nou, ultra-rapid. Ele două vorbesc prin limbaj direct de legătură (API-uri).
            </p>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Asta rezolvă absolut orice barieră tehnică de design vizual. Dacă poți să ai ideea de animație pe foaie, se poate face, fiindcă nu ești oprit de regulile unei „teme” îngreunate de module vechi.
            </p>

            <blockquote className="my-16 pl-6 md:pl-8 py-2 border-l-4 border-accent text-white/90 text-2xl md:text-3xl leading-tight font-bold tracking-tight italic">
               "Magazinul tău decuplat va deservi date de performanță absolut incredibile. Timpul de load sub o secundă este noul standard aurifer."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
               Efectele Reale De Randament
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Scalabilitatea este infinită. Fie că vizitatorii devin de 10 ori mai mulți mâine sau că dorești platforma conectată la dispozitive inteligente Internet Of Things... flexibilitatea unei structuri decouple-ate îți oferă capacitatea rapidă de adaptare.
            </p>
         </div>
      </section>

      {/* 4. NEXT ARTICLE BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
         <Link to="/blog/viteza-site" className="group inline-flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto shadow-xl">
            <div className="text-left w-full md:w-auto">
               <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">ARTICOLUL URMĂTOR</div>
               <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors md:max-w-[320px] leading-snug">
                  Cum viteza site-ului îți sabotează conversia în 2024
               </div>
            </div>
            <div className="w-14 h-14 shrink-0 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 self-end md:self-auto">
               <ArrowRight className="w-6 h-6 text-white group-hover:text-background transition-colors" />
            </div>
         </Link>
      </section>
    </div>
  );
}
