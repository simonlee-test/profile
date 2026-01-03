'use client';

import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

/**
 * Loading spinner component with neural network animation
 *
 * Features:
 * - Animated neural network nodes
 * - Theme-aware colors
 * - Multiple size options
 * - Optional loading text
 */
export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const { theme } = useThemeStore();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const nodeSize = {
    sm: 4,
    md: 6,
    lg: 8,
  };

  const themeColors = {
    light: {
      node: '#00FFCC',
      line: 'rgba(0, 255, 204, 0.3)',
      text: '#1a1a1a',
    },
    dark: {
      node: '#00FFCC',
      line: 'rgba(0, 255, 204, 0.3)',
      text: '#ffffff',
    },
  };

  const colors = themeColors[theme.mode as 'light' | 'dark'];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Neural network animation */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
          {/* Connecting lines */}
          <motion.line
            x1="20"
            y1="20"
            x2="50"
            y2="50"
            stroke={colors.line}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="80"
            y2="20"
            stroke={colors.line}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          <motion.line
            x1="20"
            y1="80"
            x2="50"
            y2="50"
            stroke={colors.line}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="80"
            y2="80"
            stroke={colors.line}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />

          {/* Nodes */}
          {[20, 50, 80].map((x, i) => {
            const yPositions = [20, 50, 80];
            return yPositions.map((y, j) => {
              const delay = (i * 3 + j) * 0.15;
              return (
                <motion.circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r={nodeSize[size]}
                  fill={colors.node}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    filter: `drop-shadow(0 0 ${nodeSize[size]}px ${colors.node})`,
                  }}
                />
              );
            });
          })}
        </svg>
      </div>

      {/* Loading text */}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium"
          style={{ color: colors.text }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
