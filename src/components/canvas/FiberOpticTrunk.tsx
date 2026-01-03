'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FiberOpticTrunkProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  emissiveColor: string;
  thickness?: number;
}

/**
 * Fiber optic trunk with glowing cables
 *
 * Features:
 * - Glowing neon effect
 * - Animated pulse
 * - Metallic appearance
 */
export function FiberOpticTrunk({
  start,
  end,
  color,
  emissiveColor,
  thickness = 0.05,
}: FiberOpticTrunkProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create tube geometry from start to end
  const geometry = useMemo(() => {
    const curve = new THREE.LineCurve3(start, end);
    return new THREE.TubeGeometry(curve, 1, thickness, 8, false);
  }, [start, end, thickness]);

  // Animate glow pulse
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}
