import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import MilestoneModal, { MilestoneData } from './MilestoneModal';
import { getAssetPath } from '../utils/assetPath';

const entries: MilestoneData[] = [
  { 
    title: "Team Leader | UIHP Innovation Cohort", 
    date: "2024", 
    readTime: "40k BDT Funded", 
    image: getAssetPath("/milestones/uihp.webp"),
    description: "As the Team Leader for the UIHP Innovation Cohort, I led a multidisciplinary team to conceptualize and develop an innovative, tech-driven healthcare solution. Our project successfully secured 40,000 BDT in funding from the program. The experience challenged me to think beyond mere code—integrating real-world problem-solving, team coordination, and stringent milestone delivery under pressure."
  },
  { 
    title: "2nd Runner-UP | Hult Prize at RUET 2026", 
    date: "2026", 
    readTime: "RUET", 
    image: getAssetPath("/milestones/hult.webp"),
    description: "Securing the 2nd Runner-Up position at the prestigious Hult Prize at RUET involved pitching a globally scalable social enterprise idea to a panel of expert judges. The competition honed my ability to identify pressing socio-economic challenges, architect sustainable startup models, and confidently present our technical infrastructure to stakeholders."
  },
  { 
    title: "Top 50 | InnovateX Hackathon", 
    date: "2024", 
    readTime: "BUBT × Programming Hero", 
    image: getAssetPath("/milestones/innovatex.webp"),
    description: "Competing against hundreds of talented teams nationally, my team secured a Top 50 placement at the InnovateX Hackathon hosted by BUBT and Programming Hero. We engineered a rapid prototype under a grueling 24-hour time constraint, proving our collective ability to design, develop, and deploy a functional product on strict deadlines without compromising code quality."
  },
  { 
    title: "Top 50 | SOLVIO AI Hackathon", 
    date: "2024", 
    readTime: "Sheba Platform", 
    image: getAssetPath("/milestones/solvio.webp"),
    description: "Achieved a Top 50 finish at the SOLVIO AI Hackathon, organized by Sheba Platform. The event focused intensely on integrating artificial intelligence into practical service delivery models. We rapidly leveraged modern APIs and machine learning concepts to build an intelligent prototype, showcasing how AI can seamlessly streamline business operations."
  },
];

export default function Journal() {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent, entry: MilestoneData) => {
    e.preventDefault();
    setSelectedMilestone(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMilestone(null), 400); // Wait for exit animation
  };

  return (
    <>
      <section id="experience" className="bg-bg py-16 md:py-24">
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
                <span className="text-xs text-muted uppercase tracking-[0.3em]">Experience</span>
              </div>
              <h2 className="text-4xl md:text-6xl text-text-primary tracking-tight mb-4">
                Recent <span className="font-display italic">milestones</span>
              </h2>
              <p className="text-muted text-sm md:text-base">
                Key achievements, hackathons, and continuous learning journey.
              </p>
            </div>

            <Button variant="secondary" href="https://linkedin.com/in/adibhasan11" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex">
              View all <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Entries */}
          <div className="flex flex-col gap-4">
            {entries.map((entry, i) => (
              <motion.a
                href="#"
                onClick={(e) => openModal(e, entry)}
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 w-full px-2 sm:px-0">
                  <h3 className="text-lg sm:text-xl text-text-primary font-medium group-hover:text-accent transition-colors">
                    {entry.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs sm:text-sm text-muted shrink-0">
                    <span>{entry.readTime}</span>
                    <div className="w-1 h-1 rounded-full bg-stroke" />
                    <span>{entry.date}</span>
                  </div>
                </div>

                <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-full border border-stroke items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-colors duration-300 mr-2">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <MilestoneModal 
        milestone={selectedMilestone} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
}
