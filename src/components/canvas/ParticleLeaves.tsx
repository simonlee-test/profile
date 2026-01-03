'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleLeavesProps {
  count?: number;
  radius?: number;
  colors?: string[];
}

/**
 * Particle leaves system for the neural tree
 *
 * Features:
 * - Floating particles
 * - Color variations
 * - Gentle animation
 * - Performance optimized
 */
export function ParticleLeaves({
  count = 100,
  radius = 5,
  colors = ['#00FFCC', '#7000FF', '#32CD32'],
}: ParticleLeavesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and colors
  const { positions, colors: particleColors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < count; i++) {
      // Random position within sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 1 / 3) * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.push(x, y, z);

      // Random color from palette
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      colors.push(color.r, color.g, color.b);
    }

    return { positions, colors };
  }, [count, radius, colors]);

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    return geo;
  }, [positions, particleColors]);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      // Gentle floating motion
      positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
