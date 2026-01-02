# Neural Digital Garden Portfolio

A high-performance, immersive personal portfolio website fusing biological nature with cybernetic infrastructure using a "Neural Digital Garden" theme.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Git

## 🛠️ Tech Stack

### Frontend
- **Next.js 15+** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.3** - Type safety
- **Tailwind CSS 3.4** - Utility-first styling
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Drei** - React Three Fiber helpers
- **Framer Motion** - Animation library
- **GSAP** - Animation library
- **Zustand** - State management

### Backend (To be implemented)
- **Django REST Framework** - Python web framework
- **PostgreSQL** - Database

### External APIs
- **GitHub GraphQL API** - Contribution data

## 🎨 Design System

### Color Palette
- **Deep Obsidian:** `#050505` - Primary background
- **Neon Mint:** `#00FFCC` - Accent/Cyber elements
- **Circuit Purple:** `#7000FF` - Secondary accent
- **Bio-Green:** `#32CD32` - Nature/Organic elements

### Typography
- **Inter** - Sans-serif for UI elements
- **Playfair Display** - Serif for storytelling
- **JetBrains Mono** - Monospace for data/code

### UI Components
- Glassmorphism panels with frosted-glass effect
- Neon glow effects
- Smooth transitions and micro-interactions

## 📁 Project Structure

```
neural-digital-garden/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx
│   ├── components/         # React components
│   │   ├── canvas/        # 3D components (R3F)
│   │   ├── ui/            # 2D UI components
│   │   ├── shared/        # Shared components
│   │   └── layout/       # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand stores
│   ├── lib/               # Utility libraries
│   ├── styles/            # Global styles
│   └── types/             # TypeScript definitions
├── public/                # Static assets
├── plans/                 # Architecture documentation
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .prettierrc
├── .eslintrc.json
└── .gitignore
```

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
```

## 📚 Documentation

- [`plans/README.md`](plans/README.md) - Architecture documentation overview
- [`plans/architecture.md`](plans/architecture.md) - System architecture
- [`plans/directory-structure.md`](plans/directory-structure.md) - File organization
- [`plans/configurations.md`](plans/configurations.md) - Configuration files
- [`plans/threejs-scene-wrapper.md`](plans/threejs-scene-wrapper.md) - Three.js setup
- [`plans/state-management.md`](plans/state-management.md) - State management
- [`plans/django-models.md`](plans/django-models.md) - Django models
- [`plans/github-data-hook.md`](plans/github-data-hook.md) - GitHub integration
- [`plans/visual-assets.md`](plans/visual-assets.md) - Visual asset prompts
- [`plans/architectural-diagrams.md`](plans/architectural-diagrams.md) - System diagrams
- [`plans/implementation-guide.md`](plans/implementation-guide.md) - Implementation roadmap
- [`IMPLEMENTATION-STATUS.md`](IMPLEMENTATION-STATUS.md) - Current implementation status

## 🎯 Key Features

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

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file from `.env.local.example`:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

### Customization

Edit [`tailwind.config.js`](tailwind.config.js) to customize:
- Color palette
- Fonts
- Animations
- Glassmorphism effects

## 📊 Performance

- **Lighthouse Score:** Target > 90 on all metrics
- **3D Performance:** Smooth 60fps on modern devices
- **Bundle Size:** Optimized with code splitting
- **Image Optimization:** AVIF and WebP formats

## 🌐 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Heroku/Railway)
```bash
# Deploy Django backend
heroku create
git push heroku main
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

© 2026 Simon Lee. All Rights Reserved.

## 🙏️ Acknowledgments

- Next.js team for the amazing framework
- React Three Fiber community
- Three.js community
- All open-source libraries used

---

**Built with ❤️ using Next.js 15+ and Three.js**
