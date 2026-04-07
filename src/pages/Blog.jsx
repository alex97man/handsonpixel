import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlueDot = () => <span className="text-accent font-['Russo_One'] ml-1">.</span>;

// Mock Articles Data
const articles = [
  {
    id: 1,
    title: "Cum viteza site-ului îți sabotează conversia în 2024",
    excerpt: "Analizăm tehnic de ce un timp de încărcare mai mare de 1.5s te costă până la 30% din veniturile lunare și cum rezolvă o arhitectură hibridă React această pierdere imensă.",
    category: "Performanță",
    date: "14 Oct 2024",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Design Brutalist: Moft Estetic sau ROI Suprem?",
    excerpt: "Interfețele au devenit curate până la pragul sterilității. Explorăm cum o abordare estetică agresivă sparge tiparele de ignoranță ale consumatorului.",
    category: "UI/UX",
    date: "02 Oct 2024",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1964&q=80"
  },
  {
    id: 3,
    title: "Headless E-commerce: Sfârșitul temelor grele",
    excerpt: "De ce abandonăm temele monolit pentru dezvoltare custom și arhitecturi complet decouple-ate pentru flexibilitate infinită.",
    category: "Tehnologie",
    date: "24 Sep 2024",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80"
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Blog() {
  // State to track which article card the mouse is currently hovering over.
  // This powers the "dimming" effect on untouched cards.
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="w-full relative break-words text-text min-h-screen">

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-8 max-w-5xl mx-auto relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.p variants={fadeUpVariants} className="text-accent uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-accent/50 block" />
            Jurnal
          </motion.p>

          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.85] mb-8">
            Gânduri <br />
            <span className="text-white/20">& Cod<BlueDot /></span>
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed">
            Note de arhitectură, experimente de design extrem și analitice pure din spatele magazinelor online pe care le construim.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. PREMIUM ARTICLE GRID WITH TRANSITIONS */}
      <section className="pb-32 px-6 md:px-8 max-w-5xl mx-auto relative z-10">

        {/* We use a CSS grid: 1 column on mobile, 2 on md+ displays. 
            The featured article will span across 2 columns. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {articles.map((article, index) => {
            // Logic for the Focus state
            const isDimmed = hoveredId !== null && hoveredId !== article.id;
            const isHovered = hoveredId === article.id;

            return (
              <motion.div
                key={article.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-5%" }}
                variants={fadeUpVariants}
                transition={{ delay: index * 0.1 }}
                // If it's featured, span both columns on large screens
                className={`group relative rounded-[2rem] overflow-hidden bg-background-secondary border border-white/5 cursor-pointer origin-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                   ${article.featured ? 'md:col-span-2 aspect-[4/5] md:aspect-[21/9]' : 'aspect-square md:aspect-[4/5]'}
                `}
                // Apply inline styles for the premium transformation instead of Tailwind purely, 
                // as Framer handles dynamic sizing smoother, but simple inline transform works perfectly here.
                style={{
                  opacity: isDimmed ? 0.4 : 1,
                  transform: isDimmed ? 'scale(0.98)' : 'scale(1)',
                  filter: isDimmed ? 'saturate(0)' : 'saturate(1)'
                }}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
              >

                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 opacity-40 mix-blend-overlay"
                  />
                </div>

                {/* Gradient Overlays for readable text */}
                <div className={`absolute inset-0 transition-opacity duration-700
                   ${article.featured
                    ? 'bg-gradient-to-t from-background via-background/60 to-transparent'
                    : 'bg-gradient-to-t from-background via-background/80 to-transparent'
                  }
                `} />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">

                  {/* Meta (Top tags - positioned absolutely at the top rather than flex flow to keep text anchored bottom) */}
                  <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-4">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                      {article.category}
                    </span>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                      {article.date}
                    </span>
                  </div>

                  {/* Main Text Content */}
                  <div className="relative z-10 w-full max-w-2xl">
                    <h2 className={`font-black uppercase text-white mb-4 leading-[1.1] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2
                        ${article.featured ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'}
                     `}>
                      {article.title}
                    </h2>

                    <p className={`text-muted font-medium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 mb-0 overflow-hidden text-base md:text-lg
                        ${article.featured ? 'block' : 'hidden md:block'}
                     `}>
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Massive Animated Arrow indicating link */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-md transition-colors duration-500 group-hover:bg-accent group-hover:border-accent">
                  <ArrowUpRight className="w-8 h-8 text-white transition-all duration-500 transform translate-y-8 -translate-x-8 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  {/* Default arrow that slides out */}
                  <ArrowUpRight className="w-8 h-8 text-white/50 absolute transition-all duration-500 transform group-hover:-translate-y-8 group-hover:translate-x-8 group-hover:opacity-0" />
                </div>

                {/* Just a dummy link wrapper covering the card */}
                <Link to="#" className="absolute inset-0 z-20"><span className="sr-only">Citește articolul</span></Link>

              </motion.div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
