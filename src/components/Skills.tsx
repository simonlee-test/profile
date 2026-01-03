'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

interface SkillsProps {
  skills: Skill[];
}

/**
 * Skills section with 3D visualization and interactive elements
 *
 * Features:
 * - Glassmorphism design
 * - Animated progress bars
 * - Category-based organization
 * - Hover effects with 3D transforms
 * - Theme-aware colors
 */
export function Skills({ skills }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { theme } = useThemeStore();

  // Group skills by category
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  const themeColors = {
    light: {
      card: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(0, 0, 0, 0.1)',
      text: '#1a1a1a',
      accent: '#00FFCC',
      progress: '#00FFCC',
    },
    dark: {
      card: 'rgba(0, 0, 0, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      accent: '#00FFCC',
      progress: '#00FFCC',
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
          Skills & Expertise
        </motion.h2>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter((skill) => skill.category === category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="p-6 rounded-xl backdrop-blur-md border"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Category title */}
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.accent }}>
                  {category}
                </h3>

                {/* Skills list */}
                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                      className="group"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Skill name and level */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: colors.text }}>
                          {skill.name}
                        </span>
                        <span className="text-sm" style={{ color: colors.accent }}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="relative h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.05 + 0.2 }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: colors.progress,
                            boxShadow:
                              hoveredSkill === skill.name ? `0 0 10px ${colors.progress}` : 'none',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill categories summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {categories.map((category, index) => {
            const categorySkills = skills.filter((skill) => skill.category === category);
            const avgLevel =
              categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className="p-4 rounded-lg text-center backdrop-blur-md border"
                style={{
                  backgroundColor: `${colors.accent}10`,
                  borderColor: `${colors.accent}30`,
                }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: colors.accent }}>
                  {Math.round(avgLevel)}%
                </div>
                <div className="text-sm" style={{ color: colors.text }}>
                  {category}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
