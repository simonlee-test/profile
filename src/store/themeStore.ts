import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, ScrollState, CameraState, AnimationState } from '@/types/theme';

/**
 * Default theme configuration
 */
const defaultTheme: Theme = {
  colors: {
    background: '#050505',
    obsidian: '#050505',
    neonMint: '#00FFCC',
    circuitPurple: '#7000FF',
    bioGreen: '#32CD32',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0'
  },
  mode: 'dark',
  glassmorphism: {
    enabled: true,
    blur: 10,
    opacity: 0.1
  }
};

/**
 * Zustand store for global theme and state management
 *
 * Features:
 * - Persistent state across sessions
 * - Scroll position tracking
 * - Camera synchronization
 * - Animation control
 * - Theme customization
 */
export const useThemeStore = create<{
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  toggleThemeMode: () => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  scrollDirection: 'up' | 'down' | null;
  setScrollDirection: (direction: 'up' | 'down' | null) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  cameraTarget: [number, number, number];
  setCameraTarget: (target: [number, number, number]) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  pauseAnimations: () => void;
  resumeAnimations: () => void;
  reset: () => void;
}>()(
  persist(
    (set) => ({
      // Theme
      theme: defaultTheme,
      setTheme: (newTheme) =>
        set((state) => ({
          theme: { ...state.theme, ...newTheme }
        })),
      toggleThemeMode: () =>
        set((state) => ({
          theme: {
            ...state.theme,
            mode: state.theme.mode === 'dark' ? 'light' : 'dark'
          }
        })),

      // Scroll
      scrollProgress: 0,
      setScrollProgress: (progress) => set({ scrollProgress: progress }),
      scrollDirection: null,
      setScrollDirection: (direction) => set({ scrollDirection: direction }),
      currentSection: 'hero',
      setCurrentSection: (section) => set({ currentSection: section }),

      // Camera
      cameraPosition: [0, 0, 10],
      setCameraPosition: (position) => set({ cameraPosition: position }),
      cameraTarget: [0, 0, 0],
      setCameraTarget: (target) => set({ cameraTarget: target }),

      // Animation
      isAnimating: true,
      setIsAnimating: (isAnimating) => set({ isAnimating }),
      animationSpeed: 1,
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      pauseAnimations: () => set({ isAnimating: false }),
      resumeAnimations: () => set({ isAnimating: true }),

      // Reset
      reset: () =>
        set({
          theme: defaultTheme,
          scrollProgress: 0,
          scrollDirection: null,
          currentSection: 'hero',
          cameraPosition: [0, 0, 10],
          cameraTarget: [0, 0, 0],
          isAnimating: true,
          animationSpeed: 1
        })
    }),
    {
      name: 'neural-garden-theme-storage',
      partialize: (state) => ({
        theme: state.theme,
        animationSpeed: state.animationSpeed
      })
    }
  )
);
