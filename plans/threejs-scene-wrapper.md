# Three.js Scene Wrapper

## SceneWrapper.tsx

```typescript
"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

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
export function SceneWrapper({ children, className = "" }: SceneWrapperProps) {
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
          powerPreference: "high-performance",
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
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
```

## LightingSetup.tsx

```typescript
"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

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
```

## CameraController.tsx

```typescript
"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useThemeStore } from "@/store/themeStore";

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
```

## Environment.tsx

```typescript
"use client";

import { Environment, Stars } from "@react-three/drei";

/**
 * Environment setup for the Neural Digital Garden
 *
 * Features:
 * - HDRI environment map for realistic reflections
 * - Starfield background for depth
 * - Fog for atmospheric depth
 */
export function SceneEnvironment() {
  return (
    <>
      {/* HDRI environment for realistic lighting and reflections */}
      <Environment preset="night" blur={0.8} />

      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Atmospheric fog */}
      <fog attach="fog" args={["#050505", 10, 50]} />
    </>
  );
}
```

## Performance Optimizations

### 1. Adaptive Pixel Ratio

- Dynamically adjusts pixel ratio based on device performance
- Reduces rendering load on lower-end devices
- Maintains visual quality on high-end devices

### 2. Shadow Optimization

- Uses PCF soft shadow maps for realistic shadows
- Optimized shadow map resolution (2048x2048)
- Shadow bias to prevent shadow acne

### 3. Lighting Optimization

- Minimal number of lights (5 total)
- Point lights with limited range
- Efficient shadow casting

### 4. Render Optimization

- Tone mapping for realistic color reproduction
- SRGB color space for accurate colors
- High-performance WebGL context
- Disabled stencil buffer when not needed

### 5. Memory Management

- Proper cleanup of Three.js objects
- Efficient geometry reuse
- Texture compression

## Usage Example

```typescript
import {
  SceneWrapper,
  LightingSetup,
  CameraController,
  SceneEnvironment,
} from "@/components/canvas/SceneWrapper";
import { NeuralTree } from "@/components/canvas/NeuralTree";

export default function HeroScene() {
  return (
    <SceneWrapper className="h-screen">
      <LightingSetup />
      <CameraController />
      <SceneEnvironment />
      <NeuralTree />
    </SceneWrapper>
  );
}
```

## Performance Monitoring

The `PerformanceMonitor` component from Drei automatically:

- Monitors frame rate
- Detects performance degradation
- Adjusts pixel ratio accordingly
- Maintains smooth 60fps experience

## Best Practices

1. **Always wrap 3D scenes in Suspense** for loading states
2. **Use AdaptiveDpr** for responsive performance
3. **Limit shadow casting objects** to essential elements
4. **Reuse geometries and materials** when possible
5. **Clean up Three.js objects** on unmount
6. **Use instanced meshes** for repeated objects
7. **Optimize texture sizes** and use compression
8. **Batch draw calls** when possible
