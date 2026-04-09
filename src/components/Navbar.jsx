import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/hop_logo-light.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      // Threshold high enough to clear most of hero content, about 120px
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we are on mobile to apply logic
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const showCompact = isMobile && isScrolled && !isOpen;

  return (
    <div className="fixed w-full z-50 top-4 px-4 md:px-8 pointer-events-none flex justify-center">
      <motion.nav 
        layout
        initial={false}
        animate={{
          width: showCompact ? '56px' : '100%',
        }}
        style={{
          marginLeft: showCompact ? 'auto' : '0',
          marginRight: showCompact ? '0' : '0',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl w-full rounded-3xl bg-white/[0.05] backdrop-blur-[24px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto overflow-hidden relative"
      >
        <div className="px-5 h-16 flex items-center justify-between md:justify-start">
          {/* Logo Section */}
          <AnimatePresence>
            {!showCompact && (
              <motion.div 
                key="logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <img src={logo} alt="Hands On Pixel" className="h-7 md:h-9 w-auto hover:brightness-110 transition-all" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Nav - Pushed to right on md+ */}
          <div className="hidden md:flex ml-auto items-center space-x-8">
            <div className="flex items-baseline space-x-6 text-sm font-medium tracking-wide">
              <Link to="/portofoliu" className="text-text hover:text-accent transition-colors">Portofoliu</Link>
              <Link to="/servicii" className="text-text hover:text-accent transition-colors">Servicii</Link>
              <Link to="/despre" className="text-text hover:text-accent transition-colors">Despre</Link>
              <Link to="/blog" className="text-text hover:text-accent transition-colors">Blog</Link>
            </div>
            <Link to="/contact" className="hover:bg-accent hover:text-background text-text border border-white/20 hover:border-accent px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300">Contact</Link>
          </div>

          {/* Toggle Button - Mobile Only */}
          <div className={`flex md:hidden items-center ${showCompact ? 'w-full justify-center' : 'ml-auto'}`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-muted hover:text-text hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(10, 10, 14, 0.85)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
              }}
            >
              <div className="px-6 pt-2 pb-8 flex flex-col gap-1">
                {[
                  { to: '/portofoliu', label: 'Portofoliu' },
                  { to: '/servicii', label: 'Servicii' },
                  { to: '/despre', label: 'Despre' },
                  { to: '/blog', label: 'Blog' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-white/90 hover:text-accent block text-lg font-bold py-3.5 border-b border-white/[0.04] last:border-0 transition-all duration-200"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

