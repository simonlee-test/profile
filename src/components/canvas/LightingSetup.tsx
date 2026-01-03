'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Optimized lighting setup for the Neural Digital Garden
 *
 * Features:
 * - Ambient lighting for base illumination
 * - Directional lights for shadows
 * - Point lights for neon glow effects
 * - Hemisphere light for natural color blending
 */
export function LightingSetup() {
  const { scene } = useThree();

  useEffect(() => {
    // Ambient light - soft base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Directional light - main light source with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Neon mint point light - cyber glow
    const neonMintLight = new THREE.PointLight(0x00ffcc, 2, 20);
    neonMintLight.position.set(-5, 5, 5);
    scene.add(neonMintLight);

    // Circuit purple point light - secondary glow
    const circuitPurpleLight = new THREE.PointLight(0x7000ff, 1.5, 15);
    circuitPurpleLight.position.set(5, 3, -5);
    scene.add(circuitPurpleLight);

    // Bio-green point light - organic glow
    const bioGreenLight = new THREE.PointLight(0x32cd32, 1, 10);
    bioGreenLight.position.set(0, -2, 3);
    scene.add(bioGreenLight);

    // Hemisphere light - natural sky/ground color blending
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x32cd32, 0.4);
    scene.add(hemisphereLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
      scene.remove(neonMintLight);
      scene.remove(circuitPurpleLight);
      scene.remove(bioGreenLight);
      scene.remove(hemisphereLight);
    };
  }, [scene]);

  return null;
}
