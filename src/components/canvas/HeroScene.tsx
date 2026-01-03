'use client';

import { SceneWrapper, LightingSetup, CameraController, SceneEnvironment } from './index';
import { NeuralTree } from './NeuralTree';

/**
 * Hero scene with 3D neural tree
 *
 * Features:
 * - Interactive 3D neural tree
 * - Scroll-based growth animations
 * - Optimized particle system
 * - Smooth camera transitions
 */
export function HeroScene() {
  return (
    <SceneWrapper className="h-screen">
      <LightingSetup />
      <CameraController />
      <SceneEnvironment />
      <NeuralTree />
    </SceneWrapper>
  );
}
