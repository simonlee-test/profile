'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { NormalizedContributionData } from '@/types/github';

interface GitHubTerrainProps {
  contributions: NormalizedContributionData[];
  totalContributions: number;
  username?: string;
  onCubeClick?: (data: NormalizedContributionData) => void;
}

interface VoxelCubeProps {
  position: [number, number, number];
  color: string;
  contributionCount: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
}

/**
 * Individual voxel cube representing a contribution day
 */
function VoxelCube({ position, color, contributionCount, onClick, onHover }: VoxelCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const scale = useMemo(() => {
    // Scale height based on contribution count (logarithmic scale for better visualization)
    const baseScale = 0.8;
    const heightScale = Math.log(contributionCount + 1) * 0.3;
    return [baseScale, baseScale, baseScale + heightScale] as [number, number, number];
  }, [contributionCount]);

  const materialColor = useMemo(() => {
    // Parse hex color and adjust brightness on hover
    const baseColor = new THREE.Color(color);
    if (hovered) {
      return baseColor.multiplyScalar(1.5);
    }
    return baseColor;
  }, [color, hovered]);

  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(false);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={materialColor}
        metalness={0.3}
        roughness={0.4}
        emissive={materialColor}
        emissiveIntensity={hovered ? 0.5 : 0.1}
      />
    </mesh>
  );
}

/**
 * GitHub Terrain Component
 *
 * Renders a 3D voxel terrain visualization of GitHub contributions.
 * Each cube represents a day of contributions, with height indicating activity level.
 *
 * Features:
 * - Instanced rendering for performance
 * - Interactive terrain with orbit controls
 * - Hover effects showing contribution details
 * - Click to view specific day information
 * - Optimized for large datasets
 */
export function GitHubTerrain({
  contributions,
  totalContributions,
  username,
  onCubeClick,
}: GitHubTerrainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedCube, setSelectedCube] = useState<NormalizedContributionData | null>(null);
  const [hoveredCube, setHoveredCube] = useState<NormalizedContributionData | null>(null);

  // Calculate terrain dimensions
  const terrainDimensions = useMemo(() => {
    if (contributions.length === 0) {
      return { width: 0, depth: 0, maxHeight: 0 };
    }

    const maxX = Math.max(...contributions.map((c) => c.x));
    const maxY = Math.max(...contributions.map((c) => c.y));
    const maxZ = Math.max(...contributions.map((c) => c.z));

    return {
      width: maxX + 1,
      depth: maxY + 1,
      maxHeight: maxZ,
    };
  }, [contributions]);

  // Center the terrain
  const centerOffset = useMemo(() => {
    return {
      x: -terrainDimensions.width / 2,
      y: -terrainDimensions.depth / 2,
    };
  }, [terrainDimensions]);

  // Animate terrain rotation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation when not interacting
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  // Handle cube click
  const handleCubeClick = (data: NormalizedContributionData) => {
    setSelectedCube(data);
    onCubeClick?.(data);
  };

  // Handle cube hover
  const handleCubeHover = (data: NormalizedContributionData | null) => {
    setHoveredCube(data);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <group ref={groupRef}>
      {/* Terrain Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />

      {/* Title */}
      <Text
        position={[0, terrainDimensions.maxHeight + 3, 0]}
        fontSize={0.8}
        color="#00FFCC"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {username ? `${username}'s Contributions` : 'GitHub Contributions'}
      </Text>

      {/* Stats */}
      <Text
        position={[0, terrainDimensions.maxHeight + 2, 0]}
        fontSize={0.4}
        color="#7000FF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        {totalContributions.toLocaleString()} Total Contributions
      </Text>

      {/* Voxel Cubes */}
      {contributions.map((contribution, index) => (
        <VoxelCube
          key={`${contribution.date}-${index}`}
          position={[
            contribution.x + centerOffset.x,
            contribution.z / 2, // Height based on contribution count
            contribution.y + centerOffset.y,
          ]}
          color={contribution.color}
          contributionCount={contribution.z}
          onClick={() => handleCubeClick(contribution)}
          onHover={(hovering) => handleCubeHover(hovering ? contribution : null)}
        />
      ))}

      {/* Hover Tooltip */}
      {hoveredCube && (
        <Html
          position={[
            hoveredCube.x + centerOffset.x,
            hoveredCube.z / 2 + 2,
            hoveredCube.y + centerOffset.y,
          ]}
        >
          <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 text-white shadow-lg">
            <div className="text-sm font-semibold text-cyan-400">
              {formatDate(hoveredCube.date)}
            </div>
            <div className="text-xs text-gray-300 mt-1">
              {hoveredCube.z} contribution{hoveredCube.z !== 1 ? 's' : ''}
            </div>
          </div>
        </Html>
      )}

      {/* Selected Cube Info Panel */}
      {selectedCube && (
        <Html
          position={[
            selectedCube.x + centerOffset.x,
            selectedCube.z / 2 + 3,
            selectedCube.y + centerOffset.y,
          ]}
        >
          <div className="bg-black/90 backdrop-blur-md border border-purple-500/50 rounded-lg p-4 text-white shadow-xl min-w-[200px]">
            <div className="text-lg font-bold text-purple-400 mb-2">
              {formatDate(selectedCube.date)}
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Contributions:</span>
                <span className="text-cyan-400 font-semibold">{selectedCube.z}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Position:</span>
                <span className="text-gray-300">
                  Week {selectedCube.x + 1}, Day {selectedCube.y + 1}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCube(null)}
              className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 px-4 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </Html>
      )}

      {/* Ground Plane */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[terrainDimensions.width + 2, terrainDimensions.depth + 2]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Grid Helper */}
      <gridHelper
        args={[
          Math.max(terrainDimensions.width, terrainDimensions.depth) + 2,
          20,
          '#00FFCC',
          '#1a1a1a',
        ]}
        position={[0, -0.49, 0]}
      />
    </group>
  );
}

