'use client';

import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import * as THREE from 'three';

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * High-performance Three.js scene wrapper with optimizations
 *
 * Features:
 * - Adaptive pixel ratio for performance
 * - Performance monitoring and degradation
 * - Tone mapping for realistic lighting
 * - Shadow optimization
 * - Suspense boundary for loading states
 */
export function SceneWrapper({ children, className = '' }: SceneWrapperProps) {
  const [dpr, setDpr] = useState(1.5);
  const { theme } = useThemeStore();

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        shadows={{
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        }}
        camera={{
          position: [0, 0, 10],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(theme.colors.background);
        }}
      >
        <AdaptiveDpr pixelated={false} />
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
