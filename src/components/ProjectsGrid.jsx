import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import vlt2024Hero from '../assets/KV-VLT-2024/hero_kv_vlt2024.jpg';
import vlt2025Hero from '../assets/KV-VLT-2025/hero_kv_vlt2025.jpg';
import packshotThumb from '../assets/PACKSHOT/HERO_BANNER_PACKSHOT.jpg';
import blueThumb from '../assets/BLUE/BLUE2.jpg';
import experimentalThumb from '../assets/EXPERIMENTAL/banner ulei.jpg';
import beerstationThumb from '../assets/BEERSTATION.RO/img3.jpg';
import personalizabileThumb from '../assets/PRODUSE-PERSONALIZABILE/banner.jpg';
import soulyPhotoThumb from '../assets/SOULYPHOTO/5.jpg';
import soulyRoThumb from '../assets/souly.ro/banner12.png';
import rebrandingThumb from '../assets/REBRANDING-VLT/banner.jpg';
import logoSoulyThumb from '../assets/souly-logo/banner.jpg';
import researchThumb from '../assets/research/Scene11.jpg';
import mmaThumb from '../assets/MMA/BANNERHEROMMA.jpg';


const BlueDot = () => <span className="text-accent font-['Russo_One'] ml-1">.</span>;

const projects = [
  { id: 1, title: 'PRODUSE PERSONALIZABILE', category: 'Fotografie packshot', mainCategory: 'FOTOGRAFIE', image: personalizabileThumb, link: '/portofoliu/produse-personalizabile' },
  { id: 2, title: 'RESEARCH REPORT', category: 'Design Raport / Revistă', mainCategory: 'DESIGN', image: researchThumb, link: '/portofoliu/research-report' },
  { id: 3, title: 'PACKSHOT', category: 'Fotografie packshot & atmospheric', mainCategory: 'FOTOGRAFIE', image: packshotThumb, link: '/portofoliu/packshot' },
  { id: 4, title: 'BLUE', category: 'Fotografie atmospheric & 360', mainCategory: 'FOTOGRAFIE', image: blueThumb, link: '/portofoliu/blue' },
  { id: 5, title: 'SOULY.RO', category: 'E-commerce Shopify', mainCategory: 'E-COMMERCE', image: soulyRoThumb, link: '/portofoliu/souly-ro' },
  { id: 6, title: 'SOULY Photography', category: 'Fotografie packshot & atmospheric', mainCategory: 'FOTOGRAFIE', image: soulyPhotoThumb, link: '/portofoliu/souly-photo' },
  { id: 7, title: 'LOGO SOULY', category: 'Identitate vizuală', mainCategory: 'DESIGN', image: logoSoulyThumb, link: '/portofoliu/logo-souly' },
  { id: 8, title: 'KV VERDE LA TEATRU 2025', category: 'Identitate vizuală', mainCategory: 'DESIGN', image: vlt2025Hero, link: '/portofoliu/kv-verde-la-teatru-2025' },
  { id: 9, title: 'BEERSTATION.RO', category: 'E-commerce Shopify', mainCategory: 'E-COMMERCE', image: beerstationThumb, link: '/portofoliu/beerstation-ro' },
  { id: 10, title: 'EXPERIMENTAL', category: 'Fotografie atmospheric & 360', mainCategory: 'FOTOGRAFIE', image: experimentalThumb, link: '/portofoliu/experimental' },
  { id: 11, title: 'KV VERDE LA TEATRU 2024', category: 'Identitate vizuală', mainCategory: 'DESIGN', image: vlt2024Hero, link: '/portofoliu/kv-verde-la-teatru-2024' },
  { id: 12, title: 'REBRANDING VERDE LA TEATRU', category: 'Identitate vizuală', mainCategory: 'DESIGN', image: rebrandingThumb, link: '/portofoliu/rebranding-verde-la-teatru' },
  { id: 13, title: 'KV - GALA MMA', category: 'Identitate vizuală', mainCategory: 'DESIGN', image: mmaThumb, link: '/portofoliu/kv-gala-mma' },

];

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer relative"
    >
      <Link to={project.link || '#'} className="block h-full w-full">
        <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-background-secondary border border-white/10 shadow-[0_0_25px_rgba(63,183,188,0.1)] group-hover:shadow-[0_0_40px_rgba(63,183,188,0.2)] transition-all duration-700">

          {/* Background Image - Full Color */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2.5s] ease-out opacity-80 group-hover:opacity-100"
              />
            </div>

            {/* Deep Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
          </div>

          {/* Project Details - Balanced Sizing */}
          <div className="relative z-20 p-10 h-full flex flex-col justify-end text-left">
            <span className="inline-block text-accent font-bold tracking-[0.3em] text-[10px] uppercase mb-3">
              {project.mainCategory}
            </span>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1 leading-tight">
              {project.title}
            </h3>

            <p className="text-white/40 text-[11px] font-medium tracking-wide mb-4">
              {project.category}
            </p>

            <div className="w-8 h-[2px] bg-accent/50 group-hover:w-16 transition-all duration-500" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState(null);

  const categories = ['E-COMMERCE', 'FOTOGRAFIE', 'DESIGN'];

  const filteredProjects = activeFilter
    ? projects.filter(p => p.mainCategory === activeFilter)
    : projects;

  return (
    <section id="portofoliu" className="py-24 relative overflow-hidden">

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-accent/50 block" />
              Portofoliu
            </p>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.85]">
              Proiecte<BlueDot />
            </h2>

            <p className="mt-8 text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed">
              Lucrări care vorbesc prin rezultate, nu doar estetică.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3 md:gap-4 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-8 py-4 rounded-full border transition-all duration-300 ${activeFilter === cat
                    ? 'bg-accent text-background border-accent'
                    : 'bg-white/[0.03] text-text border-white/10 hover:border-accent/50'
                    }`}
                >
                  {cat}
                </button>
              ))}

              <AnimatePresence>
                {activeFilter && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    onClick={() => setActiveFilter(null)}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-text hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

