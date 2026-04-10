import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import BorderGlow from './BorderGlow';

const projects = [
  { title: "UniVerse iOS App", description: "A student life management app built with SwiftUI and Firebase. Improved data fetch performance by 25% through Firebase optimization, with academic & productivity features.", image: "https://picsum.photos/seed/ios1/1200/800" },
  { title: "NutriMind Platform", description: "Early-stage SaaS solution targeting health and fitness of Bangladeshi people. Built with React, Next.js, Supabase, and external APIs.", image: "https://picsum.photos/seed/health/1200/800" },
  { title: "16-Sensor Line-Following Robot", description: "Custom PCB design with 16-sensor array, improving line detection resolution 4×. Optimized PID tuning for ~35% more stability and 20% faster tracking.", image: "https://picsum.photos/seed/robot/1200/800" },
  { title: "ESP32 Micro Drone", description: "Programmable micro drone with sensor fusion flight controller achieving hover stabilization. Improved command latency by ~18% via ESP32 optimization.", image: "https://picsum.photos/seed/drone/1200/800" },
  { title: "Hackathon Web Platforms", description: "Deployment-ready web apps built with HTML, CSS, JS, and Supabase for national hackathons. Reduced prototype build time by 30–40% using modular components.", image: "https://picsum.photos/seed/hack/1200/800" },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-text-primary tracking-tight mb-4">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          
          <Button variant="secondary" className="hidden md:inline-flex">
            View all work <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Scroll Stack */}
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={40} 
          className="mt-10"
        >
          {projects.map((project, i) => (
            <ScrollStackItem 
              key={i} 
              itemClassName="group overflow-hidden bg-[#161616] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] h-[500px] md:h-[600px] p-0 relative rounded-[40px]"
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#161616"
                borderRadius={40}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                className="w-full h-full"
              >
                {/* Subtle top inner highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row w-full h-full relative z-10">
                  {/* Left Side: Text Content */}
                  <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
                    <h3 className="text-3xl md:text-5xl text-white mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted max-w-xl text-sm md:text-base mb-8">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto md:mt-0">
                      <div className="rounded-full px-6 py-3 bg-white text-bg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 w-fit">
                        <span className="text-sm font-medium">View Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Right Side: iPhone Mockups */}
                  <div className="w-full md:w-1/2 relative h-full min-h-[300px] overflow-hidden">
                    {/* Subtle glow behind iPhones */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 rounded-full blur-[80px] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    {/* iPhone 1 (Left/Back) */}
                    <div className="absolute right-[30%] md:right-[40%] top-[10%] w-[200px] md:w-[260px] h-[420px] md:h-[540px] rounded-[32px] md:rounded-[44px] border-[6px] md:border-[8px] border-[#2a2a2a] bg-bg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-[15deg] overflow-hidden transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-[12deg]">
                      <img src={`https://picsum.photos/seed/${project.title}1/400/800`} alt="App Screen 1" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    {/* iPhone 2 (Right/Front) */}
                    <div className="absolute right-[-10%] md:right-[5%] top-[20%] w-[220px] md:w-[280px] h-[460px] md:h-[580px] rounded-[36px] md:rounded-[48px] border-[6px] md:border-[8px] border-[#1a1a1a] bg-bg shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform rotate-[15deg] overflow-hidden transition-transform duration-700 group-hover:-translate-y-6 group-hover:rotate-[12deg] z-10">
                      {/* Dynamic Island */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 md:w-24 h-6 md:h-7 bg-black rounded-full z-10" />
                      <img src={`https://picsum.photos/seed/${project.title}2/400/800`} alt="App Screen 2" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
