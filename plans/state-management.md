# State Management with Zustand

## themeStore.ts

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  mode: "dark" | "light";
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
  direction: "up" | "down" | null;
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

/**
 * Main theme store interface
 */
export interface ThemeStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  toggleThemeMode: () => void;

  // Scroll
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  scrollDirection: "up" | "down" | null;
  setScrollDirection: (direction: "up" | "down" | null) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Camera
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  cameraTarget: [number, number, number];
  setCameraTarget: (target: [number, number, number]) => void;

  // Animation
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  pauseAnimations: () => void;
  resumeAnimations: () => void;

  // Reset
  reset: () => void;
}

/**
 * Default theme configuration
 */
const defaultTheme: Theme = {
  colors: {
    background: "#050505",
    obsidian: "#050505",
    neonMint: "#00FFCC",
    circuitPurple: "#7000FF",
    bioGreen: "#32CD32",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
  },
  mode: "dark",
  glassmorphism: {
    enabled: true,
    blur: 10,
    opacity: 0.1,
  },
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
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Theme
      theme: defaultTheme,
      setTheme: (newTheme) =>
        set((state) => ({
          theme: { ...state.theme, ...newTheme },
        })),
      toggleThemeMode: () =>
        set((state) => ({
          theme: {
            ...state.theme,
            mode: state.theme.mode === "dark" ? "light" : "dark",
          },
        })),

      // Scroll
      scrollProgress: 0,
      setScrollProgress: (progress) => set({ scrollProgress: progress }),
      scrollDirection: null,
      setScrollDirection: (direction) => set({ scrollDirection: direction }),
      currentSection: "hero",
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
          currentSection: "hero",
          cameraPosition: [0, 0, 10],
          cameraTarget: [0, 0, 0],
          isAnimating: true,
          animationSpeed: 1,
        }),
    }),
    {
      name: "neural-garden-theme-storage",
      partialize: (state) => ({
        theme: state.theme,
        animationSpeed: state.animationSpeed,
      }),
    }
  )
);
```

## cameraStore.ts

```typescript
import { create } from "zustand";

/**
 * Camera animation state
 */
export interface CameraAnimation {
  isAnimating: boolean;
  duration: number;
  ease: string;
}

/**
 * Camera store for 3D scene camera management
 *
 * Features:
 * - Camera position tracking
 * - Camera target tracking
 * - Camera zoom control
 * - Animation state management
 */
export interface CameraStore {
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
  fov: number;
  isAnimating: boolean;
  animationDuration: number;

  setPosition: (position: [number, number, number]) => void;
  setTarget: (target: [number, number, number]) => void;
  setZoom: (zoom: number) => void;
  setFov: (fov: number) => void;
  animateTo: (
    position: [number, number, number],
    target: [number, number, number],
    duration?: number
  ) => void;
  reset: () => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
  position: [0, 0, 10],
  target: [0, 0, 0],
  zoom: 1,
  fov: 45,
  isAnimating: false,
  animationDuration: 1000,

  setPosition: (position) => set({ position }),
  setTarget: (target) => set({ target }),
  setZoom: (zoom) => set({ zoom }),
  setFov: (fov) => set({ fov }),

  animateTo: (position, target, duration = 1000) =>
    set({
      position,
      target,
      isAnimating: true,
      animationDuration: duration,
    }),

  reset: () =>
    set({
      position: [0, 0, 10],
      target: [0, 0, 0],
      zoom: 1,
      fov: 45,
      isAnimating: false,
      animationDuration: 1000,
    }),
}));
```

## Usage Examples

### Using Theme Store in Components

```typescript
"use client";

import { useThemeStore } from "@/store/themeStore";

export function MyComponent() {
  const { theme, scrollProgress, setScrollProgress } = useThemeStore();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <p>Scroll Progress: {Math.round(scrollProgress * 100)}%</p>
    </div>
  );
}
```

### Synchronizing Camera with Scroll

```typescript
"use client";

import { useThemeStore } from "@/store/themeStore";
import { useCameraStore } from "@/store/cameraStore";
import { useEffect } from "react";

export function ScrollCameraSync() {
  const { scrollProgress } = useThemeStore();
  const { animateTo } = useCameraStore();

  useEffect(() => {
    // Calculate camera position based on scroll
    const x = Math.sin(scrollProgress * Math.PI * 2) * 2;
    const y = scrollProgress * 5 - 2.5;
    const z = 10 - scrollProgress * 3;

    animateTo([x, y, z], [0, 0, 0], 500);
  }, [scrollProgress, animateTo]);

  return null;
}
```

### Updating Theme Colors

```typescript
"use client";

import { useThemeStore } from "@/store/themeStore";

export function ThemeCustomizer() {
  const { theme, setTheme } = useThemeStore();

  const updateNeonMint = (color: string) => {
    setTheme({
      colors: {
        ...theme.colors,
        neonMint: color,
      },
    });
  };

  return (
    <input
      type="color"
      value={theme.colors.neonMint}
      onChange={(e) => updateNeonMint(e.target.value)}
    />
  );
}
```

## Store Integration with 3D Components

```typescript
"use client";

import { useThree } from "@react-three/fiber";
import { useCameraStore } from "@/store/cameraStore";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export function SceneSync() {
  const { camera } = useThree();
  const { position, target, isAnimating } = useCameraStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    // Update camera position from store
    camera.position.set(...position);
    camera.lookAt(...target);

    // Update scene background from theme
    camera.background = new THREE.Color(theme.colors.background);
  }, [camera, position, target, theme]);

  return null;
}
```

## Performance Considerations

1. **Selective Subscriptions**: Use selectors to subscribe only to needed state

   ```typescript
   const scrollProgress = useThemeStore((state) => state.scrollProgress);
   ```

2. **Debounced Updates**: Debounce scroll updates to prevent excessive re-renders

   ```typescript
   const debouncedSetScroll = useMemo(
     () => debounce(setScrollProgress, 100),
     [setScrollProgress]
   );
   ```

3. **Persistence**: Only persist essential state (theme, preferences)

   ```typescript
   partialize: (state) => ({
     theme: state.theme,
     animationSpeed: state.animationSpeed,
   });
   ```

4. **Batch Updates**: Use `set` with multiple updates at once
   ```typescript
   set({ scrollProgress: 0.5, currentSection: "timeline" });
   ```

## Store Architecture Benefits

1. **Centralized State**: All global state in one place
2. **Type Safety**: Full TypeScript support
3. **Performance**: Minimal re-renders with selectors
4. **Persistence**: Automatic state persistence
5. **DevTools**: Built-in DevTools integration
6. **Simplicity**: No boilerplate or context providers needed
