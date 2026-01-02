# Neural Digital Garden Portfolio - Architecture Plans

## Overview

This directory contains comprehensive architectural plans for building an immersive, high-performance personal portfolio website with a "Neural Digital Garden" theme - a fusion of biological nature and cybernetic infrastructure.

## Documentation Structure

### Core Architecture

- **[`architecture.md`](architecture.md)** - Overall system architecture, tech stack, and component specifications
- **[`directory-structure.md`](directory-structure.md)** - Complete project directory structure for Next.js + Django monorepo
- **[`implementation-guide.md`](implementation-guide.md)** - Phased implementation roadmap with 14 detailed phases

### Configuration Files

- **[`configurations.md`](configurations.md)** - All configuration files (package.json, tsconfig.json, tailwind.config.js, etc.)

### Technical Specifications

- **[`threejs-scene-wrapper.md`](threejs-scene-wrapper.md)** - Three.js scene wrapper with performance optimizations
- **[`state-management.md`](state-management.md)** - Zustand store architecture for global state management
- **[`django-models.md`](django-models.md)** - Django REST Framework models, serializers, and views
- **[`github-data-hook.md`](github-data-hook.md)** - Custom hook for GitHub GraphQL API integration

### Visual Assets

- **[`visual-assets.md`](visual-assets.md)** - 18 detailed image generation prompts for all required visual assets

### System Diagrams

- **[`architectural-diagrams.md`](architectural-diagrams.md)** - 14 Mermaid diagrams covering system architecture, data flow, and more

## Tech Stack

### Frontend

- **Framework:** Next.js 15+ (App Router)
- **3D Engine:** Three.js with React Three Fiber (R3F) and Drei
- **Animation:** Framer Motion and GSAP
- **Styling:** Tailwind CSS with Glassmorphism design system
- **State Management:** Zustand

### Backend

- **Framework:** Django REST Framework (DRF)
- **Database:** PostgreSQL
- **API:** RESTful API for blog/CMS management

### External APIs

- **GitHub GraphQL API** - Live contribution metrics

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

## Key Features

### 1. Hero Section (Neural Tree)

- Procedural 3D tree with fiber-optic trunk
- Glowing particle leaves
- Scroll-triggered growth animations
- Interactive camera controls

### 2. Professional Timeline (Root System)

- Vertical scroll section with SVG root connections
- Intersection Observer for reveal animations
- Career milestone cards with glassmorphism

### 3. Works Portfolio (3D Gallery)

- Grid of project cards
- Hover-triggered 3D hologram prism previews
- Smooth camera transitions

### 4. GitHub Heatmap (Voxel Terrain)

- 3D voxel terrain representation
- Height based on commit density
- Interactive terrain exploration

### 5. Blog & Interests (Archives)

- DRF-powered blog with Markdown rendering
- Bento Box layout for interests
- Tag filtering and search

## Performance Optimizations

- Adaptive pixel ratio for device performance
- Lazy loading for 3D components
- Code splitting for routes
- Image optimization with Next.js Image
- Debounced scroll handlers
- Performance monitoring and degradation

## Implementation Phases

1. **Project Setup** - Foundation and environment
2. **State Management** - Global state and utilities
3. **Three.js Infrastructure** - 3D scene foundation
4. **Hero Section** - Neural tree implementation
5. **Timeline Section** - Professional timeline
6. **Portfolio Gallery** - 3D gallery with holograms
7. **GitHub Integration** - Voxel terrain
8. **Django Backend** - Blog/CMS setup
9. **Blog Section** - Blog functionality
10. **Interests Section** - Bento Box layout
11. **UI Components** - Navigation and polish
12. **Visual Assets** - Asset generation and integration
13. **Testing & Optimization** - Quality assurance
14. **Deployment** - Production deployment

## Getting Started

1. Review the [`architecture.md`](architecture.md) for an overview
2. Check the [`implementation-guide.md`](implementation-guide.md) for the phased approach
3. Examine [`directory-structure.md`](directory-structure.md) for file organization
4. Use [`configurations.md`](configurations.md) to set up the project
5. Follow the implementation phases in order

## Visual Assets

All required visual assets have been documented with detailed generation prompts in [`visual-assets.md`](visual-assets.md). Each prompt includes:

- Asset type and description
- Theme keywords
- Artistic style
- Specific colors and aspect ratios
- Mood and atmosphere

## Architecture Diagrams

The [`architectural-diagrams.md`](architectural-diagrams.md) contains 14 Mermaid diagrams covering:

- System architecture
- Component hierarchy
- Data flow
- State management
- Three.js scene organization
- API integration
- Scroll-based interactions
- Component lifecycle
- Performance optimization
- Deployment architecture
- Security layers
- Error handling
- Testing strategy
- Accessibility implementation

## Success Criteria

- **Performance:** Lighthouse score > 90 on all metrics
- **Accessibility:** WCAG 2.1 AA compliance
- **Responsiveness:** Works on mobile, tablet, and desktop
- **3D Performance:** Smooth 60fps on modern devices
- **SEO:** Optimized meta tags and structured data
- **Code Quality:** TypeScript strict mode, comprehensive tests

## Next Steps

1. Review all documentation
2. Approve the architecture plan
3. Begin Phase 1: Project Setup
4. Follow the implementation guide sequentially
5. Test and optimize at each phase

## Questions?

Refer to the specific documentation files for detailed information about each aspect of the architecture. Each document is self-contained and provides comprehensive specifications for implementation.

---

**© 2026 Neural Digital Garden Portfolio. All Rights Reserved.**