/**
 * Optimized GitHub Terrain using InstancedMesh
 * For large datasets (1000+ contributions)
 */
interface OptimizedGitHubTerrainProps {
  contributions: NormalizedContributionData[];
  totalContributions: number;
  username?: string;
}

export function OptimizedGitHubTerrain({
  contributions,
  totalContributions,
  username,
}: OptimizedGitHubTerrainProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const terrainDimensions = useMemo(() => {
    if (contributions.length === 0) {
      return { width: 0, depth: 0, maxHeight: 0 };
    }

    const maxX = Math.max(...contributions.map((c) => c.x));
    const maxY = Math.max(...contributions.map((c) => c.y));
    const maxZ = Math.max(...contributions.map((c) => c.z));

    return {
      width: maxX + 1,
      depth: maxY + 1,
      maxHeight: maxZ,
    };
  }, [contributions]);

  const centerOffset = useMemo(() => {
    return {
      x: -terrainDimensions.width / 2,
      y: -terrainDimensions.depth / 2,
    };
  }, [terrainDimensions]);

  // Update instance matrices
  useEffect(() => {
    if (!meshRef.current) return;

    contributions.forEach((contribution, index) => {
      const scale = 0.8;
      const heightScale = Math.log(contribution.z + 1) * 0.3;

      dummy.position.set(
        contribution.x + centerOffset.x,
        contribution.z / 2,
        contribution.y + centerOffset.y
      );
      dummy.scale.set(scale, scale, scale + heightScale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(index, dummy.matrix);

      // Set color
      const color = new THREE.Color(contribution.color);
      meshRef.current!.setColorAt(index, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [contributions, centerOffset, dummy]);

  return (
    <group>
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />

      <Text
        position={[0, terrainDimensions.maxHeight + 3, 0]}
        fontSize={0.8}
        color="#00FFCC"
        anchorX="center"
        anchorY="middle"
      >
        {username ? `${username}'s Contributions` : 'GitHub Contributions'}
      </Text>

      <Text
        position={[0, terrainDimensions.maxHeight + 2, 0]}
        fontSize={0.4}
        color="#7000FF"
        anchorX="center"
        anchorY="middle"
      >
        {totalContributions.toLocaleString()} Total Contributions
      </Text>

      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, contributions.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={0.4}
          emissive="#00FFCC"
          emissiveIntensity={0.1}
        />
      </instancedMesh>

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[terrainDimensions.width + 2, terrainDimensions.depth + 2]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>

      <gridHelper
        args={[
          Math.max(terrainDimensions.width, terrainDimensions.depth) + 2,
          20,
          '#00FFCC',
          '#1a1a1a',
        ]}
        position={[0, -0.49, 0]}
      />
    </group>
  );
}
