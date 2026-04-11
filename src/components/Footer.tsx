import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ArrowUpRight, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from './Button';

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only need to load it once
        }
      },
      { rootMargin: '200px' } // Load slightly before it enters the viewport
    );

    const currentFooter = document.getElementById('contact');
    if (currentFooter) {
      observer.observe(currentFooter);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // HLS Video Setup
    const video = videoRef.current;
    const src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    }
  }, [isInView]);

  useEffect(() => {
    // Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <footer id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden min-h-[80vh] flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
        {/* Marquee */}
        <div className="w-full overflow-hidden mb-12 md:mb-20">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex whitespace-nowrap">
                {[...Array(10)].map((_, j) => (
                  <span key={j} className="text-6xl md:text-8xl lg:text-9xl font-display italic text-text-primary/20 px-4">
                    LET'S BUILD TOGETHER • 
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-6xl text-text-primary mb-8">
            Let's create something <span className="font-display italic text-accent">extraordinary</span>
          </h2>
          <Button variant="primary" href="mailto:iamadib120775@gmail.com" className="text-lg md:text-xl px-8 py-4">
            iamadib120775@gmail.com <ArrowUpRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-20 px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-muted">
          <a href="https://linkedin.com/in/adibhasan11" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/adib-11" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:iamadib120775@gmail.com" className="hover:text-text-primary transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-md px-4 py-2 rounded-full border border-stroke">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-sm text-text-primary">Available for projects</span>
        </div>
      </div>
    </footer>
  );
}
