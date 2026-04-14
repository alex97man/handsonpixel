import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Distorted Pixels / Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-12">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <h1 className="text-[10rem] md:text-[15rem] font-black leading-none tracking-normal text-white/5 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.span 
               animate={{ 
                 x: [0, -5, 5, -2, 2, 0],
                 opacity: [1, 0.8, 1, 0.9, 1]
               }}
               transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
               className="text-4xl md:text-6xl font-black uppercase tracking-widest text-accent"
             >
               PIXEL LOST
             </motion.span>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text">
            Ups! Această pagină s-a pierdut în rețea.
          </h2>
          <p className="text-muted text-lg font-medium max-w-md mx-auto leading-relaxed">
            Se pare că link-ul pe care l-ai urmat nu mai există sau a fost mutat într-un alt cluster de pixeli.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link 
            to="/" 
            className="group flex items-center gap-4 px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-colors"
          >
            <Home className="w-5 h-5" /> ACASĂ
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 text-text rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> ÎNAPOI
          </button>
        </motion.div>

      </div>

    </div>
  );
}
