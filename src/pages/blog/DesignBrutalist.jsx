import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function DesignBrutalist() {
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
                UI/UX
            </span>
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                02 Oct 2024
            </span>
          </motion.div>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.9] mb-8">
             Design Brutalist: Moft Estetic sau ROI Suprem?
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
             Interfețele au devenit curate până la pragul sterilității. Explorăm cum o abordare estetică agresivă sparge tiparele de ignoranță ale consumatorului.
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
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1964&q=80" alt="Design Brutalist Cover" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* 3. EDITORIAL TEXT (Reading Zone) */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 text-left">
         {/* Container pentru formatare editorială cursivă */}
         <div className="w-full">
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
               În încercarea de a face absolut totul „perfect accesibil” și minimalist, industria web a generat vizualuri unde totul e la fel, totul are colțuri rotunjite perfect, iar umbrele sunt infinitezimale. Așa ajungi ca noul tău produs să devină total ignorat de creierul obosit al vizitatorului.
            </p>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
               Riscul Sterilității
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Design-ul utilitar a învins originalitatea pe extrem de multe ramuri. Consumatorii trec peste layout-uri complet plictisiți. Aici intervine conceptul de brutalism în mediu digital — asimetrie controlată, tipografie uriașă tăiată brusc ori tranziții șocante pe care interfața le preia în modul întunecat sau aprins intens.
            </p>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Acel contrast brutal trezește atenția din modul „auto-pilot”.
            </p>

            <blockquote className="my-16 pl-6 md:pl-8 py-2 border-l-4 border-accent text-white/90 text-2xl md:text-3xl leading-tight font-bold tracking-tight italic">
               "În marea estetică de un gri uniform corporatist, curajul de a fi inofensiv atrage doar o cotă plictisită de piață."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
               Impactul Financiar al Îndrăznelii
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Aplicarea unor design-uri atipice nu mai e o strategie rezervată artiștilor independenți. Din ce în ce mai multe branduri premium se bazează pe UI brutal pentru a se disocia instant. Memoriabilitatea creată prin decizii puternice funcționează direct proporțional cu intenția clientului de a ține minte brandul după achiziție. Fii bold!
            </p>
         </div>
      </section>

      {/* 4. NEXT ARTICLE BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
         <Link to="/blog/headless-ecommerce" className="group inline-flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto shadow-xl">
            <div className="text-left w-full md:w-auto">
               <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">ARTICOLUL URMĂTOR</div>
               <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors md:max-w-[320px] leading-snug">
                  Headless E-commerce: Sfârșitul temelor grele
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
