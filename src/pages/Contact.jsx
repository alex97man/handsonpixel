import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Loader2, 
  ShoppingBag, 
  Camera, 
  Palette,
  Send
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const BlueDot = () => <span className="text-accent font-['Russo_One'] ml-1">.</span>;

// Shared Animation Variants
const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4 } }
};

// --- SUB-COMPONENTS ---

// eslint-disable-next-line no-unused-vars
const LiquidCard = ({ title, icon: Icon, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative flex flex-col items-center justify-center p-8 rounded-[2rem] border transition-all duration-500 h-full w-full text-center ${
      selected 
        ? 'bg-accent/10 border-accent shadow-[0_0_40px_rgba(63,183,188,0.15)] scale-[1.02]' 
        : 'bg-white/[0.03] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
    }`}
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
      selected ? 'bg-accent text-background scale-110' : 'bg-white/5 text-muted group-hover:text-white'
    }`}>
      <Icon className="w-8 h-8" />
    </div>
    <span className={`text-lg font-bold uppercase tracking-tight ${selected ? 'text-text' : 'text-muted group-hover:text-text'}`}>
      {title}
    </span>
    {selected && (
      <motion.div 
        layoutId="active-ring"
        className="absolute inset-0 border-2 border-accent rounded-[2rem] pointer-events-none"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
);

export default function Contact() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    website: '',
    socials: '',
    services: [],
    challenge: '',
    timeline: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          brand: formData.brand,
          website: formData.website,
          service: formData.services.join(', '),
          message: formData.challenge,
          timeline: formData.timeline
        }]);

      if (error) throw error;

      // Trigger Email Notification
      await supabase.functions.invoke('contact-notification', {
        body: formData
      });

      setStatus('success');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou.');
      setStatus('idle');
    }
  };

  // --- STEP RENDERING ---

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div key="step1" {...stepVariants} className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-text">
                Hai să facem cunoștință<BlueDot />
              </h2>
              <p className="text-muted text-lg font-medium">Lasă-ne datele de bază pentru a ști cu cine discutăm.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-1">Nume (Obligatoriu)</label>
                <input 
                  type="text" name="name" required placeholder="Ex: Alexandru Pop"
                  value={formData.name} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 text-lg focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent ml-1">E-mail (Obligatoriu)</label>
                <input 
                  type="email" name="email" required placeholder="contact@proiect.ro"
                  value={formData.email} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 text-lg focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted ml-1">Numele Brandului</label>
                <input 
                  type="text" name="brand" placeholder="Ex: Hands On Pixel"
                  value={formData.brand} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 text-lg focus:outline-none focus:border-white/30 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted ml-1">Website / Social Media</label>
                <input 
                  type="text" name="website" placeholder="Link proiect sau profil"
                  value={formData.website} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 text-lg focus:outline-none focus:border-white/30 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <button 
                onClick={nextStep}
                disabled={!formData.name || !formData.email}
                className="group flex items-center gap-4 px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-30 disabled:hover:bg-white"
              >
                Continuă <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="step2" {...stepVariants} className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-text">
                Cum te putem ajuta?
              </h2>
              <p className="text-muted text-lg font-medium">Poți selecta mai multe direcții.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LiquidCard 
                title="E-commerce / Shopify" icon={ShoppingBag} 
                selected={formData.services.includes('ecommerce')} 
                onClick={() => toggleService('ecommerce')} 
              />
              <LiquidCard 
                title="Fotografie Produs" icon={Camera} 
                selected={formData.services.includes('photo')} 
                onClick={() => toggleService('photo')} 
              />
              <LiquidCard 
                title="Design Digital & Print" icon={Palette} 
                selected={formData.services.includes('design')} 
                onClick={() => toggleService('design')} 
              />
            </div>

            <div className="flex justify-between pt-8">
              <button onClick={prevStep} className="flex items-center gap-2 text-muted hover:text-white uppercase font-bold tracking-widest transition-colors">
                <ArrowLeft className="w-4 h-4" /> Înapoi
              </button>
              <button 
                onClick={nextStep}
                disabled={formData.services.length === 0}
                className="group flex items-center gap-4 px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-30"
              >
                Următorul Pas <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="step3" {...stepVariants} className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-text">
                Care este obiectivul?
              </h2>
              <p className="text-muted text-lg font-medium">Descrie pe scurt provocarea ta actuală sau ce așteptări ai.</p>
            </div>

            <div className="relative group">
              <textarea 
                name="challenge" rows="6" required placeholder="Vrem să creștem conversia pe Shopify prin..."
                value={formData.challenge} onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-xl focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all resize-none leading-relaxed"
              ></textarea>
              <div className="absolute top-6 right-6 text-accent/20">
                <Send className="w-8 h-8" />
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button onClick={prevStep} className="flex items-center gap-2 text-muted hover:text-white uppercase font-bold tracking-widest transition-colors">
                <ArrowLeft className="w-4 h-4" /> Înapoi
              </button>
              <button 
                onClick={nextStep}
                disabled={!formData.challenge}
                className="group flex items-center gap-4 px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-30"
              >
                Mai e un singur pas <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div key="step4" {...stepVariants} className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-text">
                Când dorești să începem?
              </h2>
              <p className="text-muted text-lg font-medium">Stabilește prioritatea de preluare în pipeline-ul nostru.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'asap', label: 'Cât mai repede' },
                { id: 'month', label: 'În următoarea lună' },
                { id: 'research', label: 'Doar mă documentez' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFormData(p => ({ ...p, timeline: opt.id }))}
                  className={`p-10 rounded-3xl border transition-all duration-500 font-bold uppercase tracking-widest text-sm ${
                    formData.timeline === opt.id
                      ? 'bg-accent/10 border-accent text-text scale-[1.02] shadow-[0_0_40px_rgba(63,183,188,0.15)]'
                      : 'bg-white/[0.03] border-white/10 text-muted hover:border-white/30'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-8 items-center">
              <button onClick={prevStep} className="flex items-center gap-2 text-muted hover:text-white uppercase font-bold tracking-widest transition-colors">
                <ArrowLeft className="w-4 h-4" /> Înapoi
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!formData.timeline || status === 'submitting'}
                className="group flex items-center gap-4 px-12 py-6 bg-accent text-background rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_40px_rgba(63,183,188,0.3)] disabled:opacity-30 disabled:scale-100"
              >
                {status === 'submitting' ? (
                  <>Trimitere... <Loader2 className="w-6 h-6 animate-spin" /></>
                ) : (
                  <>Trimite Brieful <Send className="w-5 h-5 ml-2" /></>
                )}
              </button>
            </div>
          </motion.div>
        );
      
      default: return null;
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-40 md:pt-48 flex flex-col items-center px-6">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-xl w-full text-center space-y-10"
         >
            <div className="w-32 h-32 rounded-full bg-accent/10 border border-accent/20 mx-auto flex items-center justify-center relative">
               <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
               <CheckCircle2 className="w-16 h-16 text-accent" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-normal">Brief Trimis.</h1>
              <p className="text-xl text-muted font-medium leading-relaxed">
                Mulțumim, {formData.name.split(' ')[0]}. Am preluat datele tale și ne vom uita peste briefer-ul tău în cel mai scurt timp.
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest hover:bg-accent transition-colors"
            >
              ACASĂ
            </button>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col pt-40 md:pt-48 pb-32">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 w-full h-full flex flex-col items-center justify-center relative z-10">
        <div className="w-full">
           <AnimatePresence mode="wait">
              {renderStep()}
           </AnimatePresence>

           {/* PROGRESS INDICATOR - INTEGRATED */}
           <div className="mt-16 w-full max-w-5xl mx-auto space-y-4">
              <div className="flex justify-start">
                 <span className="text-xs font-black uppercase tracking-widest text-muted">
                   {step < 5 ? `Pasul ${step} din 4` : 'Finalizare'}
                 </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-accent shadow-[0_0_15px_#3fb7bc]"
                   initial={{ width: 0 }}
                   animate={{ width: `${(step / 4) * 100}%` }}
                   transition={{ duration: 0.8, ease: "circOut" }}
                 />
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
