import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';

export default function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image / Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full max-w-md mx-auto lg:mx-0 flex justify-center"
          >
            <ProfileCard
              name="Md. Adib Hasan"
              title="iOS Developer"
              handle="adibhasan"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/avatar.png"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = 'mailto:iamadib120775@gmail.com'}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              iconUrl=""
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              className="w-full"
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">About Me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-8">
              Engineering <span className="font-display italic">experiences</span> that fit in your pocket.
            </h2>
            
            <div className="space-y-6 text-muted text-base md:text-lg leading-relaxed">
              <p>
                I started as someone who built robots and flew drones; always chasing the feeling of making something real from scratch. Then iOS development changed everything. I realized the most powerful tool I could engineer fits in someone's pocket, and I've been obsessed with that ever since.
              </p>
              <p>
                Now, as an ECE student at RUET, I focus on building Swift-native apps that go beyond function; apps that feel right, respect the user's intelligence, and solve problems worth solving. I'm not trying to build for every platform. I'm trying to master one, deeply; and do it with the same obsessive attention to detail I bring to everything I create.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
