import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ExternalLink } from 'lucide-react';
import IPhoneMockup from './IPhoneMockup';

interface ProjectData {
  title: string;
  description: string;
  longDescription: string;
  screenshots: string[];
  githubUrl: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Lock/unlock Lenis smooth scroll
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
      {isOpen && project && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[9999] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-[1000px] mx-auto my-8 md:my-16 rounded-[32px] border border-white/10 bg-[#111111]/95 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-[32px] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-6 float-right mr-6 mt-6 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero area with phone mockup */}
            <div className="relative flex items-center justify-center pt-12 pb-8 px-8 overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative flex items-end gap-[-20px] justify-center">
                {/* Back phone (if 2 screenshots) */}
                {project.screenshots.length > 1 && (
                  <div className="hidden md:block -mr-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <IPhoneMockup
                      screenImage={project.screenshots[1]}
                      size="md"
                      rotate={-8}
                    />
                  </div>
                )}

                {/* Main phone */}
                <div className="relative z-10">
                  <IPhoneMockup
                    screenImage={project.screenshots[0]}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="px-8 md:px-16 pb-12">
              {/* Title */}
              <h2 className="text-3xl md:text-5xl text-white tracking-tight mb-2">
                {project.title}
              </h2>

              {/* Divider */}
              <div className="w-16 h-px bg-gradient-to-r from-white/30 to-transparent my-6" />

              {/* Long description - blog style */}
              <div className="text-muted text-sm md:text-base leading-relaxed space-y-4 mb-10 max-w-2xl">
                {project.longDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#0a0a0a] text-sm font-medium transition-all duration-300 hover:scale-105 shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
                >
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 text-white/60 text-sm font-medium transition-all duration-300 hover:text-white hover:border-white/30 hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
