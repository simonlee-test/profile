'use client';

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import HologramPrism from './HologramPrism';
import { useThemeStore } from '@/store/themeStore';
import { Project } from '@/components/Projects';

interface PortfolioGalleryProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function PortfolioGallery({ projects, onProjectClick }: PortfolioGalleryProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const theme = useThemeStore();

  const handleProjectHover = (projectId: string) => {
    setHoveredProject(projectId);
  };

  const handleProjectClick = (project: Project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <div className="w-full h-[600px] relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={1} />

        {/* Project Prisms */}
        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2;
          const radius = 5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <HologramPrism
              key={project.id}
              position={[x, 0, z]}
              scale={0.8}
              color={getCategoryColor(project.category)}
              hovered={hoveredProject === project.id}
              onClick={() => handleProjectClick(project)}
            />
          );
        })}
      </Canvas>

      {/* Project Info Overlay */}
      {hoveredProject && (
        <div
          className="absolute bottom-4 left-4 right-4 backdrop-blur-lg rounded-lg p-4 border-2"
          style={{
            backgroundColor:
              theme.theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderColor:
              theme.theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          {(() => {
            const project = projects.find((p) => p.id === hoveredProject);
            if (!project) return null;
            return (
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.theme.colors.text }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-2" style={{ color: theme.theme.colors.textSecondary }}>
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: theme.theme.colors.neonMint,
                        color: '#000000',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Web Development': '#00FFCC',
    'Mobile App': '#7000FF',
    'AI/ML': '#32CD32',
    DevOps: '#FF6B6B',
    Design: '#FFD93D',
    Other: '#6BCB77',
  };
  return colors[category] || '#00FFCC';
}
