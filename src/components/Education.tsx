import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';

const SQRT_5000 = Math.sqrt(5000);

const educationData = [
  {
    id: 0,
    title: "B.Sc in Electrical & Computer Engineering. Current CGPA: 3.70/4.00 with coursework in C, C++, Java, DSA, Database Management, and Digital Techniques.",
    institution: "Rajshahi University of Engineering & Technology (RUET)",
    year: "2023 - Present",
    imgSrc: getAssetPath("/logos/ruet_logo.webp")
  },
  {
    id: 1,
    title: "Higher Secondary Certificate (HSC). Achieved GPA 5.00/5.00 in Science group.",
    institution: "Abdul Kadir Mollah City College, Narsingdi",
    year: "2022",
    imgSrc: getAssetPath("/logos/college.webp")
  },
  {
    id: 2,
    title: "Secondary School Certificate (SSC). Achieved GPA 5.00/5.00 in Science group.",
    institution: "Brahmondi K.K.M Govt High School",
    year: "2020",
    imgSrc: getAssetPath("/logos/school.webp")
  },
  {
    id: 3,
    title: "Agentic AI Certification. Completed coursework on building autonomous AI agents and workflows.",
    institution: "DeepLearning.AI",
    year: "2025",
    imgSrc: getAssetPath("/logos/deeplearning.webp")
  },
  {
    id: 4,
    title: "100 Days of SwiftUI. Comprehensive iOS development course covering SwiftUI, Core Data, networking, and app architecture.",
    institution: "HackingWithSwift.com",
    year: "Ongoing",
    imgSrc: getAssetPath("/logos/hacking_with_swift.webp")
  }
];

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface EducationCardProps {
  position: number;
  data: typeof educationData[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const EducationCard: React.FC<EducationCardProps> = ({
  position,
  data,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-text-primary text-bg border-text-primary"
          : "z-0 bg-surface text-text-primary border-stroke hover:border-text-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px var(--color-stroke)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-stroke"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={data.imgSrc}
        alt={data.institution}
        loading="lazy"
        decoding="async"
        className="mb-4 h-14 w-12 bg-stroke object-cover object-center"
        style={{
          boxShadow: "3px 3px 0px var(--color-bg)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-bg" : "text-text-primary"
      )}>
        "{data.title}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-bg/80" : "text-muted"
      )}>
        - {data.institution}, {data.year}
      </p>
    </div>
  );
};

export default function Education() {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(educationData);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift(item);
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section id="education" className="bg-bg py-24 border-y border-stroke overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Academics</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-text-primary tracking-tight mb-4">
            Educational <span className="font-display italic">background</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl">
            My academic background and continuous learning journey.
          </p>
        </motion.div>
      </div>

      <div
        className="relative w-full overflow-hidden bg-bg"
        style={{ height: 600 }}
      >
        {list.map((item, index) => {
          const position = index - Math.floor(list.length / 2);
          return (
            <EducationCard
              key={item.id}
              data={item}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
              "bg-surface border-2 border-stroke hover:bg-text-primary hover:text-bg text-text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke focus-visible:ring-offset-2"
            )}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
              "bg-surface border-2 border-stroke hover:bg-text-primary hover:text-bg text-text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke focus-visible:ring-offset-2"
            )}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
