/**
 * Theme color palette
 */
export interface ThemeColors {
  background: string;
  obsidian: string;
  neonMint: string;
  circuitPurple: string;
  bioGreen: string;
  text: string;
  textSecondary: string;
}

/**
 * Theme configuration
 */
export interface Theme {
  colors: ThemeColors;
  mode: 'dark' | 'light';
  glassmorphism: {
    enabled: boolean;
    blur: number;
    opacity: number;
  };
}

/**
 * Camera state for 3D scene synchronization
 */
export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
}

/**
 * Scroll state for page navigation
 */
export interface ScrollState {
  progress: number; // 0 to 1
  direction: 'up' | 'down' | null;
  velocity: number;
  currentSection: string;
}

/**
 * Animation state
 */
export interface AnimationState {
  isAnimating: boolean;
  animationSpeed: number;
  paused: boolean;
}
