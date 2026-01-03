'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

/**
 * Timeline component with glassmorphism cards and SVG root system patterns
 *
 * Features:
 * - Glassmorphism design
 * - SVG root system background
 * - Intersection Observer for reveal animations
 * - Scroll-triggered animations with Framer Motion
 * - Theme-aware colors
 */
export function Timeline({ items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { theme } = useThemeStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = containerRef.current?.querySelectorAll('[data-index]');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const themeColors = {
    light: {
      card: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(0, 0, 0, 0.1)',
      text: '#1a1a1a',
      accent: '#00FFCC',
    },
    dark: {
      card: 'rgba(0, 0, 0, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      accent: '#00FFCC',
    },
  };

  const colors = themeColors[theme.mode as 'light' | 'dark'];

  return (
    <div ref={containerRef} className="relative py-20 px-4">
      {/* Root system SVG background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Main root line */}
        <path
          d="M 500 0 Q 500 500 500 1000"
          stroke="url(#rootGradient)"
          strokeWidth="2"
          fill="none"
        />
        {/* Branching roots */}
        <path
          d="M 500 200 Q 400 300 350 400"
          stroke="url(#rootGradient)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 500 400 Q 600 500 650 600"
          stroke="url(#rootGradient)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 500 600 Q 400 700 350 800"
          stroke="url(#rootGradient)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 500 800 Q 600 900 650 1000"
          stroke="url(#rootGradient)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Timeline content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            data-index={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={visibleItems.has(index) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex items-center mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={visibleItems.has(index) ? { scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="w-4 h-4 rounded-full bg-[#00FFCC] shadow-lg shadow-cyan-500/50 flex-shrink-0 mx-4"
            />

            {/* Timeline card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleItems.has(index) ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`flex-1 p-6 rounded-xl backdrop-blur-md border ${
                index % 2 === 0 ? 'text-left' : 'text-right'
              }`}
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Year badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={visibleItems.has(index) ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2"
                style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
              >
                {item.year}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.text}cc` }}>
                {item.description}
              </p>

              {/* Technologies */}
              {item.technologies && item.technologies.length > 0 && (
                <div
                  className={`flex flex-wrap gap-2 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {item.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={visibleItems.has(index) ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: index * 0.1 + 0.4 + techIndex * 0.05,
                      }}
                      className="px-3 py-1 rounded-md text-sm font-medium"
                      style={{
                        backgroundColor: `${colors.accent}15`,
                        color: colors.accent,
                        border: `1px solid ${colors.accent}30`,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
