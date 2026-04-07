import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/hop_logo-light.png';

const BlueDot = () => <span className="text-accent font-['Russo_One'] ml-1">.</span>;

export default function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <footer id="contact" className={`${!isContactPage ? 'py-24' : 'py-12'} relative overflow-hidden border-t border-white/5`}>

      {!isContactPage && (
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">

          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-text mb-8 uppercase leading-[0.85]">
            AI UN <br className="md:hidden" /> PROIECT?<br />
            <span className="text-accent">LET'S GET HANDS ON<BlueDot /></span>
          </h2>

          <p className="mb-12 text-muted text-lg md:text-xl max-w-2xl font-medium leading-relaxed mx-auto">
            Fie că ai totul pus la punct sau abia ai început să te gândești, scrie-ne. Ne place să intrăm în proiect de la stadiul de idee.
          </p>

          {/* Action Button */}
          <div className="mb-16">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center p-1"
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 bg-accent/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-[2.5rem]" />

              <div className="relative px-16 py-8 bg-accent text-background rounded-3xl hover:scale-105 transition-all duration-500 flex flex-col items-center">
                <div className="flex items-center">
                  <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap">CONTACT</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Direct Email */}
          <div className="flex flex-col items-center gap-6 group">
            <a href="mailto:salut@handsonpixel.ro" className="flex flex-col items-center gap-4 text-muted hover:text-accent transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-lg md:text-xl font-medium border-b border-transparent group-hover:border-accent/30 pb-1">
                salut@handsonpixel.ro
              </span>
            </a>
          </div>

        </div>
      )}

      <div className={`max-w-5xl mx-auto px-6 lg:px-8 ${!isContactPage ? 'mt-24 pt-8 border-t border-white/5' : ''} flex flex-col md:flex-row justify-between items-center text-sm font-medium text-muted gap-6`}>
        <p>© {new Date().getFullYear()} Hands On Pixel. Toate drepturile rezervate.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent transition-colors uppercase tracking-widest text-xs font-bold font-sans">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors uppercase tracking-widest text-xs font-bold font-sans">LinkedIn</a>
          <a href="#" className="hover:text-accent transition-colors uppercase tracking-widest text-xs font-bold font-sans">Behance</a>
        </div>
      </div>
    </footer>
  );
}
