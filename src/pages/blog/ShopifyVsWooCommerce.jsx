import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function ShopifyVsWooCommerce() {
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
                     E-commerce
                  </span>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                     6 minute lectură
                  </span>
               </motion.div>
               <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.9] mb-8">
                  Shopify vs. WooCommerce în 2026
               </motion.h1>
               <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
                  Ce alege un antreprenor român care vrea să vândă serios în 2026? Comparație completă între cele mai populare platforme.
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
               <img src="https://images.unsplash.com/photo-1658297063569-162817482fb6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="E-commerce Platforms Comparison" className="w-full h-full object-cover" />
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-right text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mt-4 px-4 w-full">
               Sursă foto: Unsplash.com
            </motion.p>
         </section>

         {/* 3. EDITORIAL TEXT (Reading Zone) */}
         <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 text-left">
            <div className="w-full">
               <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
                  E una dintre cele mai frecvente întrebări pe care le primesc antreprenorii la început de drum: Shopify sau WooCommerce? Ambele sunt platforme solide, ambele au milioane de utilizatori, ambele pot construi un magazin online funcțional. Dar nu sunt egale pentru orice tip de afacere.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  În 2026, diferențele dintre ele sunt mai clare ca niciodată. Dacă vrei să iei o decizie informată — nu bazată pe ce a ales vecinul sau ce ai citit într-un forum acum trei ani — acest articol e pentru tine.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ce este Shopify și ce este WooCommerce
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Shopify este o platformă SaaS (Software as a Service) — plătești un abonament lunar și primești tot: găzduire, securitate, actualizări, suport tehnic. Nu ai nevoie să instalezi nimic, nu te ocupi de servere, nu îți faci griji că site-ul pică în Black Friday.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  WooCommerce este un plugin open-source pentru WordPress. E gratuit ca software, dar pentru a funcționa ai nevoie de: găzduire web, domeniu, certificat SSL, și în mare parte, cunoștințe tehnice pentru configurare și întreținere. Sau bani să plătești pe cineva care le are.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Această distincție fundamentală — platformă gestionată vs. soluție auto-găzduită — este rădăcina majorității diferențelor practice dintre cele două.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Costul real: nu te lăsa păcălit de gratuit
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  WooCommerce este adesea prezentat ca opțiunea ieftină. Și da, plugin-ul în sine nu costă nimic. Dar costul total al proprietății e o altă poveste.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Cu WooCommerce plătești separat: găzduire (15-50 euro/lună pentru o găzduire decentă), teme premium (50-200 euro), plugin-uri esențiale (SEO, securitate, backup, recuperare coș abandonat — fiecare cu abonamentul lui), plus timp sau bani pentru mentenanță tehnică.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Cu Shopify plătești un abonament lunar (de la 29 USD/lună pentru planul Basic) care include găzduire, securitate, CDN global, suport 24/7 și actualizări automate. Temele premium există și aici (150-350 USD), dar nu sunt obligatorii.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal italic">
                  Concluzia practică: pentru un magazin mic-mediu, costul total anual e comparabil. Diferența e în predictibilitate: cu Shopify știi exact cât plătești în fiecare lună.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ușurința în utilizare: cine câștigă clar
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Shopify a fost construit de la zero cu un singur scop: să fie ușor de folosit de oricine, indiferent de background tehnic. Interfața e intuitivă, adăugarea de produse e simplă, procesarea comenzilor e clară. Poți lansa un magazin funcțional în câteva zile fără să scrii o linie de cod.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  WooCommerce presupune o curbă de învățare semnificativ mai abruptă. Chiar dacă WordPress este familiar, configurarea corectă a unui magazin — teme, plugin-uri, setări de securitate, optimizare pentru viteză — necesită timp și cunoștințe tehnice. Greșelile de configurare pot duce la vulnerabilități de securitate sau la un site lent.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Dacă nu ești tehnic și nu vrei să devii, Shopify e alegerea corectă.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Flexibilitate și personalizare: unde WooCommerce are avantaj
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Dacă vrei control total asupra codului, structurii bazei de date și fiecărui aspect al site-ului, WooCommerce oferă libertate maximă. Ești pe WordPress, ai acces la tot, poți modifica orice.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Shopify are și el un ecosistem bogat de aplicații și teme, dar ești totuși într-un mediu mai controlat. Unele customizări avansate necesită Shopify Plus (planul enterprise) sau dezvoltare cu Liquid, limbajul de template al platformei.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  În practică însă, pentru 90% dintre magazinele online românești, flexibilitatea WooCommerce nu e necesară. Nevoile reale — filtre de produse, metode de plată românești, integrare cu curieri locali, automatizări de email — pot fi acoperite excelent de Shopify.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Plăți și integrări pentru piața românească
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Acesta e un punct important și adesea ignorat în comparațiile internaționale.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Shopify Payments nu este disponibil în România. Asta înseamnă că vei folosi un procesator de plăți terț: Stripe, PayU, Mobilpay, EuPlatesc sau alții. Toate se integrează bine cu Shopify, dar fiecare are comisionul lui.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  WooCommerce are o comunitate locală activă și plugin-uri specifice pentru piața românească, inclusiv integrări directe cu procesatori de plăți locali și curieri (Fan Courier, Sameday, DPD, Cargus). Unele dintre aceste integrări sunt mai mature pe WooCommerce decât pe Shopify.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Vestea bună: ecosistemul de aplicații Shopify pentru România s-a îmbunătățit semnificativ în ultimii ani. Integrările cu principalii curieri români funcționează bine, iar procesatorii de plăți locali au dezvoltat sau îmbunătățit aplicațiile oficiale.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Viteză, securitate și disponibilitate
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Shopify rulează pe infrastructură proprie, cu CDN global, uptime garantat de 99.99% și echipe dedicate de securitate. Nu trebuie să te gândești la actualizări de securitate, backup-uri sau optimizare de server. Totul e gestionat automat.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Cu WooCommerce, responsabilitatea e a ta (sau a agenției cu care lucrezi). Un hosting ieftin, plugin-uri neactualizate sau o temă prost codificată pot duce la un site lent, vulnerabil sau care pică exact când ai nevoie de el.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  În perioade de trafic ridicat — campanii, sărbători, Black Friday — Shopify scalează automat. WooCommerce are nevoie de un plan de găzduire adecvat și, de multe ori, de optimizări suplimentare.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  SEO: sunt egale?
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Ambele platforme oferă capabilități SEO solide. WordPress are un ecosistem SEO extrem de matur (Yoast, Rank Math), iar WooCommerce moștenește toate acestea.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Shopify a investit mult în SEO în ultimii ani: URL-uri curate, sitemap automat, date structurate, viteză de încărcare excelentă out-of-the-box. Aplicații precum SEO Manager sau Plug in SEO completează ceea ce lipsește nativ.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Diferența practică e minimă pentru majoritatea magazinelor. Viteza de încărcare — un factor SEO important — e de obicei mai bună pe Shopify datorită infrastructurii gestionate.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Concluzia practică: pentru cine e fiecare
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-4 leading-[1.8] font-normal">
                  Shopify e alegerea corectă dacă:
               </p>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-8 space-y-2">
                  <li>Vrei să te concentrezi pe vânzări, nu pe tehnic</li>
                  <li>Lansezi primul tău magazin online</li>
                  <li>Ai nevoie de o soluție stabilă, scalabilă, cu suport inclus</li>
                  <li>Bugetul tău e predictibil și vrei costuri fixe lunare</li>
                  <li>Vrei să lansezi rapid, în câteva zile, nu săptămâni</li>
               </ul>
               <p className="text-base md:text-lg text-white/70 mb-4 leading-[1.8] font-normal">
                  WooCommerce e alegerea corectă dacă:
               </p>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-8 space-y-2">
                  <li>Ai deja un site WordPress și vrei să adaugi funcționalitate de magazin</li>
                  <li>Ai nevoi tehnice foarte specifice care nu pot fi acoperite de Shopify</li>
                  <li>Ai resurse tehnice interne sau un developer dedicat</li>
                  <li>Vrei control total asupra codului și datelor</li>
               </ul>

               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Pentru antreprenorul român la început de drum — sau pentru un business în creștere care vrea să se concentreze pe produs și client, nu pe infrastructura tehnică — Shopify rămâne, în 2026, alegerea mai practică și mai scalabilă.
               </p>

               <p className="text-xl md:text-2xl text-accent font-medium leading-relaxed mt-12 mb-16 bg-accent/5 p-6 rounded-2xl border border-accent/20">
                  Cea mai bună platformă nu e cea cu mai multe funcții. E cea pe care o folosești cel mai eficient.
               </p>

               {/* SEO Keywords: Shopify vs WooCommerce 2026, platforma ecommerce Romania, magazin online Shopify Romania, WooCommerce Romania, ce platforma aleg pentru magazin online */}
            </div>
         </section>

         {/* 4. NEXT ARTICLE BUTTON */}
         <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
            <Link to="/blog/fotografie-produs" className="group inline-flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto shadow-xl">
               <div className="text-left w-full md:w-auto">
                  <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">ARTICOLUL URMĂTOR</div>
                  <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors md:max-w-[320px] leading-snug">
                     De ce fotografiile proaste îți omoară vânzările online
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
