import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status) => {
    localStorage.setItem('cookie-consent', status.toString());
    setIsVisible(false);
    
    // Reload if accepted to initialize analytics immediately
    if (status === true) {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:max-w-md"
        >
          <div className="glass-morphism border border-white/10 bg-black/80 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold tracking-tight text-white">
                  ANALITICE ȘI EXPERIENȚĂ
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  Folosim cookie-uri pentru a înțelege cum interacționezi cu site-ul nostru și pentru a-ți oferi o experiență brutalist-modernă completă.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleConsent(true)}
                  className="flex-1 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 active:scale-95"
                >
                  Acceptă
                </button>
                <button
                  onClick={() => handleConsent(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/50 transition-all hover:text-white"
                >
                  Refuză
                </button>
              </div>

              <div className="text-[10px] uppercase tracking-widest text-neutral-600">
                Hands On Pixel &copy; 2024
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
