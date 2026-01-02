import { create } from 'zustand';

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
 * - Camera animation state management
 */
export const useCameraStore = create<{
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
}>((set) => ({
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
      animationDuration: duration
    }),

  reset: () =>
    set({
      position: [0, 0, 10],
      target: [0, 0, 0],
      zoom: 1,
      fov: 45,
      isAnimating: false,
      animationDuration: 1000
    })
}));
