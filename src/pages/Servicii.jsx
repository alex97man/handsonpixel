import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, PenTool, Camera, Check, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlueDot = () => <span className="text-accent font-['Russo_One'] ml-1">.</span>;

// Mock Data for the Services / Pricing Packages
const services = [
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce Shopify',
    description: 'Arhitectură tehnică impecabilă și viteză de încărcare extremă pentru magazine care domină piața.',
    packages: [
      {
        name: 'Configurare Start',
        desc: 'Structură de bază pentru branduri noi.',
        price: 'Preț la cerere',
        features: ['Configurare cont Shopify', 'Implementare Temă Standard', 'Sisteme de Livrare și Plată', 'Optimizare Mobile Basic']
      },
      {
        name: 'Design Custom',
        desc: 'Platforma completă pentru conversie maximă.',
        price: 'Preț la cerere',
        features: ['Design Interfață 100% Personalizat', 'Viteză extremă garantată', 'Flow-uri de Upsell automatizat', 'Animații Awwwards-style'],
        highlight: true
      },
      {
        name: 'Scoring & Migrare',
        desc: 'Pentru magazinele cu volum mare.',
        price: 'Preț la cerere',
        features: ['Migrare sigură date din alt CMS', 'Setări Headless (la cerere)', 'Integrare API ERP / CRM', 'Mentenanță și Support Extins']
      }
    ]
  },
  {
    id: 'ui-ux',
    icon: PenTool,
    title: 'Design UI / UX',
    description: 'Interfețe care arată premium, se simt organic și forțează psihologic utilizatorul să convertească.',
    packages: [
      {
        name: 'Audit UX',
        desc: 'Evaluare și optimizare rapidă a conversiei.',
        price: 'Preț la cerere',
        features: ['Analiză Heuristică a fluxului', 'Raport Optimizare Checkout', 'Wireframes / Schițe de bază']
      },
      {
        name: 'Redesign Total',
        desc: 'Abordarea vizuală absolută, de la zero.',
        price: 'Preț la cerere',
        features: ['Cercetare UX Avansată', 'Sistem de Design în Figma', 'Micro-Interacțiuni & Prototip', 'Fisiere gata de implementare'],
        highlight: true
      },
      {
        name: 'Brand Identity',
        desc: 'Identitate vizuală integrată în produs.',
        price: 'Preț la cerere',
        features: ['Logo & Manual de Brand', 'Tipografie & Cromatică', 'Livrabile pentru rețele sociale']
      }
    ]
  },
  {
    id: 'fotografie',
    icon: Camera,
    title: 'Fotografie Produs',
    description: 'Provocăm vizual dorința instantanee prin iluminare brutal de curată și un stil editorial superior.',
    packages: [
      {
        name: 'Packshot Pur',
        desc: 'Produse curate, izolate impecabil.',
        price: 'Preț la cerere',
        features: ['Fundal Alb/Gri pur', 'Corecție de culoare perfectă', 'Îndepărtare Defecte', 'Livrabil ultra hi-res e-commerce']
      },
      {
        name: 'Creative Editorial',
        desc: 'Plasarea produsului într-o poveste.',
        price: 'Preț la cerere',
        features: ['Direcție Artistică Completă', 'Set Design & Recuzită premium', 'Umbre și texturi texturate', 'Format optimizat Web & Meta Ads'],
        highlight: true
      },
      {
        name: 'Campanie Hero',
        desc: 'Producție vizuală masivă cu modele.',
        price: 'Preț la cerere',
        features: ['Concepte Hero Bannere', 'Manipulare Foto Hi-End (CGI)', 'Planificare sesiuni cu modele']
      }
    ]
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Servicii() {
  const [activeId, setActiveId] = useState(null);

  // Toggle accordion; if clicking the same one, close it.
  const handleClick = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full relative break-words text-text">
      
      {/* 1. HERO SECTION */}
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
            Ce Oferim
          </motion.p>
          
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.85] mb-8">
            Pachete <br/>
            <span className="text-white/20">De Impact<BlueDot/></span>
          </motion.h1>
          
          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed">
            Nu vindem ore, vindem rezultate clare. Explorează mai jos ariile noastre de expertiză și transparenta modulelor de lucru.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. ACCORDION SERVICES */}
      <section className="pb-32 px-6 md:px-8 max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col gap-6">
          {services.map((service) => {
            const isActive = activeId === service.id;
            const IconComponent = service.icon;

            return (
              <motion.div 
                layout
                key={service.id}
                onClick={() => handleClick(service.id)}
                className={`group cursor-pointer border rounded-[2rem] overflow-hidden transition-colors duration-500 relative ${
                  isActive 
                    ? 'border-accent/30 bg-background-secondary shadow-[0_0_50px_rgba(63,183,188,0.05)]' 
                    : 'border-white/5 bg-background-secondary hover:border-white/10'
                }`}
              >
                {/* 2.1 Always Visible Header Bar */}
                <motion.div 
                  layout="position" 
                  className="p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-20"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    {/* Icon Box */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-500 ${
                      isActive ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/10 group-hover:border-white/20'
                    }`}>
                      <IconComponent className={`w-8 h-8 transition-colors duration-500 ${isActive ? 'text-accent' : 'text-text'}`} />
                    </div>
                    {/* Title & Desc */}
                    <div>
                      <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mb-2 transition-colors duration-500 ${isActive ? 'text-accent' : 'text-text'}`}>
                        {service.title}
                      </h2>
                      <p className="text-muted text-base md:text-lg font-medium max-w-xl">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Plus / Close Icon Indicator */}
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-transparent backdrop-blur-md transition-colors m-auto md:m-0 mt-4 md:mt-auto group-hover:border-accent/50">
                     <motion.div animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.3 }}>
                        <Plus className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-white'}`} />
                     </motion.div>
                  </div>
                </motion.div>

                {/* 2.2 Expandable Content Area */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3, delay: 0.1 }
                      }}
                      className="overflow-hidden bg-background/50 relative z-10"
                    >
                      <div className="p-6 md:p-10 pt-0 md:pt-4">
                        <div className="w-full h-[1px] bg-white/5 mb-10" />
                        
                        {/* Pricing Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-10">
                          {service.packages.map((pkg, pIdx) => (
                            <div
                              key={pIdx}
                              className={`flex flex-col rounded-[1.5rem] p-8 relative overflow-hidden transition-all duration-300 ${
                                pkg.highlight 
                                  ? 'bg-accent/[0.05] border-accent/30 shadow-[0_0_30px_rgba(63,183,188,0.1)]' 
                                  : 'bg-transparent backdrop-blur-sm border-white/5 border'
                              } border`}
                            >
                              {pkg.highlight && (
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-accent/20 rounded-full blur-[40px] pointer-events-none" />
                              )}

                              {/* Card Content... */}
                              <div className="mb-6 relative z-10">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-text">
                                  {pkg.name}
                                </h3>
                                <p className="text-muted text-sm font-medium h-10 border-b border-white/10 pb-4">
                                  {pkg.desc}
                                </p>
                              </div>

                              <div className="mb-8 relative z-10">
                                <div className="text-2xl font-black uppercase text-white mb-2 tracking-tight">
                                  {pkg.price}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                                  Estimare / Modular
                                </div>
                              </div>

                              <ul className="space-y-4 mb-8 flex-grow relative z-10">
                                {pkg.features.map((feature, fIdx) => (
                                  <li key={fIdx} className="flex items-start gap-4">
                                    <div className="mt-1 w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                      <Check className="w-2.5 h-2.5 text-accent" />
                                    </div>
                                    <span className="text-muted text-sm font-medium leading-relaxed">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="mt-auto relative z-10">
                                <div className={`w-full hover:scale-[1.02] cursor-pointer py-4 text-center rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                                  pkg.highlight ? 'bg-accent text-background' : 'bg-white/5 text-text border border-white/10 hover:bg-white/10'
                                }`}>
                                  Discută Proiectul
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>

                        {/* Direct Link to Portfolio tailored to the service */}
                        <div className="text-center md:text-left flex justify-center md:justify-start">
                           <Link 
                              to="/portofoliu" 
                              className="inline-flex items-center gap-3 text-sm text-text font-bold uppercase tracking-widest px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                              onClick={(e) => e.stopPropagation()} // Prevent toggling the accordion when clicking link
                            >
                              Vezi exemple din {service.title} 
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
      
    </div>
  );
}
