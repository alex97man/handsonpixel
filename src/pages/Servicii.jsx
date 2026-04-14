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
    description: 'Soluții complete — temă premium, configurare și integrări esențiale pentru un magazin funcțional de la prima zi.',
    packages: [
      {
        name: 'SHOPIFY START',
        desc: 'Magazinul tău online, gata de lansare.',
        price: '900€',
        features: ['Temă inclusă', 'Personalizare după culorile brandului', 'Setări de bază, plată & livrare', 'Filtre, search, pagini esențiale & FAQ', 'Email-uri automate de bază', 'Organizare colecții', 'Listare până la 25 SKU', 'Mentenanță 7 zile']
      },
      {
        name: 'SHOPIFY PLUS',
        desc: 'Tot ce ai nevoie să vinzi mai mult din prima zi.',
        price: '1.300€',
        features: ['Tot ce include Start', 'Chat cu răspunsuri prestabilite', 'Aplicație logistică (xConnector)', 'Mail coș & checkout abandonat', 'Integrare aplicație recenzii', 'Listare până la 50 SKU', 'Mentenanță 14 zile'],
        highlight: true
      },
      {
        name: 'SHOPIFY PRO',
        desc: 'Experiență completă, magazin construit să crească.',
        price: '1.800€',
        features: ['Tot ce include Plus', 'Conectare Google & Meta', 'Popup abonare și automatizare', '3 secțiuni custom', 'Listare până la 100 SKU', 'Mentenanță 30 zile']
      }
    ]
  },
  {
    id: 'ui-ux',
    icon: PenTool,
    title: 'DESIGN GRAFIC',
    description: 'De la identitate vizuală și materiale print, până la bannere și elemente grafice digitale.',
    isTableBased: true,
    packages: [
      {
        name: 'IDENTITATE VIZUALĂ',
        desc: 'De la prima impresie la recunoaștere — construim fundația vizuală a brandului tău cu coerență și intenție.',
        tableHeaders: ['Serviciu', 'Descriere', 'Preț'],
        rowKeys: ['service', 'description', 'price'],
        rows: [
          { service: 'Logo', description: '2 variante concept, 3 revizii, fișiere finale AI / PDF / PNG / SVG', price: '150€' },
          { service: 'Identitate vizuală de bază', description: 'Logo + paletă culori + tipografie', price: '200€' }
        ],
        footer: 'Include predarea fișierelor editabile.',
        highlight: false,
        buttonText: 'CONTACT'
      },
      {
        name: 'PRINT',
        desc: 'Design pregătit pentru tipar, corect tehnic și adaptat suportului — de la carte de vizită până la stand expozițional.',
        tableHeaders: ['Serviciu', 'Descriere', 'Preț'],
        rowKeys: ['service', 'description', 'price'],
        rows: [
          { service: 'Carte de vizită', description: 'Față / verso, pregătit pentru tipar', price: '30€' },
          { service: 'Flyer / Afiș', description: 'Format la alegere, pregătit pentru tipar', price: '40€' },
          { service: 'Broșură', description: 'Până la 20 pagini, layout complet', price: '100€' },
          { service: 'Catalog de produse', description: 'Layout complet, pregătit pentru tipar', price: 'de la 150€' },
          { service: 'Revistă / Raport', description: 'Peste 20 pagini, layout complet', price: 'de la 150€' },
          { service: 'Packaging', description: 'Cutie / etichetă / pungă, pregătit pentru tipar', price: 'de la 50€' },
          { service: 'Cartoline / Elemente print custom', description: 'Format și specificații la cerere', price: 'de la 25€' },
          { service: 'Stickere', description: 'Format și specificații la cerere', price: 'de la 20€' },
          { service: 'Badge-uri', description: 'Nominale sau generice, indiferent de numărul de bucăți', price: 'de la 20€' },
          { service: 'Roll-up / Pop-up Spider', description: 'Format standard, pregătit pentru tipar', price: '50€' },
          { service: 'Stand expozițional', description: 'Format și specificații la cerere', price: 'de la 150€' },
          { service: 'Materiale textile', description: 'Prelucrare design pentru print pe orice tip de material textil', price: 'de la 30€' }
        ],
        footer: 'Verificare setări culoare, rezoluție și bleed incluse.',
        highlight: false,
        buttonText: 'CONTACT'
      },
      {
        name: 'DIGITAL',
        desc: 'Materiale vizuale coerente cu brandul tău și optimizate pentru orice platformă.',
        tableHeaders: ['Serviciu', 'Descriere', 'Preț'],
        rowKeys: ['service', 'description', 'price'],
        rows: [
          { service: 'Banner hero', description: 'Format web, optimizat pentru orice platformă', price: '40€' },
          { service: 'Bannere publicitare', description: 'Set formate Google Display / Social Ads', price: 'de la 50€' },
          { service: 'Postări social media', description: 'Per postare, format ales de client', price: '10€' },
          { service: 'Story social media', description: 'Set 4 șabloane Instagram / Facebook', price: '40€' },
          { service: 'Cover social media', description: 'Facebook / LinkedIn', price: '25€' },
          { service: 'Semnătură email', description: 'Design complet, gata de integrat', price: '20€' },
          { service: 'Infografic', description: 'Layout informațional, format la alegere', price: 'de la 50€' },
          { service: 'Newsletter template', description: 'Design complet, gata de integrat', price: '50€' },
          { service: 'Catalog digital produse', description: 'Catalog interactiv, optimizat pentru distribuție online', price: 'de la 80€' }
        ],
        footer: 'Exporturi web optimizate.',
        highlight: false,
        buttonText: 'CONTACT'
      }
    ]
  },
  {
    id: 'fotografie',
    icon: Camera,
    title: 'FOTOGRAFIE PRODUS',
    description: 'Imagini care vând. Fiecare cadru este gândit, iluminat și editat pentru a reprezenta produsul tău la cel mai înalt nivel.',
    isTableBased: true,
    packages: [
      {
        name: 'PACKSHOT',
        desc: 'Fotografii curate pe fundal alb, optimizate pentru e-commerce și marketplace.',
        priceFrom: '15€',
        priceLabel: ' / produs',
        rows: [
          { volume: '1-10 produse', price: '15€' },
          { volume: '11-30 produse', price: '12€' },
          { volume: '31-50 produse', price: '10€' },
          { volume: '50+ produse', price: '8€' }
        ],
        footer: '3 unghiuri per produs — față, lateral, spate. Editare inclusă.',
        highlight: false,
        buttonText: 'CONTACT'
      },
      {
        name: 'ATMOSPHERIC',
        desc: 'Fotografie editorială de produs — rezultat curat și profesional potrivit pentru campanii, social media și materiale de brand.',
        priceFrom: '50€',
        priceLabel: ' / produs',
        rows: [
          { volume: '1-10 produse', price: '50€' },
          { volume: '11-30 produse', price: '40€' },
          { volume: '31-50 produse', price: '35€' },
          { volume: '50+ produse', price: '30€' }
        ],
        footer: '3 imagini finale per produs. Editare și generare fundal AI incluse.',
        highlight: false,
        buttonText: 'CONTACT'
      },
      {
        name: '360° SPIN',
        desc: 'Experiență interactivă completă — spinner web sau video.',
        priceFrom: '20€',
        priceLabel: ' / produs',
        rows: [
          { volume: '1-10 produse', price: '20€' },
          { volume: '11-30 produse', price: '17€' },
          { volume: '31-50 produse', price: '15€' },
          { volume: '50+ produse', price: '12€' }
        ],
        footer: '60 cadre per produs. Configurare cont Sirv inclusă.',
        highlight: false,
        buttonText: 'CONTACT'
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
            Servicii
          </motion.p>

          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-tighter leading-[0.85] mb-8">
            UNDE IDEILE <br />
            DEVIN CIFRE<BlueDot />
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed">
            Servicii clare, prețuri fixe, livrare la termen. Fără surprize, fără costuri ascunse.
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
                className={`group cursor-pointer border rounded-[2rem] overflow-hidden transition-colors duration-500 relative ${isActive
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
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-500 ${isActive ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/10 group-hover:border-white/20'
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
                        <div className="w-full h-[1px] bg-white/0 mb-10" />

                        {/* Pricing Content */}
                        {service.isTableBased ? (
                          <div className="flex flex-col gap-6 md:gap-8 mb-10 text-white">
                            {service.packages.map((pkg, pIdx) => (
                              <div
                                key={pIdx}
                                className={`flex flex-col rounded-[1.5rem] p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${pkg.highlight
                                  ? 'bg-accent/[0.05] border-accent/30 shadow-[0_0_30px_rgba(63,183,188,0.1)]'
                                  : 'bg-transparent backdrop-blur-sm border-white/5'
                                  } border border-white/5`}
                              >
                                {pkg.highlight && (
                                  <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-accent/20 rounded-full blur-[40px] pointer-events-none" />
                                )}

                                <div className="mb-6 relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                  <div className="max-w-xl">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-text">
                                      {pkg.name}
                                    </h3>
                                    {pkg.desc && <p className="text-muted text-sm font-medium">{pkg.desc}</p>}
                                  </div>
                                  {pkg.priceFrom && (
                                    <div className="text-left md:text-right shrink-0">
                                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-1">De la</div>
                                      <div className="text-2xl font-black uppercase text-white tracking-tight">
                                        {pkg.priceFrom}<span className="text-sm font-medium text-muted normal-case tracking-normal">{pkg.priceLabel || ''}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="relative z-10 w-full overflow-x-auto mb-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                  <table className="w-full text-left border-collapse min-w-[300px]">
                                    <thead>
                                      <tr className="border-b border-white/10">
                                        {(pkg.tableHeaders || ['Volum', 'Preț']).map((header, hIdx) => (
                                          <th key={hIdx} className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted whitespace-nowrap">
                                            {header}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pkg.rows.map((row, rIdx) => {
                                        const keys = pkg.rowKeys || ['volume', 'price'];
                                        return (
                                          <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors last:border-0">
                                            {keys.map((key, kIdx) => (
                                              <td key={kIdx} className={`py-4 px-6 text-sm ${kIdx === keys.length - 1 ? 'font-bold text-white whitespace-nowrap' : 'font-medium text-text'}`}>
                                                {row[key]}
                                              </td>
                                            ))}
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="mt-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 p-4 md:px-6 md:py-4 rounded-xl border border-white/5">
                                  <div className="text-sm text-muted font-medium flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                      <Check className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="leading-relaxed">{pkg.footer}</span>
                                  </div>
                                  <Link to="/contact" className={`shrink-0 w-full md:w-auto hover:scale-[1.02] cursor-pointer px-8 py-3.5 text-center rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${pkg.highlight ? 'bg-accent text-background' : 'bg-white/5 text-text border border-white/10 hover:bg-white/10'}`}>
                                    {pkg.buttonText || 'CONTACT'}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-10">
                            {service.packages.map((pkg, pIdx) => (
                              <div
                                key={pIdx}
                                className={`flex flex-col rounded-[1.5rem] p-8 relative overflow-hidden transition-all duration-300 ${pkg.highlight
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
                                  <p className="text-muted text-sm font-medium h-10 border-b border-white/0 pb-4">
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
                                  <Link to="/contact" className={`block w-full hover:scale-[1.02] cursor-pointer py-4 text-center rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${pkg.highlight ? 'bg-accent text-background' : 'bg-white/5 text-text border border-white/10 hover:bg-white/10'
                                    }`}>
                                    CONTACT
                                  </Link>
                                </div>

                              </div>
                            ))}
                          </div>
                        )}

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
