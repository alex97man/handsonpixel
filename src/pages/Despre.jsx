import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Focus, TrendingUp, MessageSquare } from 'lucide-react';

const BlueDot = () => <span className="text-accent font-['Russo_One'] ml-1">.</span>;

// Animation helper for smooth bottom-up fades
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const brandValues = [
  {
    icon: Focus,
    title: "Livrăm complet sau nu livrăm",
    description: "Nu predăm proiecte pe jumătate și nu lăsăm detalii ''pentru mai târziu''. Fiecare livrabil iese din mâinile noastre gata de folosit."
  },
  {
    icon: TrendingUp,
    title: "Implicare reală, nu management de proiect.",
    description: "Oamenii care discută cu tine sunt aceiași care execută. Nu există un strat intermediar care să dilueze brieful sau să piardă detalii pe drum."
  },
  {
    icon: MessageSquare,
    title: "Comunicare clară de la început.",
    description: "Stabilim așteptări reale înainte să începem. Știi ce primești, când și cum arată procesul — fără surprize la final de proiect."
  }
];

const lessons = [
  {
    title: "Logica bate estetica",
    description: "Un magazin Shopify nu e gata când arată bine. E gata când un client poate să cumpere fără să se blocheze nicăieri.\n\nAm învățat că cele mai multe abandonuri de coș nu vin din preț — vin din pași în plus, opțiuni confuze sau un checkout care nu inspiră încredere. Detaliile de UX contează mai mult decât tema."
  },
  {
    title: "RGB nu este CMYK",
    description: "Un fișier care arată perfect pe ecran poate ieși dezastruos la tipar.\n\nAm învățat asta la începuturi. Acum verificăm de două ori CMYK-ul, bleed-ul și rezoluția înainte să trimitem orice la producție — și facem simulări pe mockup-uri realiste tocmai ca să nu existe surprize când materialul e deja tipărit."
  },
  {
    title: "Ochiul cumpără primul",
    description: "Cel mai scump echipament nu face o fotografie bună dacă nu știi ce vrea să vadă clientul final.\n\nAm învățat să fotografiem produsul din perspectiva celui care îl cumpără online — fără să-l țină în mână, fără să-l poată întoarce. Asta schimbă complet cum gândim unghiurile, lumina și detaliile pe care le scoatem în față."
  }
];

export default function Despre() {
  const timelineRef = useRef(null);

  // Timeline scroll progress
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(timelineProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Timeline scroll progress



  return (
    <div className="w-full relative">

      {/* 1. HERO SECTION */}
      <section className="pt-40 md:pt-56 pb-24 px-6 md:px-8 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <motion.p variants={fadeUpVariants} className="text-accent uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-8 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-accent/50 block" />
            DESPRE
          </motion.p>

          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-text uppercase tracking-normal leading-[0.85] mb-8">
            5 ani de pixeli <br />
            puși la locul lor<BlueDot />
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-muted max-w-2xl font-medium leading-relaxed mt-12">
            Mai puțină teorie de agenție. <br />
            Mai multă execuție hands-on.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. BRAND PHILOSOPHY / ETHOS */}
      <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto relative z-10 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {brandValues.map((val, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={fadeUpVariants}
              transition={{ delay: idx * 0.15 }}
              className="group relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 flex flex-col h-full hover:border-accent/40 transition-all duration-700 shadow-2xl"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] blur-3xl pointer-events-none" />

              {/* Icon with glow */}
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-accent/10 border border-accent/20 text-accent mb-10 shadow-[0_8px_32px_rgba(63,183,188,0.15)] group-hover:scale-110 transition-transform duration-500">
                <val.icon className="w-7 h-7" />
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-text uppercase tracking-tight leading-tight mb-6">
                {val.title}
              </h3>

              <p className="relative z-10 text-muted leading-relaxed font-medium">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE: CE AM INVATAT */}
      <section ref={timelineRef} className="py-32 px-6 md:px-8 max-w-5xl mx-auto relative overflow-hidden">

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
          className="mb-24 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-text">
            CE AM ÎNVĂȚAT.
          </h2>
          <p className="text-muted text-lg md:text-xl font-medium max-w-xl">
            Ce nu îți oferă un curs teoretic, ci doar 5 ani de execuție zilnică:
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Central Line (Axis) */}
          <div className="absolute left-[20px] md:left-[39px] top-0 bottom-0 w-[2px] bg-white/10 z-0">
            {/* Active Teal Progress line */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-accent shadow-[0_0_20px_rgba(63,183,188,0.5)] z-10"
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {lessons.map((lesson, idx) => (
              <div key={idx} className="relative flex items-start w-full">

                {/* Timeline node point */}
                <div className="shrink-0 w-[42px] md:w-[80px] flex items-center justify-center relative z-20 pt-8 md:pt-12">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-20%" }}
                    className="w-4 h-4 rounded-full bg-background border-2 border-white/20 z-20 relative"
                  >
                    {/* Teal inner point that lights up when parent section is in view */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, margin: "-20%" }}
                      className="absolute inset-0 bg-accent rounded-full shadow-[0_0_15px_#3fb7bc]"
                    />
                  </motion.div>
                </div>

                {/* Content Block (Caseta) */}
                <div className="w-full pr-0 md:pr-12">
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-500 overflow-hidden shadow-2xl"
                  >
                    <h4 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-tight text-text relative z-10">
                      {lesson.title}
                    </h4>
                    <p className="text-muted text-base md:text-lg leading-relaxed font-medium whitespace-pre-line relative z-10">
                      {lesson.description}
                    </p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER PUSH */}
      <div className="h-32"></div>

    </div>
  );
}
