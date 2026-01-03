'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

/**
 * Scroll progress indicator component
 *
 * Features:
 * - Fixed position at top of page
 * - Shows scroll progress as a bar
 * - Theme-aware colors
 * - Smooth animations
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { theme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min((scrolled / documentHeight) * 100, 100);
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeColors = {
    light: {
      progress: '#00FFCC',
      background: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      progress: '#00FFCC',
      background: 'rgba(255, 255, 255, 0.1)',
    },
  };

  const colors = themeColors[theme.mode as 'light' | 'dark'];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <motion.div
        className="h-full"
        style={{
          backgroundColor: colors.progress,
          boxShadow: `0 0 10px ${colors.progress}`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
