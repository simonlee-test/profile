'use client';

import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { BentoGrid } from '@/components/BentoGrid';
import { Sparkles } from 'lucide-react';

export default function InterestsPage() {
  const theme = useThemeStore();

  const themeColors = {
    light: {
      bg: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      accent: '#00FFCC',
      border: 'rgba(0, 0, 0, 0.1)',
      cardBg: 'rgba(255, 255, 255, 0.8)',
    },
    dark: {
      bg: '#050505',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: '#00FFCC',
      border: 'rgba(255, 255, 255, 0.1)',
      cardBg: 'rgba(0, 0, 0, 0.6)',
    },
  };

  const colors = themeColors[theme.theme.mode as 'light' | 'dark'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: `${colors.accent}20`,
              border: `1px solid ${colors.accent}`,
            }}
          >
            <Sparkles size={16} style={{ color: colors.accent }} />
            <span className="text-sm font-medium" style={{ color: colors.accent }}>
              Explore My Interests
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: colors.text }}
          >
            What I'm Passionate About
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl mb-8"
            style={{ color: colors.textSecondary }}
          >
            A collection of my interests, hobbies, and passions that shape who I am
          </motion.p>
        </div>
      </motion.div>

      {/* Bento Grid Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="container mx-auto px-4 pb-16"
      >
        <BentoGrid />
      </motion.div>

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Want to connect? Feel free to reach out and discuss any of these topics!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
