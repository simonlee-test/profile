import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

/**
 * Custom hook to synchronize theme with 3D scene
 *
 * Features:
 * - Syncs theme colors with Three.js scene background
 * - Updates camera position based on scroll
 * - Manages animation state
 */
export function useThemeSync() {
  const { theme, scrollProgress, cameraPosition, setCameraPosition, isAnimating } = useThemeStore();

  useEffect(() => {
    // Update Three.js scene background when theme changes
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const renderer = (canvas as any).__renderer;
      if (renderer && renderer.setClearColor) {
        renderer.setClearColor(theme.colors.background);
      }
    }
  }, [theme.colors.background]);

  useEffect(() => {
    // Update camera position based on scroll progress
    const x = Math.sin(scrollProgress * Math.PI * 2) * 2;
    const y = scrollProgress * 5 - 2.5;
    const z = 10 - scrollProgress * 3;

    setCameraPosition([x, y, z]);
  }, [scrollProgress, setCameraPosition]);

  return {
    theme,
    scrollProgress,
    cameraPosition,
    isAnimating
  };
}
