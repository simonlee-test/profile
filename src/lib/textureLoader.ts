/**
 * Texture loading utilities for Three.js
 * Handles SVG to canvas conversion for texture support
 */

import * as THREE from 'three';

/**
 * Create a procedural texture for voxel terrain
 * @returns THREE.CanvasTexture
 */
export function createVoxelTerrainTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = 512;
  canvas.height = 512;

  // Create dark background
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, 512, 512);

  // Add grid pattern
  ctx.strokeStyle = 'rgba(0, 255, 204, 0.1)';
  ctx.lineWidth = 1;
  
  const gridSize = 32;
  for (let x = 0; x <= 512; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  
  for (let y = 0; y <= 512; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Add some random tech patterns
  ctx.fillStyle = 'rgba(112, 0, 255, 0.1)';
  for (let i = 0; i < 20; i++) {
    const x = Math.floor(Math.random() * 16) * gridSize;
    const y = Math.floor(Math.random() * 16) * gridSize;
    ctx.fillRect(x, y, gridSize, gridSize);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Load an SVG file and convert it to a canvas texture
 * @param url - Path to the SVG file
 * @returns Promise that resolves to a THREE.CanvasTexture
 */
export async function loadSvgTexture(url: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Set canvas size
      canvas.width = img.width || 512;
      canvas.height = img.height || 512;

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load SVG: ${url}`));
    };

    img.src = url;
  });
}

/**
 * Create a procedural texture for fiber optic cables
 * @returns THREE.CanvasTexture
 */
export function createFiberOpticTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = 512;
  canvas.height = 512;

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, '#00FFCC');
  gradient.addColorStop(0.5, '#7000FF');
  gradient.addColorStop(1, '#32CD32');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Add fiber optic lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(0, Math.random() * 512);
    ctx.bezierCurveTo(
      170, Math.random() * 512,
      340, Math.random() * 512,
      512, Math.random() * 512
    );
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Create a procedural texture for particles
 * @returns THREE.CanvasTexture
 */
export function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = 128;
  canvas.height = 128;

  // Create radial gradient for soft particle
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Create a procedural texture for hologram prisms
 * @returns THREE.CanvasTexture
 */
export function createHologramTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = 512;
  canvas.height = 512;

  // Create holographic gradient
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, 'rgba(0, 255, 204, 0.3)');
  gradient.addColorStop(0.25, 'rgba(112, 0, 255, 0.3)');
  gradient.addColorStop(0.5, 'rgba(50, 205, 50, 0.3)');
  gradient.addColorStop(0.75, 'rgba(112, 0, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 255, 204, 0.3)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Add holographic scan lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  
  for (let i = 0; i < 512; i += 8) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
