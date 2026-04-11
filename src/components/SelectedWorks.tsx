import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import BorderGlow from './BorderGlow';
import IPhoneMockup from './IPhoneMockup';
import ProjectModal from './ProjectModal';

const projects = [
  {
    title: "UniVerse iOS App",
    description: "A student life management app built with SwiftUI and Firebase. Improved data fetch performance by 25% through Firebase optimization, with academic & productivity features.",
    longDescription: "UniVerse is a comprehensive student life management application designed to streamline academic workflows. Built with SwiftUI for a native iOS experience and powered by Firebase for real-time data synchronization.\n\nThe app features intelligent scheduling, assignment tracking, and collaborative study tools — all wrapped in a polished, intuitive interface. Firebase optimization reduced data fetch times by 25%, ensuring a snappy experience even with large datasets.\n\nKey features include a smart calendar, GPA tracker, task management with reminders, and a community feed where students can share resources and study tips.",
    screenshots: [
      "https://picsum.photos/seed/universe1/400/860",
      "https://picsum.photos/seed/universe2/400/860",
    ],
    githubUrl: "https://github.com/placeholder/universe",
  },
  {
    title: "NutriMind Platform",
    description: "Early-stage SaaS solution targeting health and fitness of Bangladeshi people. Built with React, Next.js, Supabase, and external APIs.",
    longDescription: "NutriMind is an early-stage SaaS platform focused on making personalized nutrition and fitness guidance accessible to the Bangladeshi population. It combines modern web technologies with culturally relevant health data.\n\nBuilt with Next.js and React for a fast, SEO-friendly frontend, and Supabase for authentication and database management. External APIs power the nutritional analysis and meal planning features.\n\nThe platform offers BMI tracking, custom meal plans based on local cuisine, exercise routines, and progress analytics — all presented through a clean, modern dashboard.",
    screenshots: [
      "https://picsum.photos/seed/nutri1/400/860",
      "https://picsum.photos/seed/nutri2/400/860",
    ],
    githubUrl: "https://github.com/placeholder/nutrimind",
  },
  {
    title: "16-Sensor Line-Following Robot",
    description: "Custom PCB design with 16-sensor array, improving line detection resolution 4×. Optimized PID tuning for ~35% more stability and 20% faster tracking.",
    longDescription: "This project involved designing and building a high-precision line-following robot from the ground up, including custom PCB design for a 16-sensor infrared array that improved line detection resolution by 4× compared to standard 4-sensor setups.\n\nThe robot uses a finely tuned PID (Proportional-Integral-Derivative) controller to achieve smooth, stable tracking at speed. Extensive calibration and parameter optimization resulted in ~35% more stability and 20% faster line tracking.\n\nThe custom PCB was designed in KiCad, featuring compact sensor placement, noise filtering, and efficient power distribution. The firmware runs on an ARM-based microcontroller with real-time sensor fusion.",
    screenshots: [
      "https://picsum.photos/seed/robot1/400/860",
      "https://picsum.photos/seed/robot2/400/860",
    ],
    githubUrl: "https://github.com/placeholder/line-robot",
  },
  {
    title: "ESP32 Micro Drone",
    description: "Programmable micro drone with sensor fusion flight controller achieving hover stabilization. Improved command latency by ~18% via ESP32 optimization.",
    longDescription: "A fully programmable micro drone powered by the ESP32 microcontroller, featuring a custom sensor fusion flight controller built from scratch. The project demonstrates embedded systems programming, real-time control theory, and PCB design.\n\nThe flight controller combines accelerometer, gyroscope, and barometer data using a complementary filter for stable hover. ESP32-specific optimizations — including FreeRTOS task prioritization and DMA transfers — reduced command latency by approximately 18%.\n\nThe drone supports Wi-Fi-based remote control through a custom mobile app, telemetry streaming, and autonomous waypoint navigation using GPS.",
    screenshots: [
      "https://picsum.photos/seed/drone1/400/860",
      "https://picsum.photos/seed/drone2/400/860",
    ],
    githubUrl: "https://github.com/placeholder/micro-drone",
  },
  {
    title: "Hackathon Web Platforms",
    description: "Deployment-ready web apps built with HTML, CSS, JS, and Supabase for national hackathons. Reduced prototype build time by 30–40% using modular components.",
    longDescription: "A collection of deployment-ready web applications built for national hackathon competitions. Each platform was designed for rapid prototyping without sacrificing code quality or user experience.\n\nThe tech stack centers on vanilla HTML, CSS, and JavaScript for maximum flexibility, paired with Supabase for backend services including authentication, real-time databases, and file storage.\n\nA modular component library was developed across projects, reducing prototype build time by 30–40%. Each application features responsive design, progressive enhancement, and clean architecture patterns.",
    screenshots: [
      "https://picsum.photos/seed/hack1/400/860",
      "https://picsum.photos/seed/hack2/400/860",
    ],
    githubUrl: "https://github.com/placeholder/hackathon-platforms",
  },
];

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Delay clearing the project data so exit animation can play
    setTimeout(() => setSelectedProject(null), 400);
  };

  return (
    <>
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
                        <div
                          onClick={() => openModal(project)}
                          className="rounded-full px-6 py-3 bg-white text-bg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 w-fit"
                        >
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
                      <div className="absolute right-[30%] md:right-[40%] top-[10%] transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-[12deg]">
                        <IPhoneMockup
                          screenImage={project.screenshots[1] || project.screenshots[0]}
                          size="sm"
                          rotate={15}
                          className="opacity-60 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        />
                      </div>

                      {/* iPhone 2 (Right/Front) */}
                      <div className="absolute right-[-10%] md:right-[5%] top-[15%] z-10 transition-transform duration-700 group-hover:-translate-y-6 group-hover:rotate-[12deg]">
                        <IPhoneMockup
                          screenImage={project.screenshots[0]}
                          size="md"
                          rotate={15}
                          className="shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
