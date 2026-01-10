'use client';

import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh } from 'three';
import { useThemeStore } from '@/store/themeStore';
import { TextureLoader } from 'three';
import '@react-three/fiber';

interface HologramPrismProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  hovered?: boolean;
  onClick?: () => void;
}

export default function HologramPrism({
  position = [0, 0, 0],
  scale = 1,
  color,
  hovered = false,
  onClick,
}: HologramPrismProps) {
  const meshRef = useRef<Mesh>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const theme = useThemeStore();

  // Load hologram texture
  const hologramTexture = useLoader(TextureLoader, '/images/textures/hologram-prism.svg');

  const prismColor = color || (theme.theme.mode === 'dark' ? '#00FFCC' : '#7000FF');

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the prism
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;

      // Add floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;

      // Increase rotation speed when hovered
      if (hovered) {
        setRotationSpeed(0.02);
      } else {
        setRotationSpeed(0.005);
      }
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef} onClick={onClick}>
        {/* Create a hexagonal prism */}
        <cylinderGeometry args={[1, 1, 2, 6]} />
        <meshStandardMaterial
          map={hologramTexture}
          color={prismColor}
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          emissive={prismColor}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          side={2} // DoubleSide
        />
      </mesh>

      {/* Add wireframe overlay */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1.01, 1.01, 2.01, 6]} />
        <meshBasicMaterial color={prismColor} wireframe transparent opacity={0.5} />
      </mesh>

      {/* Add glowing edges */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1.02, 1.02, 2.02, 6]} />
        <meshBasicMaterial color={prismColor} transparent opacity={hovered ? 0.8 : 0.3} side={2} />
      </mesh>

      {/* Add floating particles around the prism */}
      {hovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 1.5,
                Math.sin((i / 8) * Math.PI * 2) * 1.5,
                Math.sin((i / 8) * Math.PI * 2) * 1.5,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color={prismColor} transparent opacity={0.8} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}
