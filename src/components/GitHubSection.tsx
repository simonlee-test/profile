'use client';

import { useState } from 'react';
import { SceneWrapper, LightingSetup, CameraController, SceneEnvironment } from './canvas';
import { GitHubTerrain, OptimizedGitHubTerrain } from './canvas/GitHubTerrain';
import { useGithubData } from '@/hooks/useGithubData';
import { LoadingSpinner } from './LoadingSpinner';
import type { NormalizedContributionData } from '@/types/github';

/**
 * GitHub Section Component
 *
 * Displays a 3D voxel terrain visualization of GitHub contributions.
 *
 * Features:
 * - Interactive 3D terrain with orbit controls
 * - Hover effects showing contribution details
 * - Click to view specific day information
 * - Optimized for large datasets
 * - Responsive design
 */
export function GitHubSection() {
  const [selectedDate, setSelectedDate] = useState<NormalizedContributionData | null>(null);
  const [useOptimized, setUseOptimized] = useState(false);

  // GitHub username - replace with your actual username
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'your-username';
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const { user, contributions, totalContributions, isLoading, error, refetch } = useGithubData({
    username,
    token: githubToken,
    enabled: true,
  });

  // Handle cube click
  const handleCubeClick = (data: NormalizedContributionData) => {
    setSelectedDate(data);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determine which terrain component to use based on data size
  const shouldUseOptimized = useOptimized || contributions.length > 500;

  return (
    <section id="github" className="relative min-h-screen py-20 px-4">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
          GitHub Contributions
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore my coding journey through an interactive 3D terrain visualization. Each cube
          represents a day of contributions, with height indicating activity level.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <h3 className="text-red-400 text-xl font-semibold mb-2">Failed to load GitHub data</h3>
            <p className="text-gray-400 mb-4">
              {error.message || 'An error occurred while fetching GitHub data'}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* GitHub Terrain */}
      {!isLoading && !error && contributions.length > 0 && (
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="flex justify-end mb-4 gap-4">
            <button
              onClick={() => setUseOptimized(!useOptimized)}
              className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              {useOptimized ? 'Use Interactive Mode' : 'Use Optimized Mode'}
            </button>
          </div>

          {/* 3D Scene */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-black/50 backdrop-blur-sm">
            <SceneWrapper className="h-[600px]">
              <LightingSetup />
              <CameraController />
              <SceneEnvironment />
              {shouldUseOptimized ? (
                <OptimizedGitHubTerrain
                  contributions={contributions}
                  totalContributions={totalContributions}
                  username={user?.login}
                />
              ) : (
                <GitHubTerrain
                  contributions={contributions}
                  totalContributions={totalContributions}
                  username={user?.login}
                  onCubeClick={handleCubeClick}
                />
              )}
            </SceneWrapper>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard
              label="Total Contributions"
              value={totalContributions.toLocaleString()}
              color="cyan"
            />
            <StatCard
              label="Commits"
              value={user?.contributionsCollection.totalCommitContributions.toLocaleString() || '0'}
              color="purple"
            />
            <StatCard
              label="Pull Requests"
              value={
                user?.contributionsCollection.totalPullRequestContributions.toLocaleString() || '0'
              }
              color="green"
            />
            <StatCard
              label="Code Reviews"
              value={
                user?.contributionsCollection.totalPullRequestReviewContributions.toLocaleString() ||
                '0'
              }
              color="orange"
            />
          </div>

          {/* Selected Date Info */}
          {selectedDate && (
            <div className="mt-8 bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">
                    {formatDate(selectedDate.date)}
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="text-gray-500">Contributions:</span>{' '}
                      <span className="text-cyan-400 font-semibold">{selectedDate.z}</span>
                    </p>
                    <p>
                      <span className="text-gray-500">Position:</span> Week {selectedDate.x + 1},
                      Day {selectedDate.y + 1}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && contributions.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="text-gray-400 text-lg mb-4">No contribution data available</div>
          <p className="text-gray-500">
            Make sure to set your GitHub username in the environment variables
          </p>
        </div>
      )}
    </section>
  );
}

/**
 * Stat Card Component
 */
interface StatCardProps {
  label: string;
  value: string;
  color: 'cyan' | 'purple' | 'green' | 'orange';
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-6 backdrop-blur-sm`}
    >
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
