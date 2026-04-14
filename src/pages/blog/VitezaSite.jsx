import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function VitezaSite() {
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
                Performanță
            </span>
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                14 Oct 2024
            </span>
          </motion.div>
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.9] mb-8">
             Cum viteza site-ului îți sabotează conversia în 2024
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
             Analizăm tehnic de ce un timp de încărcare mai mare de 1.5s te costă până la 30% din veniturile lunare și cum rezolvă o arhitectură modernă această pierdere.
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
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2070&q=80" alt="Viteza Site Cover" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* 3. EDITORIAL TEXT (Reading Zone) */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 text-left">
         {/* Container pentru formatare editorială cursivă */}
         <div className="w-full">
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
               În 2024, competiția nu mai este dictată exclusiv de cel mai bun preț, ci și de fracțiunea de secundă în care clientul obține informația pe display. Răbdarea digitală s-a prăbușit. Dacă magazinul tău online se încarcă în mai mult de 2-3 secunde pe conexiuni mobile, produsele tale calitative devin invizibile pentru un public larg care apasă direct funcția de „Back”.
            </p>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
               De ce pierzi cu adevărat bani
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Studii realizate anual subliniază că rata de conversie suferă o prăbușire fulminantă (până la -10%) pentru fiecare secundă de întârziere care trece peste timpul considerat „optim”. Mai ales în cazul coșurilor pline, unde anxietatea confirmării comenzii sau completarea campurilor este ridicată, platformele vechi răspund încet și pun presiune.
            </p>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Paginile supraîncărcate cu script-uri de tracking sau marketing prost ordonate limitează browserul. Iar un website vizual înghețat creează frustrare asolută.
            </p>

            <blockquote className="my-16 pl-6 md:pl-8 py-2 border-l-4 border-accent text-white/90 text-2xl md:text-3xl leading-tight font-bold tracking-tight italic">
               "Un client care așteaptă intenționat încărcarea paginii este un client care capătă timp suficient ca să se răzgândească."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
               Soluția din 2024
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
               Migrarea către un ecosistem mai controlat (prin optimizări directe din panel-ul Shopify) și auditarea temei actuale este obligatorie. Treci la imagini native și renunță la orice aplicație/plugin instalat care nu guvernează peste funcții vitale. Răspunsul imediat la click este indicatorul suprem al calității, atât pentru client cât și pentru Google (SEO).
            </p>
         </div>
      </section>

      {/* 4. NEXT ARTICLE BUTTON */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
         <Link to="/blog/design-brutalist" className="group inline-flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto shadow-xl">
            <div className="text-left w-full md:w-auto">
               <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">ARTICOLUL URMĂTOR</div>
               <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors md:max-w-[320px] leading-snug">
                  Design Brutalist: Moft Estetic sau ROI Suprem?
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
