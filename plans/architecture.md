# Neural Digital Garden Portfolio - Architecture Plan

## Project Overview

A high-performance, immersive personal portfolio website fusing biological nature with cybernetic infrastructure using a "Neural Digital Garden" theme.

## Tech Stack

- **Frontend:** Next.js 15+ (App Router)
- **3D Engine:** Three.js + React Three Fiber (R3F) + Drei
- **Animation:** Framer Motion + GSAP
- **Styling:** Tailwind CSS (Glassmorphism design system)
- **Backend:** Django REST Framework (DRF)
- **Data:** GitHub GraphQL API

## Design System

### Color Palette

- **Deep Obsidian:** `#050505` - Primary background
- **Neon Mint:** `#00FFCC` - Accent/Cyber elements
- **Circuit Purple:** `#7000FF` - Secondary accent
- **Bio-Green:** `#32CD32` - Nature/Organic elements

### Typography

- **Monospace:** Data, code snippets, technical details
- **Serif:** Storytelling, narrative content
- **Sans-serif:** UI elements, navigation

### UI Components

- Transparent frosted-glass panels
- Glowing borders and shadows
- Smooth transitions and micro-interactions

## Component Architecture

### 1. The Hero (Neural Tree)

**Location:** `/components/canvas/HeroScene.tsx`

- Procedural 3D tree with fiber-optic trunk
- Glowing particle leaves
- Scroll-triggered growth/bloom animations
- Interactive camera controls

### 2. Professional Timeline (Root System)

**Location:** `/components/ui/Timeline.tsx`

- Vertical scroll section with SVG root connections
- Intersection Observer for reveal animations
- Career milestone cards with glassmorphism

### 3. Works Portfolio (3D Gallery)

**Location:** `/components/canvas/PortfolioGallery.tsx`

- Grid of project cards
- Hover-triggered 3D hologram prism previews
- Smooth camera transitions

### 4. GitHub Heatmap (Voxel Terrain)

**Location:** `/components/canvas/GitHubTerrain.tsx`

- 3D voxel terrain representation
- Height based on commit density
- Interactive terrain exploration

### 5. Blog & Interests (Archives)

**Location:** `/components/ui/BlogSection.tsx`

- DRF-powered blog with Markdown rendering
- Bento Box layout for interests
- Tag filtering and search

## System Architecture

### State Management

- **Zustand Store:** Global theme state, scroll position, camera sync
- **React Context:** Component-level state
- **Local State:** Component-specific interactions

### Performance Optimizations

- Three.js scene optimization (ToneMapping, Shadows, PixelRatio)
- Lazy loading for 3D components
- Code splitting for routes
- Image optimization with Next.js Image
- Debounced scroll handlers

### Data Flow

```
GitHub GraphQL API → useGithubData Hook → GitHubTerrain Component
Django DRF API → Blog Components → Markdown Rendering
Scroll Position → Theme Store → 3D Camera Updates
```

## Integration Points

- **Frontend-Backend:** REST API for blog content
- **External APIs:** GitHub GraphQL for contribution data
- **3D-2D Sync:** Shared state for camera/scroll coordination
