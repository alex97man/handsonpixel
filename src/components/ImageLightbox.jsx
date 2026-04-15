import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ImageLightbox
 * @param {string[]} images  - array of image src strings
 * @param {string[]} alts    - array of alt strings (optional, same length as images)
 * @param {number}   index   - currently open index (null = closed)
 * @param {Function} onClose - called when lightbox should close
 * @param {Function} onPrev  - called to go to previous image
 * @param {Function} onNext  - called to go to next image
 */
export default function ImageLightbox({ images, alts = [], index, onClose, onPrev, onNext }) {
  const isOpen = index !== null && index !== undefined;
  const total = images?.length ?? 0;

  const handlePrev = useCallback(() => {
    if (total > 1) onPrev();
  }, [total, onPrev]);

  const handleNext = useCallback(() => {
    if (total > 1) onNext();
  }, [total, onNext]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          {/* Image container */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[90vw] max-h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              alt={alts[index] ?? `Image ${index + 1}`}
              className="max-w-[90vw] max-h-[88vh] w-auto h-auto object-contain rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
              draggable={false}
            />
          </motion.div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Închide"
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 bg-black/60 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Imaginea precedentă"
              className="absolute left-4 md:left-8 w-14 h-14 rounded-full border border-white/20 bg-black/60 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Imaginea următoare"
              className="absolute right-4 md:right-8 w-14 h-14 rounded-full border border-white/20 bg-black/60 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Counter */}
          {total > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); onNext(i); }}
                  aria-label={`Imaginea ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-6 h-2 bg-accent'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
