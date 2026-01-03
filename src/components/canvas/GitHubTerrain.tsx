'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import type { NormalizedContributionData } from '@/types/github';
import { useThemeStore } from '@/store/themeStore';

interface VoxelProps {
  position: [number, number, number];
  color: string;
  height: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

/**
 * Individual voxel cube representing a contribution day
 */
function Voxel({ position, color, height, isHovered, onHover }: VoxelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const theme = useThemeStore((state) => state.theme);

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isHovered ? 0.5 : 0.1}
        transparent
        opacity={theme.mode === 'dark' ? 0.9 : 0.8}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

interface TerrainProps {
  contributions: NormalizedContributionData[];
  hoveredVoxel: string | null;
  onVoxelHover: (date: string | null) => void;
}

/**
 * Terrain grid of voxels
 */
function Terrain({ contributions, hoveredVoxel, onVoxelHover }: TerrainProps) {
  const theme = useThemeStore((state) => state.theme);

  const voxels = useMemo(() => {
    return contributions.map((contribution) => {
      const isHovered = hoveredVoxel === contribution.date;
      const height = Math.min(contribution.z * 0.5, 3); // Scale height, max 3 units

      return (
        <Voxel
          key={contribution.date}
          position={[contribution.x, height / 2, contribution.y]}
          color={contribution.color}
          height={height}
          isHovered={isHovered}
          onHover={(hovered) => onVoxelHover(hovered ? contribution.date : null)}
        />
      );
    });
  }, [contributions, hoveredVoxel, onVoxelHover]);

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[25, -0.1, 3]}>
        <planeGeometry args={[52, 8]} />
        <meshStandardMaterial
          color={theme.mode === 'dark' ? '#0a0a0a' : '#f0f0f0'}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Voxels */}
      {voxels}
    </group>
  );
}

interface GitHubTerrainProps {
  contributions: NormalizedContributionData[];
}

/**
 * GitHub contribution terrain visualization
 * Displays contribution data as a 3D voxel terrain
 */
export function GitHubTerrain({ contributions }: GitHubTerrainProps) {
  const [hoveredVoxel, setHoveredVoxel] = React.useState<string | null>(null);
  const theme = useThemeStore((state) => state.theme);

  const hoveredData = useMemo(() => {
    return contributions.find((c) => c.date === hoveredVoxel);
  }, [contributions, hoveredVoxel]);

  return (
    <div className="relative w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[25, 15, 15]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00FFCC" />

        {/* Terrain */}
        <Terrain
          contributions={contributions}
          hoveredVoxel={hoveredVoxel}
          onVoxelHover={setHoveredVoxel}
        />
      </Canvas>

      {/* Hover info overlay */}
      {hoveredData && (
        <div className="absolute top-4 right-4 glass-panel p-4 rounded-lg max-w-xs">
          <h3 className="text-lg font-bold mb-2">
            {new Date(hoveredData.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <p className="text-2xl font-bold text-neon-mint">{hoveredData.z} contributions</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-panel p-4 rounded-lg">
        <h4 className="text-sm font-bold mb-2">Contribution Levels</h4>
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded bg-[#ebedf0]" />
            <span className="text-xs mt-1">0</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded bg-[#9be9a8]" />
            <span className="text-xs mt-1">1-2</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded bg-[#40c463]" />
            <span className="text-xs mt-1">3-5</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded bg-[#30a14e]" />
            <span className="text-xs mt-1">6-9</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded bg-[#216e39]" />
            <span className="text-xs mt-1">10+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
