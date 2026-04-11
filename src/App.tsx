/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Footer from './components/Footer';
import ClickSpark from './components/ClickSpark';

// Lazy load heavy / below-the-fold components
const SelectedWorks = lazy(() => import('./components/SelectedWorks'));
const Journal = lazy(() => import('./components/Journal'));
const Explorations = lazy(() => import('./components/Explorations'));
const GithubActivity = lazy(() => import('./components/GithubActivity'));
const Education = lazy(() => import('./components/Education'));

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
            <Skills />
            <Suspense fallback={<div className="h-20 w-full" />}>
              <SelectedWorks />
              <Journal />
              <Explorations />
              <GithubActivity />
              <Education />
            </Suspense>
          </main>
          <Footer />
        </motion.div>
      )}
    </ClickSpark>
  );
}
