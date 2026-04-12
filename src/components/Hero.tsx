import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

const roles = ["iOS Developer", "Software Engineer", "Innovator"];

function RotatingRole() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Role cycling
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blur-in text-xl md:text-2xl text-text-primary mb-4">
      {/^[aeiou]/i.test(roles[roleIndex]) ? "An" : "A"} <span key={roleIndex} className="font-display italic text-text-primary animate-role-fade-in inline-block">{roles[roleIndex]}</span> based in Bangladesh.
    </div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".name-reveal", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
    .fromTo(".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
      "-=0.8"
    );
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="blur-in flex items-center gap-3 bg-surface/50 backdrop-blur-md px-4 py-2 rounded-full border border-stroke mb-8">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-xs text-text-primary uppercase tracking-[0.2em]">Available for projects</span>
        </div>
        
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Md. Adib Hasan
        </h1>
        
        <RotatingRole />
        
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Crafting seamless and performant iOS applications using Swift and SwiftUI, with a strong focus on user experience and clean architecture.
        </p>
        
        <div className="blur-in flex flex-col sm:flex-row items-center gap-4">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group relative rounded-full text-sm px-7 py-3.5 transition-transform hover:scale-105 bg-text-primary text-bg hover:bg-bg hover:text-text-primary">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-border" />
            <span className="relative z-10">Resume</span>
          </a>
          
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            const lenis = (window as any).__lenis;
            if (lenis) { lenis.scrollTo('#contact', { duration: 1.2 }); }
            else { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }
          }} className="group relative rounded-full text-sm px-7 py-3.5 transition-transform hover:scale-105 border-2 border-stroke bg-bg text-text-primary hover:border-transparent">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient-border" />
            <span className="relative z-10">Reach out...</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
