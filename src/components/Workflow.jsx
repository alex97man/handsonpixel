import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Briefing & Research",
    desc: "Analizăm nișa, competiția și punctele de presiune ale brandului tău. Nu începem să lucrăm până nu înțelegem exact unde vrei să ajungi.",
    icon: Search
  },
  {
    id: 2,
    title: "Arhitectură & Design",
    desc: "Construim interfața din pixeli puri, fără scurtături. Creăm un design brutalist-modern axat 100% pe experiența utilizatorului și conversie.",
    icon: PenTool
  },
  {
    id: 3,
    title: "Dezvoltare Tehnică",
    desc: "Transformăm designul în cod curat, rapid și scalabil. Folosim React, Vite și Shopify pentru a livra performanță de tip 'zero-lag'.",
    icon: Code2
  },
  {
    id: 4,
    title: "Lansare & Mentenanță",
    desc: "Punem proiectul online și monitorizăm rezultatele. Rămânem alături de tine pentru a rafina detaliile și a scala succesul pe termen lung.",
    icon: Rocket
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

export default function Workflow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-8 max-w-5xl mx-auto relative overflow-hidden">
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-32 text-center md:text-left"
      >
        <motion.p variants={fadeUpVariants} className="text-accent uppercase font-bold tracking-[0.3em] text-xs md:text-sm mb-6 flex items-center md:justify-start justify-center gap-4">
          <span className="w-12 h-[1px] bg-accent/50 block" />
          CUM LUCRĂM
        </motion.p>
        <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Procesul <span className="text-white/20">Hands On</span>.
        </motion.h2>
      </motion.div>

      <div className="relative">
        {/* The Animated Line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0">
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-accent shadow-[0_0_20px_#3fb7bc] z-10"
          />
        </div>

        <div className="space-y-40 relative z-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div key={step.id} className={`flex flex-col md:flex-row items-center justify-between gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-[45%] text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-accent mb-6 md:hidden`}>
                     <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted text-lg font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Center Node (Always visible on mobile/desktop as the anchor) */}
                <div className="relative z-30">
                  <motion.div 
                     initial={{ scale: 0.5, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     viewport={{ once: false, margin: "-20%" }}
                     className="w-12 h-12 rounded-full bg-background border-2 border-white/20 flex items-center justify-center"
                   >
                    <motion.div 
                      className="absolute inset-0 bg-accent rounded-full opacity-0"
                      whileInView={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Icon className="w-5 h-5 text-accent" />
                  </motion.div>
                </div>

                {/* Empty Filler for Grid Balance */}
                <div className="hidden md:block md:w-[45%]" />

              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
