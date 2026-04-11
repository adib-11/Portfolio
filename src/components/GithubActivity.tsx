import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

const GITHUB_USERNAME = 'adib-11';

export default function GithubActivity() {
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#2a3f54] border-[#2a3f54]';
      case 2: return 'bg-[#3b5f82] border-[#3b5f82]';
      case 3: return 'bg-[#4E85BF] border-[#4E85BF]';
      case 4: return 'bg-[#89AACC] border-[#89AACC]';
      default: return 'bg-[#161616] border-white/5';
    }
  };

  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Open Source</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-text-primary tracking-tight mb-4">
              Code <span className="font-display italic">contributions</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              My activity across various repositories and open-source projects over the last year.
            </p>
          </div>

          <Button
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="hidden md:inline-flex"
          >
            View on GitHub <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full overflow-x-auto pb-6"
          style={{ scrollbarWidth: 'none' }}
        >
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#161616"
            borderRadius={32}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
            className="min-w-[850px] shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col gap-2 p-8">
              {/* Real GitHub Contribution Chart */}
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={`https://ghchart.rshah.org/4E85BF/${GITHUB_USERNAME}`}
                  alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
                  className="w-full h-auto"
                  style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted mt-4">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition-colors"
                >
                  @{GITHUB_USERNAME}
                </a>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-[4px]">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div key={level} className={`w-3 h-3 rounded-[2px] border ${getLevelColor(level)}`} />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </section>
  );
}
