import React from 'react';
import { motion } from 'framer-motion';



const partners = [
  "Shopify Plus", "Framer", "React", "Next.js", "Adobe CC", "Meta", "Google Ads", "Tailwind"
];

export default function PartnersGrid() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        <div className="mb-14 md:mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-black text-text uppercase tracking-tight leading-[0.85]">
            Colaborări
          </h2>
          <p className="mt-6 text-muted text-lg max-w-xl font-medium leading-relaxed">
            Branduri și oameni alături de care am construit.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <motion.div
                // Floating animation
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  transition: { duration: 0.3 }
                }}
                className="h-32 md:h-40 flex items-center justify-center p-6 bg-background-secondary border border-white/5 rounded-3xl group-hover:border-accent/30 transition-colors duration-500 shadow-xl"
              >
                {/* Logo Text / Placeholder */}
                <span className="text-lg md:text-xl font-bold uppercase text-white/20 group-hover:text-text transition-colors duration-500 tracking-tighter">
                  {partner}
                </span>

              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
