'use client';

import { Environment, Stars } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Environment setup for the Neural Digital Garden
 *
 * Features:
 * - HDRI environment map for realistic reflections
 * - Starfield background for depth
 * - Fog for atmospheric depth
 */
export function SceneEnvironment() {
  const { scene } = useThree();

  useEffect(() => {
    // Add atmospheric fog
    scene.fog = new THREE.Fog('#050505', 10, 50);

    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      {/* HDRI environment for realistic lighting and reflections */}
      <Environment preset="night" blur={0.8} />

      {/* Starfield background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
