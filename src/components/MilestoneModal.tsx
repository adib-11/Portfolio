import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Lenis from 'lenis';

export interface MilestoneData {
  title: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
}

interface MilestoneModalProps {
  milestone: MilestoneData | null;
  isOpen: boolean;
  onClose: () => void;
}

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

export default function MilestoneModal({ milestone, isOpen, onClose }: MilestoneModalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock/unlock global Lenis smooth scroll
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Scoped Lenis for the modal itself
  useEffect(() => {
    if (!isOpen || !wrapperRef.current || !contentRef.current) return;

    const modalLenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      modalLenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      modalLenis.destroy();
    };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && milestone && (
        <motion.div
          key="milestone-backdrop"
          className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {isOpen && milestone && (
        <motion.div
          key="milestone-wrapper"
          ref={wrapperRef}
          className="fixed inset-0 z-[9999] overflow-y-auto"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >

          {/* Modal Content */}
          <motion.div
            ref={contentRef}
            className="relative w-full max-w-[1000px] mx-auto my-8 md:my-16 rounded-[32px] border border-white/10 bg-[#111111]/95 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            variants={{
              hidden: { opacity: 0, scale: 0.92, y: 40 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  staggerChildren: 0.1,
                  delayChildren: 0.15
                }
              },
              exit: {
                opacity: 0,
                scale: 0.96,
                y: 20,
                transition: { duration: 0.3 }
              }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button (floats over image) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <motion.div variants={contentVariants} className="w-full aspect-video bg-surface relative overflow-hidden">
               <img 
                 src={milestone.image} 
                 alt={milestone.title}
                 className="w-full h-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 to-transparent pointer-events-none" />
            </motion.div>

            {/* Text content */}
            <div className="px-8 md:px-16 pt-8 pb-12 relative z-10 -mt-12">
              {/* Meta data */}
              <motion.div variants={contentVariants} className="flex items-center gap-4 text-xs sm:text-sm text-accent mb-4">
                  <span>{milestone.readTime}</span>
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span>{milestone.date}</span>
              </motion.div>

              {/* Title */}
              <motion.h2 variants={contentVariants} className="text-3xl md:text-4xl text-white tracking-tight mb-6">
                {milestone.title}
              </motion.h2>

              {/* Divider */}
              <motion.div variants={contentVariants} className="w-16 h-px bg-gradient-to-r from-white/30 to-transparent my-6" />

              {/* Long description - blog style */}
              <motion.div variants={contentVariants} className="text-muted text-sm md:text-base leading-relaxed space-y-4 max-w-2xl">
                {milestone.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
