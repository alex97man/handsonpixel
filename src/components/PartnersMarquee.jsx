import React from 'react';
import { motion } from 'framer-motion';

import Logo01 from '../assets/logos/logo-01.png';
import Logo02 from '../assets/logos/logo-02.png';
import Logo03 from '../assets/logos/logo-03.png';
import Logo04 from '../assets/logos/logo-04.png';
import Logo05 from '../assets/logos/logo-05.png';
import Logo06 from '../assets/logos/logo-06.png';
import Logo07 from '../assets/logos/logo-07.png';
import Logo08 from '../assets/logos/logo-08.png';

const partners = [
  { id: 1, logo: Logo01, name: "Partner 1" },
  { id: 2, logo: Logo02, name: "Partner 2" },
  { id: 3, logo: Logo03, name: "Partner 3" },
  { id: 4, logo: Logo04, name: "Partner 4" },
  { id: 5, logo: Logo05, name: "Partner 5" },
  { id: 6, logo: Logo06, name: "Partner 6" },
  { id: 7, logo: Logo07, name: "Partner 7" },
  { id: 8, logo: Logo08, name: "Partner 8" },
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
              key={partner.id}
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
                  duration: 4 + (index % 3) * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  transition: { duration: 0.3 }
                }}
                className="h-32 md:h-40 flex items-center justify-center p-8 bg-background-secondary border border-white/5 rounded-3xl group-hover:border-accent/30 transition-colors duration-500 shadow-xl overflow-hidden"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain filter grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 opacity-40 group-hover:opacity-100"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
