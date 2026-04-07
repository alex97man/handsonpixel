import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Abordarea Hands On Pixel a schimbat radical modul în care ne prezentăm produsele online. Conversia a crescut, iar brandul se simte acum cu adevărat premium.",
    author: "Maria D.",
    role: "Fondator, Souly.ro",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 2,
    text: "Esența colaborării noastre a fost încrederea. Au înțeles viziunea noastră pentru BeerStation mai bine decât noi și au executat-o fără cusur.",
    author: "Andrei G.",
    role: "Owner, BeerStation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 3,
    text: "Tehnic vorbind, sunt ireproșabili. Viteza site-ului și fluxul UX pe care l-au creat ne-au ajutat să reducem rata de abandon a coșului cu peste 40%.",
    author: "Ioana V.",
    role: "Manager Producție, Packshot Studio",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-8 max-w-6xl mx-auto relative z-10 overflow-hidden">
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="text-center mb-24"
      >
        <motion.p variants={fadeUpVariants} className="text-accent uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6">
          CE SPUN PARTENERII
        </motion.p>
        <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Rezultate care <span className="text-white/20">Vorbesc</span>.
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            variants={fadeUpVariants}
            transition={{ delay: idx * 0.15 }}
            className="group relative backdrop-blur-xl bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 flex flex-col h-full hover:border-accent/40 transition-all duration-700 hover:shadow-2xl hover:shadow-accent/5 origin-bottom"
          >
            {/* Quote Icon Background */}
            <div className="absolute top-10 right-10 text-accent/5 group-hover:text-accent/10 transition-colors">
              <Quote className="w-16 h-16 fill-current" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <p className="text-lg md:text-xl text-muted font-medium leading-relaxed italic mb-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors shadow-lg shadow-black/40">
                  <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-text font-black uppercase text-sm tracking-widest">{t.author}</h4>
                  <p className="text-muted text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{t.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
