'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  category: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

/**
 * Projects section with interactive cards and filtering
 *
 * Features:
 * - Glassmorphism cards
 * - Hover effects with 3D transforms
 * - Category filtering
 * - Project details modal
 * - Theme-aware colors
 */
export function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme } = useThemeStore();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'All' ? projects : projects.filter((p) => p.category === selectedCategory);

  const themeColors = {
    light: {
      card: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(0, 0, 0, 0.1)',
      text: '#1a1a1a',
      accent: '#00FFCC',
      tag: '#00FFCC',
      tagText: '#000000',
    },
    dark: {
      card: 'rgba(0, 0, 0, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      accent: '#00FFCC',
      tag: '#00FFCC',
      tagText: '#000000',
    },
  };

  const colors = themeColors[theme.mode as 'light' | 'dark'];

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
          style={{ color: colors.text }}
        >
          Projects
        </motion.h2>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full font-medium transition-colors"
              style={{
                backgroundColor:
                  selectedCategory === category ? colors.accent : `${colors.accent}20`,
                color: selectedCategory === category ? colors.tagText : colors.text,
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
              className="group relative p-6 rounded-xl backdrop-blur-md border cursor-pointer overflow-hidden"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(0, 255, 204, 0.1) 0%, transparent 70%)',
                }}
              />

              {/* Project image */}
              {project.image && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              )}

              {/* Project title */}
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.accent }}>
                {project.title}
              </h3>

              {/* Project description */}
              <p className="text-sm mb-4 line-clamp-2" style={{ color: `${colors.text}80` }}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: `${colors.tag}20`,
                      color: colors.tagText,
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: `${colors.tag}20`,
                      color: colors.tagText,
                    }}
                  >
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-medium hover:underline"
                    style={{ color: colors.accent }}
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-medium hover:underline"
                    style={{ color: colors.accent }}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project details modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-xl backdrop-blur-md border"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  style={{ color: colors.text }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Project title */}
                <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                  {selectedProject.title}
                </h2>

                {/* Project image */}
                {selectedProject.image && (
                  <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Project description */}
                <p className="mb-6" style={{ color: `${colors.text}80` }}>
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: `${colors.tag}20`,
                        color: colors.tagText,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.tagText,
                      }}
                    >
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-lg font-medium border transition-colors hover:opacity-80"
                      style={{
                        borderColor: colors.accent,
                        color: colors.accent,
                      }}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
