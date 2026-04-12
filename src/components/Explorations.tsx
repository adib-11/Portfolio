import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { getAssetPath } from '../utils/assetPath';

gsap.registerPlugin(ScrollTrigger);

const explorations = [
  { image: getAssetPath("/explorations/expl_1.webp"), rotation: -5, yOffset: 0 },
  { image: getAssetPath("/explorations/expl_2.webp"), rotation: 3, yOffset: 200 },
  { image: getAssetPath("/explorations/expl_3.webp"), rotation: 2, yOffset: 100 },
  { image: getAssetPath("/explorations/expl_4.webp"), rotation: -4, yOffset: 300 },
  { image: getAssetPath("/explorations/expl_5.webp"), rotation: -2, yOffset: 200 },
  { image: getAssetPath("/explorations/expl_6.webp"), rotation: 5, yOffset: 400 },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax for left column (moves up faster)
      gsap.to(leftColRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Parallax for right column (moves up slower)
      gsap.to(rightColRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Pinned Center Content */}
      <div 
        ref={contentRef} 
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center px-4 pointer-events-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-text-primary tracking-tight mb-6">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-md mx-auto mb-8">
            A collection of UI experiments, SwiftUI sketches, and creative coding.
          </p>
          <a href="https://github.com/adib-11" target="_blank" rel="noopener noreferrer" className="group relative rounded-full text-sm px-6 py-3 bg-surface border border-stroke text-text-primary inline-flex items-center gap-2 hover:border-transparent transition-colors">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-border" />
            <span className="relative z-10 flex items-center gap-2">
              Follow on GitHub <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Parallax Columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full px-4 md:px-10 grid grid-cols-2 gap-12 md:gap-40">
          
          {/* Left Column */}
          <div ref={leftColRef} className="flex flex-col items-end gap-32 md:gap-64 pt-[50vh]">
            {explorations.filter((_, i) => i % 2 === 0).map((item, i) => (
              <div 
                key={i}
                className="w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-3xl overflow-hidden border-4 border-surface shadow-2xl pointer-events-auto cursor-pointer transition-transform hover:scale-105"
                style={{ 
                  transform: `rotate(${item.rotation}deg) translateY(${item.yOffset}px)`,
                }}
              >
                <img 
                  src={item.image} 
                  alt="Exploration" 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="flex flex-col items-start gap-32 md:gap-64 pt-[80vh]">
            {explorations.filter((_, i) => i % 2 !== 0).map((item, i) => (
              <div 
                key={i}
                className="w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-3xl overflow-hidden border-4 border-surface shadow-2xl pointer-events-auto cursor-pointer transition-transform hover:scale-105"
                style={{ 
                  transform: `rotate(${item.rotation}deg) translateY(${item.yOffset}px)`,
                }}
              >
                <img 
                  src={item.image} 
                  alt="Exploration" 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
