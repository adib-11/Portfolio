import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import BorderGlow from './BorderGlow';
import IPhoneMockup from './IPhoneMockup';
import ProjectModal from './ProjectModal';
import { getAssetPath } from '../utils/assetPath';

const projects = [
  {
    title: "SnowSeeker",
    description: "SwiftUI iOS app that helps users discover and explore ski resorts with a clean, adaptive master-detail interface.",
    longDescription: "SnowSeeker is a SwiftUI-based iOS app that helps users discover and explore ski resorts using a clean, adaptive master-detail interface powered by NavigationSplitView. It loads a bundled dataset from resorts.json, presents a browsable list with country flag thumbnails, resort names, and run counts, and offers fast, localized search via .searchable. Users can mark favorites, which are highlighted inline with a heart icon and shared across views through environment-injected state. The app leverages modern SwiftUI patterns including @State, environment models, and .navigationDestination for type-safe navigation, while incorporating accessibility labels for a more inclusive experience. Its modular structure and data-decoding approach provide a strong foundation for future enhancements like sorting, advanced filters, richer detail views, and cloud-synced favorites.",
    screenshots: [
      getAssetPath("/projects/snowseeker/Home.png"),
      getAssetPath("/projects/snowseeker/Details.png"),
    ],
    githubUrl: "https://github.com/adib-11/100-Days-of-SwiftUI/tree/main/project19",
  },
  {
    title: "Hot Prospects",
    description: "SwiftUI iOS app for tracking potential contacts and outreach. It organizes leads into clear tabs—Everyone, Contacted, and Uncontacted.",
    longDescription: "Hot Prospects is a SwiftUI iOS app for tracking potential contacts and outreach. It organizes leads into clear tabs—Everyone, Contacted, and Uncontacted—so you can prioritize follow-ups at a glance. Built with a clean, tab-based UI and modular views, the project demonstrates state management, filtering, and scalable SwiftUI architecture suitable for real-world productivity apps.",
    screenshots: [
      getAssetPath("/projects/hotprospects/1.png"),
      getAssetPath("/projects/hotprospects/2.png"),
    ],
    githubUrl: "https://github.com/adib-11/100-Days-of-SwiftUI/tree/main/project16",
  },
  {
    title: "BucketList",
    description: "SwiftUI app that lets users build a personalized map of places they want to remember or explore, combining a clean, privacy-conscious architecture with delightful features.",
    longDescription: "BucketList is a SwiftUI app that lets users build a personalized map of places they want to remember or explore, combining a clean, privacy-conscious architecture with delightful, practical features. The app uses MapKit with an intuitive, tappable map to add locations, and displays custom annotations that can be long-pressed to edit details. A lightweight model layer persists data securely to disk using Codable and complete file protection, while Swift Concurrency powers seamless fetching of nearby points of interest from Wikipedia to enrich each place with contextual information. The experience is gated by secure biometric authentication via LocalAuthentication, ensuring personal data remains private. The codebase follows modern Swift practices—observable view models for state, clear separation of concerns, and dependency-light design—resulting in a fast, maintainable, and accessible app that feels at home across Apple platforms.",
    screenshots: [
      getAssetPath("/projects/bucketlist/1.png"),
      getAssetPath("/projects/bucketlist/video.mp4"),
    ],
    githubUrl: "https://github.com/adib-11/100-Days-of-SwiftUI/tree/main/project14",
  },
  {
    title: "Guess the Flag",
    description: "Polished SwiftUI learning game that challenges players to identify national flags with engaging interactions and modern visual design.",
    longDescription: "Guess the Flag is a polished SwiftUI learning game that challenges players to identify national flags. Each round presents three flags and prompts the user to “Tap the flag of” a specific country. The app features smooth animations (3D spin on selection and contextual opacity for non-selected flags), a clean glassy UI using materials and gradients, and a simple scoring system with round-based progression. After eight questions, it displays a final score with an option to play again.\n\nKey highlights:\n• Built with SwiftUI, leveraging @State for game state, scoring, and animations.\n• Engaging interactions: 3D rotation on tap and subtle transitions to emphasize choices.\n• Clear game loop with shuffle logic, correctness feedback via alerts, and a final results screen.\n• Modern visual design: radial gradient background, material cards, and shadowed capsule images for flags.\n\nThis project demonstrates SwiftUI fundamentals, state management, user feedback, and delightful UI/UX patterns in a compact, production-quality mini-game.",
    screenshots: [
      getAssetPath("/projects/guesstheflag/1.png"),
      getAssetPath("/projects/guesstheflag/2.png"),
    ],
    githubUrl: "https://github.com/adib-11/100-Days-of-SwiftUI/tree/main/GuessTheFlag",
  },
  {
    title: "SwiftUI Animations",
    description: "Interactive, state-driven animations demo using a spring-animated button and a draggable, per-character text effect.",
    longDescription: "This SwiftUI demo showcases interactive, state-driven animations using a spring-animated button and a draggable, per-character text effect. Tapping the button toggles an enabled state with a playful spring transition that morphs color and corner radius, while the text “How cool is that?!” is rendered as individually animated characters that move together via a DragGesture and return to their origin on release. Each character uses a slight delay for a wave-like motion, and the drag ending also flips the enabled state to alternate the color scheme. The implementation cleanly leverages @State, withAnimation, and .animation(..., value:) to combine explicit and implicit animations, illustrating how minimal, declarative SwiftUI code can create tactile, delightful interactions.",
    screenshots: [
      getAssetPath("/projects/animations/1.png"),
      getAssetPath("/projects/animations/video.mov"),
    ],
    githubUrl: "https://github.com/adib-11/100-Days-of-SwiftUI/tree/main/Animations",
  }
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
            
            <Button variant="secondary" href="https://github.com/adib-11" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex">
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
