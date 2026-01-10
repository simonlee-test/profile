'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useThemeStore } from '@/store/themeStore';
import * as THREE from 'three';
import { TextureLoader } from 'three';

/**
 * Neural Tree component with procedural generation
 *
 * Features:
 * - Procedural tree generation
 * - Fiber optic trunk with glowing cables
 * - Particle leaves system
 * - Scroll-triggered growth animations
 */
export function NeuralTree() {
  const { scrollProgress, isAnimating } = useThemeStore();
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Load textures
  const fiberOpticTexture = useLoader(TextureLoader, '/images/textures/fiber-optic-trunk.svg');
  const particleTexture = useLoader(TextureLoader, '/images/textures/particle-leaves.svg');

  // Generate tree structure
  const { branches, particles } = useMemo(() => {
    const branches: THREE.Vector3[][] = [];
    const particlePositions: number[] = [];
    const particleColors: number[] = [];

    // Generate main trunk and branches
    const generateBranch = (
      start: THREE.Vector3,
      direction: THREE.Vector3,
      length: number,
      depth: number
    ) => {
      if (depth === 0) return;

      const end = start.clone().add(direction.clone().multiplyScalar(length));
      branches.push([start, end]);

      // Generate sub-branches
      const numBranches = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < numBranches; i++) {
        const angle = (Math.PI * 2 * i) / numBranches + Math.random() * 0.5;
        const newDirection = direction
          .clone()
          .applyAxisAngle(new THREE.Vector3(0, 1, 0), angle)
          .multiplyScalar(0.7);
        generateBranch(end, newDirection, length * 0.7, depth - 1);
      }

      // Add particles at branch ends
      if (depth === 1) {
        for (let i = 0; i < 5; i++) {
          const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          );
          const pos = end.clone().add(offset);
          particlePositions.push(pos.x, pos.y, pos.z);

          // Random colors from theme
          const colors = [
            [0, 1, 0.8], // Neon mint
            [0.44, 0, 1], // Circuit purple
            [0.2, 0.8, 0.2], // Bio green
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          particleColors.push(...color);
        }
      }
    };

    // Start tree generation
    generateBranch(new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 1, 0), 3, 4);

    return { branches, particles: { positions: particlePositions, colors: particleColors } };
  }, []);

  // Create branch geometries
  const branchGeometries = useMemo(() => {
    return branches.map((branch) => {
      const curve = new THREE.CatmullRomCurve3(branch);
      return new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
    });
  }, [branches]);

  // Create particle geometry
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(particles.positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(particles.colors, 3));
    return geometry;
  }, [particles]);

  // Animate tree growth based on scroll
  useFrame((state, delta) => {
    if (!groupRef.current || !isAnimating) return;

    // Scale tree based on scroll progress
    const scale = Math.min(1, scrollProgress * 2);
    groupRef.current.scale.setScalar(scale);

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Fiber optic trunk and branches */}
      {branchGeometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry}>
          <meshStandardMaterial
            map={fiberOpticTexture}
            color={index % 3 === 0 ? '#00FFCC' : index % 3 === 1 ? '#7000FF' : '#32CD32'}
            emissive={index % 3 === 0 ? '#00FFCC' : index % 3 === 1 ? '#7000FF' : '#32CD32'}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Particle leaves */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          map={particleTexture}
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
