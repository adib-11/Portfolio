/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SelectedWorks from './components/SelectedWorks';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import GithubActivity from './components/GithubActivity';
import Education from './components/Education';
import Footer from './components/Footer';
import ClickSpark from './components/ClickSpark';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={20}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Stats />
            <SelectedWorks />
            <Skills />
            <Journal />
            <Explorations />
            <GithubActivity />
            <Education />
          </main>
          <Footer />
        </motion.div>
      )}
    </ClickSpark>
  );
}
