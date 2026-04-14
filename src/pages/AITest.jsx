import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Image as ImageIcon, CheckCircle, ArrowRight, Loader } from 'lucide-react';
import { removeBackground, generateScene } from '../lib/fal';

const PRESETS = [
  { id: 'shopify', name: 'Shopify Minimal', prompt: 'Clean minimalist studio white background, soft shadow, professional product photography, 8k resolution' },
  { id: 'lifestyle', name: 'Luxury Lifestyle', prompt: 'Placed on a high-end minimalist wooden table, elegant home interior in background, cream walls, natural morning sunlight, blurred background, depth of field' },
  { id: 'instagram', name: 'Dramatic Mood', prompt: 'Dark moody concrete background, dramatic warm spotlight hitting the product, deep shadows, cinematic editorial style' },
  { id: 'nature', name: 'Nature Clean', prompt: 'Placed on a mossy rock in a lush forest, morning dew, soft dappled sunlight through trees, natural macro photography' },
];

export default function AITest() {
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, removing_bg, generating, success, error
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [error, setError] = useState(null);

  const key = import.meta.env.VITE_FAL_KEY;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setFinalImage(null);
        setStatus('idle');
      };
      reader.readAsDataURL(file);
    }
  };

  const processFull = async () => {
    if (!key) {
      setError('VITE_FAL_KEY is missing in your .env file!');
      return;
    }
    
    try {
      setError(null);
      // Pas 1: Eliminare fundal
      setStatus('removing_bg');
      const bgResult = await removeBackground(image);
      console.log('BG Result Object:', bgResult);
      
      // Extragere URL cu multiple fallback-uri pentru siguranță
      const bgUrl = bgResult.data?.image?.url || bgResult.image?.url || bgResult.data?.images?.[0]?.url;
      
      if (!bgUrl) {
        console.error('Structură BG Result neașteptată:', bgResult);
        throw new Error('Nu am putut recupera imaginea fără fundal. Verifică consola pentru detalii.');
      }
      
      // Pas 2: Generare Scenă
      setStatus('generating');
      const sceneResult = await generateScene(bgUrl, selectedPreset.prompt);
      console.log('Scene Result Object:', sceneResult);
      
      const resUrl = sceneResult.data?.image?.url || sceneResult.image?.url || sceneResult.data?.images?.[0]?.url;
      
      if (!resUrl) {
        console.error('Structură Scene Result neașteptată:', sceneResult);
        throw new Error('Nu am putut genera scena finală. Verifică consola pentru detalii.');
      }
      
      setFinalImage(resUrl);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong during generation.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4 font-outfit uppercase tracking-normal">
            Product AI Studio <span className="text-xs align-top border border-purple-500 rounded px-1 ml-2 text-purple-200">BETA</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Transformă fotografiile brute în imagini profesionale de catalog pentru Shopify și Social Media.
          </p>
        </motion.div>

        {!key && (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl mb-8 text-red-300">
            <strong>Atenție:</strong> Verifică dacă ai adăugat <code className="bg-black/50 px-1">VITE_FAL_KEY</code> în fișierul <code className="bg-black/50 px-1">.env</code>.
          </div>
        )}

        {/* Grid de lucru */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sursă */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs">1</span>
              Original Product
            </h3>
            <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 border-dashed flex flex-col items-center justify-center overflow-hidden group relative">
              {image ? (
                <img src={image} className="w-full h-full object-contain" alt="Original" />
              ) : (
                <label className="cursor-pointer text-center p-8">
                  <Upload className="mx-auto mb-4 text-zinc-600 group-hover:text-purple-400 transition-colors" size={40} />
                  <span className="text-xs text-zinc-500">Apasă sau dă drag & drop</span>
                  <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
              )}
            </div>
          </div>

          {/* Configurare */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs">2</span>
              AI Configuration
            </h3>
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 space-y-6">
              <div>
                <label className="block text-xs text-zinc-500 mb-2 font-medium">STIL SCENĂ</label>
                <div className="grid grid-cols-1 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPreset(p)}
                      className={`text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                        selectedPreset.id === p.id 
                          ? 'bg-purple-600/10 border-purple-500 text-purple-200' 
                          : 'bg-zinc-800/50 border-transparent text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={!image || status !== 'idle'}
                  onClick={processFull}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                    !image || status !== 'idle' 
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.02] active:scale-95 shadow-xl shadow-purple-900/20'
                  }`}
                >
                  {status === 'removing_bg' || status === 'generating' ? (
                    <>
                      <Loader className="animate-spin" />
                      {status === 'removing_bg' ? 'Removing BG...' : 'Generating Scene...'}
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Professional Shot
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Rezultat */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs">3</span>
              Final Result
            </h3>
            <div className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center overflow-hidden">
              {finalImage ? (
                <img src={finalImage} className="w-full h-full object-cover" alt="Result" />
              ) : (
                <div className="text-zinc-600 flex flex-col items-center">
                  <ImageIcon size={40} className="mb-2 opacity-20" />
                  <span className="text-xs opacity-40 uppercase tracking-widest">Așteaptă generarea</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Erori */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-center"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
}
