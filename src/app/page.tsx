'use client';

import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ScrollProgress } from '@/components/ScrollProgress';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Timeline } from '@/components/Timeline';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { GitHubSection } from '@/components/GitHubSection';
import Contact from '@/components/Contact';
import { timelineData, skillsData, projectsData } from '@/data/portfolioData';

// Lazy load 3D components for better performance
const HeroScene = lazy(() =>
  import('@/components/canvas/HeroScene').then((m) => ({ default: m.HeroScene }))
);
const PortfolioGallery = lazy(() =>
  import('@/components/canvas/PortfolioGallery').then((m) => ({ default: m.default }))
);

export default function Home() {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  return (
    <ErrorBoundary>
      <main className="min-h-screen w-full bg-[#050505]">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Navigation */}
        <Navigation />

        {/* Hero Section with 3D Scene */}
        <section id="hero" className="relative h-screen w-full overflow-hidden">
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading 3D Scene..." />}>
            <HeroScene />
          </Suspense>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center z-10 px-4"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#00FFCC] via-[#7000FF] to-[#32CD32] bg-clip-text text-transparent"
              >
                Neural Digital Garden
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-lg md:text-xl text-gray-400 font-mono mb-8"
              >
                Where creativity meets technology
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="flex gap-4 justify-center pointer-events-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-8 py-3 rounded-full font-medium transition-all bg-[#00FFCC] text-black hover:shadow-[0_0_20px_rgba(0,255,204,0.5)]"
                >
                  View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="px-8 py-3 rounded-full font-medium transition-all border border-[#00FFCC] text-[#00FFCC] hover:bg-[#00FFCC] hover:text-black"
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-[#00FFCC] rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#00FFCC] rounded-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-8 text-center text-white"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-xl backdrop-blur-md border border-white/10 bg-black/30"
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a passionate Full Stack Developer with expertise in building modern web
                applications. My journey in technology has taken me from creating simple websites to
                architecting complex, scalable systems that serve millions of users.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I specialize in React, Next.js, TypeScript, and Node.js, with a keen interest in 3D
                web experiences and AI integration. I believe in writing clean, maintainable code
                and creating intuitive user experiences that make a difference.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge through technical writing and mentoring.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="bg-[#0a0a0a]">
          <Timeline items={timelineData} />
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
          <Skills skills={skillsData} />
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-[#050505]">
          <div className="max-w-6xl mx-auto py-20 px-4">
            {/* View Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('2d')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    viewMode === '2d' ? 'bg-[#00FFCC] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  2D View
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    viewMode === '3d' ? 'bg-[#00FFCC] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  3D View
                </button>
              </div>
            </motion.div>

            {/* Content based on view mode */}
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {viewMode === '2d' ? (
                <Projects projects={projectsData} />
              ) : (
                <Suspense fallback={<LoadingSpinner size="lg" text="Loading 3D Gallery..." />}>
                  <PortfolioGallery projects={projectsData} />
                </Suspense>
              )}
            </motion.div>
          </div>
        </section>

        {/* GitHub Section */}
        <section id="github" className="bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
          <GitHubSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
          <Contact />
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-[#0a0a0a] border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400"
            >
              © {new Date().getFullYear()} Neural Digital Garden. Built with Next.js, React Three
              Fiber, and Framer Motion.
            </motion.p>
          </div>
        </footer>
      </main>
    </ErrorBoundary>
  );
}
