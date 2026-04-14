import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function LogoBusiness() {
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
                     Design grafic
                  </span>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                     6 minute lectură
                  </span>
               </motion.div>
               <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.9] mb-8">
                  Logo-ul tău spune ceva despre afacerea ta. Dar ce anume?
               </motion.h1>
               <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
                  Indiferent de situație, logo-ul tău comunică ceva — în mod constant, fără să ai control asupra mesajului. Întrebarea e: ce comunică?
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
               <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=2071&q=80" alt="Logo Design Process" className="w-full h-full object-cover" />
            </motion.div>
         </section>

         {/* 3. EDITORIAL TEXT (Reading Zone) */}
         <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 text-left">
            <div className="w-full">
               <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
                  Ai un logo. Poate l-ai făcut tu într-un tool online. Poate l-ai comandat pe un site de freelancing la un preț mic. Poate l-a făcut un prieten care „se pricepe la design”. Sau poate ai investit serios într-unul profesionist.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Indiferent de situație, logo-ul tău comunică ceva — în mod constant, fără să ai control asupra mesajului, fiecărui potențial client care îl vede. Întrebarea nu e dacă comunică. Întrebarea e ce comunică.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  În acest articol explorăm cum funcționează un logo în mintea clientului, ce semnale transmite un logo slab versus unul bine gândit și de ce investiția în identitate vizuală nu e un lux, ci o decizie de business.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Prima impresie se formează în fracțiuni de secundă
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Cercetările în psihologia percepției vizuale arată că oamenii formează o parere despre un brand în mai puțin de 100 de milisecunde de la prima expunere vizuală. Nu există timp pentru analiză rațională. Creierul procesează forma, culoarea și complexitatea logo-ului aproape instantaneu și trage concluzii.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Aceste concluzii nu sunt întotdeauna corecte. Dar sunt extrem de persistente. Un logo care transmite nesiguranță sau neprofesionalism la prima vedere va fi greu de reabilitat prin alte mijloace — orice bun conținut, orice preț corect, orice serviciu excelent vor trebui să lupte împotriva acelei prime impresii negative.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Și invers: un logo care inspiră încredere și coerență deschide ușa înainte ca clientul să fi citit un singur cuvânt despre tine.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ce transmite un logo slab
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-6 leading-[1.8] font-normal">
                  Nu trebuie să fie un logo urât pentru a face rău. Uneori e suficient să fie generic, inconsistent sau nepotrivit pentru industrie. Iată cele mai frecvente semnale negative pe care le transmit logo-urile slabe:
               </p>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-8 space-y-4">
                  <li><strong>Lipsa de profesionalism</strong> — un logo făcut în grabă, cu fonturi implicite sau elemente clipart, comunică imediat că afacerea nu a investit în propria imagine.</li>
                  <li><strong>Inconsistență</strong> — un logo care arată diferit pe site, pe factură, pe ambalaj și pe social media transmite lipsă de atenție la detalii.</li>
                  <li><strong>Mesaj greșit pentru audiență</strong> — un logo prea jucăuș pentru un cabinet de avocatură sau prea rigid pentru un brand de tineret îndepărtează clienții potriviți.</li>
                  <li><strong>Lipsa de unicitate</strong> — un logo care seamănă cu al competiției nu ajută la diferențiere. Clientul nu își amintește ce te-a distins.</li>
               </ul>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ce transmite un logo bine gândit
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Un logo profesional nu e neapărat complicat. Unele dintre cele mai puternice logo-uri din lume sunt extrem de simple. Forța lor stă nu în complexitate, ci în intenție.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                     <h3 className="text-xl font-bold text-white mb-2">Încredere</h3>
                     <p className="text-white/70">Coerența vizuală și calitatea execuției semnalează că afacerea e serioasă și stabilă.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                     <h3 className="text-xl font-bold text-white mb-2">Identitate clară</h3>
                     <p className="text-white/70">Clientul înțelege rapid, fie direct fie intuitiv, ce face afacerea ta și pentru cine e.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                     <h3 className="text-xl font-bold text-white mb-2">Memorie vizuală</h3>
                     <p className="text-white/70">Un logo distinctiv rămâne în minte. Data viitoare când clientul are nevoie de tine, te recunoaște.</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                     <h3 className="text-xl font-bold text-white mb-2">Valoare percepută</h3>
                     <p className="text-white/70">Brandurile cu identitate vizuală puternică pot susține prețuri mai mari datorită percepției premium.</p>
                  </div>
               </div>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Logo vs. identitate vizuală: o distincție importantă
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Logo-ul e punctul de start, nu destinația. Un logo izolat, fără un sistem vizual coerent în jurul lui, e ca o carte de vizită fără adresă — există, dar nu comunică complet.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Identitatea vizuală înseamnă ansamblul: logo, paletă de culori, tipografie, mod de utilizare a imaginilor, ton vizual general. Toate acestea funcționează împreună pentru a crea o experiență coerentă de brand.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Când e momentul să investești într-un logo nou
               </h2>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-12 space-y-4">
                  <li><strong>Lansezi o afacere nouă</strong> — primul logo contează enorm. Nu începe cu ceva provizoriu.</li>
                  <li><strong>Afacerea a crescut sau s-a schimbat</strong> — dacă oferta sau publicul s-au schimbat, logo-ul vechi poate fi greșit.</li>
                  <li><strong>Nu funcționează la dimensiuni mici</strong> — dacă pe mobil nu se mai înțelege nimic, e o problemă practică.</li>
                  <li><strong>Te rușinează să împarți cartea de vizită</strong> — un semnal clar că imaginea nu mai corespunde realității.</li>
                  <li><strong>Arăți similar cu competiția</strong> — diferențierea e compromisă de la început.</li>
               </ul>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ce face un logo bun în practică
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Dincolo de estetică, un logo profesionist trebuie să îndeplinească câteva criterii funcționale:
               </p>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-8 space-y-4">
                  <li><strong>Să funcționeze la orice dimensiune</strong> — de la favicon de 16x16 pixeli până la banner de 3 metri.</li>
                  <li><strong>Să funcționeze pe fundal închis și deschis</strong> — ai nevoie de variante pentru ambele contexte.</li>
                  <li><strong>Să fie livrat în formate vectoriale</strong> — AI, EPS sau SVG — pentru a putea fi scalat fără pierdere de calitate.</li>
                  <li><strong>Să fie simplu suficient</strong> pentru a fi recunoscut la o privire rapidă.</li>
                  <li><strong>Să fie relevant</strong> pentru industria și publicul tău.</li>
               </ul>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Un logo care bifează toate aceste criterii nu e un exercițiu artistic. E un instrument de business.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Investiția corectă într-un logo: cât și de unde
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Prețurile pentru un logo variază enorm: de la câteva zeci de lei pe platforme de tipul Canva sau Fiverr, până la mii de euro pentru agenții specializate.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Adevărul e undeva la mijloc pentru majoritatea afacerilor mici și medii. Un logo profesionist realizat de un designer cu experiență nu trebuie să coste o avere, dar nici să fie cea mai ieftină opțiune disponibilă.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Ce contează mai mult decât prețul: <strong>procesul</strong>. Un designer bun îți va cere să completezi un brief, va vrea să înțeleagă afacerea ta, publicul, valorile și competiția înainte să deschidă calculatorul. Dacă primești logo-uri în aceeași zi în care ai trimis comanda, fără nicio conversație prealabilă — acela nu e un logo gândit pentru afacerea ta. E un logo generic cu numele tău pe el.
               </p>

               <p className="text-xl md:text-2xl text-accent font-medium leading-relaxed mt-12 mb-16 bg-accent/5 p-6 rounded-2xl border border-accent/20">
                  Un logo bun nu e cel care îți place ție. E cel care comunică corect către clientul tău.
               </p>

               {/* SEO Keywords: logo profesionist Romania, identitate vizuală brand, design logo afacere, cât costă un logo, importanța logo brand */}
            </div>
         </section>

         {/* 4. NEXT ARTICLE BUTTON */}
         <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
            <Link to="/blog/shopify-vs-woocommerce" className="group inline-flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto shadow-xl">
               <div className="text-left w-full md:w-auto">
                  <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">ARTICOLUL URMĂTOR</div>
                  <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors md:max-w-[320px] leading-snug">
                     Shopify vs. WooCommerce în 2025
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
