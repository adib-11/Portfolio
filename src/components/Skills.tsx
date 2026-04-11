import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';
import { 
  SiApple, 
  SiSwift, 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiFirebase, 
  SiSupabase, 
  SiGithub, 
  SiXcode, 
  SiCplusplus, 
  SiArduino 
} from 'react-icons/si';

const techLogos = [
  { node: <SiApple className="w-full h-full" />, title: "iOS" },
  { node: <SiSwift className="w-full h-full" />, title: "Swift" },
  { node: <SiJavascript className="w-full h-full" />, title: "JavaScript" },
  { node: <SiReact className="w-full h-full" />, title: "React" },
  { node: <SiNextdotjs className="w-full h-full" />, title: "Next.js" },
  { node: <SiFirebase className="w-full h-full" />, title: "Firebase" },
  { node: <SiSupabase className="w-full h-full" />, title: "Supabase" },
  { node: <SiGithub className="w-full h-full" />, title: "GitHub" },
  { node: <SiXcode className="w-full h-full" />, title: "Xcode" },
  { node: <SiCplusplus className="w-full h-full" />, title: "C++" },
  { node: <SiArduino className="w-full h-full" />, title: "Arduino" },
];

export default function Skills() {
  return (
    <section className="bg-bg pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Toolkit</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-text-primary tracking-tight mb-4">
              Core <span className="font-display italic">technologies</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              The languages, frameworks, and tools I use to bring ideas to life.
            </p>
          </div>
        </motion.div>

        {/* Logo Loop */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-24 overflow-hidden rounded-2xl bg-surface/30 border border-stroke flex items-center"
        >
          <LogoLoop
            logos={techLogos}
            speed={40}
            direction="left"
            logoHeight={40}
            gap={60}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="hsl(0 0% 4%)"
            ariaLabel="Technology stack"
          />
        </motion.div>
      </div>
    </section>
  );
}
