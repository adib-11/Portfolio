import { motion } from 'framer-motion';

const stats = [
  { value: "3.70", label: "CGPA at RUET" },
  { value: "40k+", label: "BDT Pre-seed Funding" },
  { value: "Top 50", label: "National Hackathons" },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0"
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary mb-4">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
