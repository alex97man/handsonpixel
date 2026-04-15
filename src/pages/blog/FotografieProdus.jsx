import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function FotografieProdus() {
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
                     Fotografie Produs
                  </span>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                     6 minute lectură
                  </span>
               </motion.div>
               <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.9] mb-8">
                  De ce fotografiile proaste îți omoară vânzările online
               </motion.h1>
               <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-3xl">
                  Și cum le înlocuiești fără buget mare.
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
               <img src="https://images.unsplash.com/photo-1548944588-bd022d6b3a9b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fotografie Produs E-commerce" className="w-full h-full object-cover" />
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-right text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mt-4 px-4 w-full">
               Sursă foto: Unsplash.com
            </motion.p>
         </section>

         {/* 3. EDITORIAL TEXT (Reading Zone) */}
         <section className="px-6 md:px-8 max-w-5xl mx-auto mb-32 text-left">
            <div className="w-full">
               <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
                  Ai un produs bun. Ai un site funcțional. Ai configurat plata și livrarea. Dar vânzările nu vin. Sau vin prea rar. Ai verificat prețurile, ai ajustat descrierile, ai testat butoane. Ai ignorat însă un singur lucru: fotografia.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Nu e o greșeală rară. E poate cea mai frecventă greșeală pe care o fac magazinele online la început de drum — și una dintre cele mai costisitoare, tocmai pentru că efectul ei e invizibil. Nu primești un mesaj de eroare. Clientul pur și simplu nu cumpără.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  În acest articol vorbim direct: de ce imaginile de slabă calitate distrug conversiile, ce înseamnă concret o fotografie bună pentru e-commerce și cum poți ridica nivelul fără să investești o avere.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Creierul cumpără înainte ca mintea să decidă
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Când un vizitator ajunge pe pagina unui produs, primele 50 de milisecunde sunt decisive. Nu citește descrierea. Nu verifică prețul. Vede imaginea.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Dacă imaginea e slabă — fundal murdar, lumină neuniformă, produs fotografiat în grabă pe o masă de bucătărie — creierul înregistrează imediat: <em>produsul ăsta nu merită atenția mea</em>. Și continuă să deruleze.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Nu e superficialitate din partea clientului. E un mecanism de filtru pe care cu toții îl folosim atunci când cumpărăm online. Avem sute de opțiuni la un click distanță. Semnalele vizuale sunt primul filtru. Iar în absența posibilității de a atinge, mirosi sau testa produsul fizic, fotografia devine singurul canal de comunicare senzorială între produs și client. Toată greutatea acelei decizii cade pe umerii imaginii.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ce înseamnă, concret, o fotografie proastă pentru e-commerce
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-6 leading-[1.8] font-normal">
                  Nu vorbim neapărat de imagini evident nerealizate. Vorbim și de imagini care par ok dar care, în context comercial, sabotează vânzările. Iată cele mai frecvente probleme:
               </p>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-8 space-y-4">
                  <li><strong>Fundal neuniform sau colorat greșit</strong> — distrage atenția de la produs și face pagina să pară neprofesionistă.</li>
                  <li><strong>Lumină dură sau necontrolată</strong> — creează umbre inestetice, denaturează culorile și ascunde detalii importante.</li>
                  <li><strong>Un singur unghi</strong> — clientul nu poate întoarce produsul în minte. Fără față, lateral și spate, decizia de cumpărare e blocată de incertitudine.</li>
                  <li><strong>Rezoluție mică sau imagine pixelată</strong> — semnalează lipsa de profesionalism, indiferent de calitatea reală a produsului.</li>
                  <li><strong>Inconsistență vizuală între produse</strong> — când fiecare produs din catalog arată diferit ca stil foto, magazinul pierde coerența și implicit credibilitatea.</li>
               </ul>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Impactul direct asupra conversiilor
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Studiile din e-commerce arată în mod constant că imaginile de produs sunt principalul factor în decizia de cumpărare online, depășind descrierea, recenziile și chiar prețul în anumite categorii.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Rata de returnare a produselor — una dintre cele mai mari dureri de cap pentru orice magazin online — este direct legată de calitatea imaginilor. Când fotografia nu reprezintă fidel produsul, clientul primește acasă ceva diferit față de așteptări. Rezultat: retur, cost suplimentar, recenzie negativă.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Pe de altă parte, imaginile clare și corecte reduc retururile, cresc încrederea și contribuie la recenzii pozitive — un efect în lanț pe care nicio campanie de publicitate nu îl poate cumpăra direct.
               </p>

               <blockquote className="my-16 pl-6 md:pl-8 py-2 border-l-4 border-accent text-white/90 text-xl md:text-2xl leading-tight font-bold tracking-tight italic">
                  Fotografia devine singurul canal de comunicare senzorială între produs și client. Toată greutatea deciziei cade pe umerii imaginii.
               </blockquote>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Ce face o fotografie de produs să funcționeze
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-6 leading-[1.8] font-normal">
                  Nu e nevoie de echipament de zeci de mii de euro. E nevoie de înțelegerea câtorva principii de bază:
               </p>

               <div className="space-y-8 mb-12">
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">1. Lumină controlată</h3>
                     <p className="text-white/70 leading-[1.8]">Lumina naturală difuză (lângă o fereastră mare, în zi înnorată) poate produce rezultate excelente pentru produse simple. Pentru consistență și control complet, un kit de studio de bază — două surse de lumină continuă și un fundal alb — costă între 200 și 500 de euro și se amortizează rapid.</p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">2. Fundal curat</h3>
                     <p className="text-white/70 leading-[1.8]">Fundalul alb rămâne standardul pentru e-commerce și marketplace. Este neutru, pune produsul în centrul atenției și este compatibil cu orice platformă. O hârtie fotografică de fundal sau o tablă albă mată fac treaba fără investiție majoră.</p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">3. Unghiuri multiple</h3>
                     <p className="text-white/70 leading-[1.8]">Minimum trei unghiuri: față, lateral, spate. Pentru produse cu detalii importante — textură, mecanism, etichetă — adaugă și un detaliu de aproape. Cu cât clientul vede mai mult, cu atât are mai puține motive să nu cumpere.</p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">4. Consistență</h3>
                     <p className="text-white/70 leading-[1.8]">Toate produsele din catalog trebuie fotografiate în același stil: aceeași lumină, același fundal, același unghi principal. Inconsistența vizuală fragmentează experiența și face magazinul să pară improvizat.</p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white mb-2">5. Editare corectă</h3>
                     <p className="text-white/70 leading-[1.8]">Editarea nu înseamnă filtru. Înseamnă corecție de expunere, echilibrare de alb, tăierea corectă a imaginii și, dacă e cazul, eliminarea fundalului. Instrumente precum Adobe Lightroom sau chiar aplicații gratuite ca GIMP pot face diferența.</p>
                  </div>
               </div>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Când are sens să externalizezi fotografia de produs
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Dacă ai 5-10 produse și timp, poți învăța să fotografiezi decent singur. Dacă ai un catalog cu zeci sau sute de produse, dacă produsele sunt complexe (suprafețe reflectante, alb pe alb, ambalaje complexe) sau dacă vrei o prezență vizuală cu adevărat profesionistă, externalizarea devine rapid mai eficientă decât orice investiție internă.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Un studio profesionist îți livrează imagini corecte tehnic, editate și pregătite pentru upload direct în magazin. Nu mai pierzi timp cu sesiuni foto improvizate, nu mai lupți cu luminile și nu mai reiei fotografiile pentru că nu arată bine pe mobil.
               </p>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal">
                  Mai mult, astăzi există posibilitatea fotografiei editoriale cu fundaluri create în post-procesare — o abordare care combină fotografia reală a produsului cu contexte vizuale construite digital. Rezultatul: imagini cu atmosferă de campanie, la un cost semnificativ mai mic decât o sesiune foto cu set construit fizic.
               </p>

               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-16 mb-6">
                  Primul pas concret pe care îl poți face azi
               </h2>
               <p className="text-base md:text-lg text-white/70 mb-6 leading-[1.8] font-normal">
                  Deschide magazinul tău online și uită-te la primele 5 produse din catalog cu ochii unui client care nu te cunoaște. Întreabă-te:
               </p>
               <ul className="list-disc pl-6 text-base md:text-lg text-white/70 mb-8 space-y-4">
                  <li>Imaginea mi-ar da încredere să cumpăr?</li>
                  <li>Văd suficiente unghiuri ca să înțeleg produsul?</li>
                  <li>Culorile arată fidel față de realitate?</li>
                  <li>Imaginea arată bine și pe mobil, nu doar pe desktop?</li>
               </ul>
               <p className="text-base md:text-lg text-white/70 mb-8 leading-[1.8] font-normal font-bold">
                  Dacă răspunsul la oricare dintre aceste întrebări e nu sau nu știu — ai găsit problema. Și acum știi și de unde să începi.
               </p>

               <p className="text-xl md:text-2xl text-accent font-medium leading-relaxed mt-12 bg-accent/5 p-6 rounded-2xl border border-accent/20">
                  Fotografia nu e un cost opțional în e-commerce. E infrastructura vizuală pe care stau vânzările tale.
               </p>

               <div className="mt-16 text-sm text-white/30 hidden">
                  SEO keywords: fotografie produs ecommerce, imagini produse magazin online, packshot profesional, fotografie produs Romania, cum fotografiezi produsele pentru online
               </div>
            </div>
         </section>

         {/* 4. NEXT ARTICLE BUTTON */}
         <section className="px-6 md:px-8 max-w-5xl mx-auto flex justify-end">
            <Link to="/blog/logo-business" className="group inline-flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-accent/50 w-full md:w-auto shadow-xl">
               <div className="text-left w-full md:w-auto">
                  <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">ARTICOLUL URMĂTOR</div>
                  <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors md:max-w-[320px] leading-snug">
                     Logo-ul tău spune ceva despre afacerea ta. Dar ce anume?
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
