'use client';

import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import type { Interest } from '@/types/interests';

interface BentoItemProps {
  interest: Interest;
  index: number;
}

/**
 * BentoItem component for displaying individual interest cards
 *
 * Features:
 * - Varied sizes (small, medium, large, wide, tall)
 * - Hover animations with 3D transforms
 * - Theme-aware colors
 * - Glassmorphism design
 * - Optional image/icon display
 * - Tag display
 */
export function BentoItem({ interest, index }: BentoItemProps) {
  const { theme } = useThemeStore();

  const themeColors = {
    light: {
      bg: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(0, 0, 0, 0.1)',
      text: '#1a1a1a',
      textSecondary: '#666666',
      accent: interest.color || '#00FFCC',
      tagBg: 'rgba(0, 0, 0, 0.05)',
      tagText: '#1a1a1a',
    },
    dark: {
      bg: 'rgba(0, 0, 0, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: interest.color || '#00FFCC',
      tagBg: 'rgba(255, 255, 255, 0.1)',
      tagText: '#ffffff',
    },
  };

  const colors = themeColors[theme.mode as 'light' | 'dark'];

  // Size classes for different bento item sizes
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
    wide: 'col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
  };

  const sizeClass = sizeClasses[interest.size || 'medium'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
      className={`${sizeClass} backdrop-blur-lg rounded-2xl border-2 overflow-hidden cursor-pointer`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="h-full p-6 flex flex-col">
        {/* Header with icon/title */}
        <div className="flex items-start justify-between mb-4">
          {interest.icon && (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${colors.accent}20` }}
            >
              {interest.icon}
            </div>
          )}
          {interest.featured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.accent, color: '#000' }}
            >
              Featured
            </motion.span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
          {interest.title}
        </h3>

        {/* Description */}
        <p className="text-sm mb-4 flex-grow" style={{ color: colors.textSecondary }}>
          {interest.description}
        </p>

        {/* Tags */}
        {interest.tags && interest.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {interest.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 + tagIndex * 0.05 }}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: colors.tagBg,
                  color: colors.tagText,
                }}
              >
                {tag}
              </motion.span>
            ))}
            {interest.tags.length > 3 && (
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: colors.tagBg,
                  color: colors.tagText,
                }}
              >
                +{interest.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Category badge */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: colors.accent }}
          >
            {interest.category}
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(circle at center, ${colors.accent}10 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
