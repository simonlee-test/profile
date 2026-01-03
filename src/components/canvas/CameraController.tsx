'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useThemeStore } from '@/store/themeStore';
import * as THREE from 'three';

/**
 * Camera controller synchronized with scroll position
 *
 * Features:
 * - Smooth camera transitions
 * - Scroll-based camera movement
 * - Theme-aware camera positioning
 * - Performance-optimized frame updates
 */
export function CameraController() {
  const { camera } = useThree();
  const { scrollProgress } = useThemeStore();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 10));

  useFrame((state, delta) => {
    // Calculate target position based on scroll progress
    targetPosition.current.set(
      Math.sin(scrollProgress * Math.PI * 2) * 2,
      scrollProgress * 5 - 2.5,
      10 - scrollProgress * 3
    );

    // Smooth interpolation (LERP) for camera movement
    currentPosition.current.lerp(targetPosition.current, delta * 2);

    // Update camera position
    camera.position.copy(currentPosition.current);

    // Look at center of scene
    camera.lookAt(0, 0, 0);
  });

  return null;
}
