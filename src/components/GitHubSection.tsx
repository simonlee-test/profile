'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, GitPullRequest, AlertCircle, Star, GitFork } from 'lucide-react';
import { useGithubData, useGithubStats } from '@/hooks/useGithubData';
import { GitHubTerrain } from '@/components/canvas/GitHubTerrain';
import { LoadingSpinner } from '@/components/LoadingSpinner';

/**
 * Stat card component
 */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-6 rounded-lg">
      <div className={`${color} mb-3`}>{icon}</div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    </motion.div>
  );
}

/**
 * GitHub section component
 * Displays GitHub contribution terrain and statistics
 */
export function GitHubSection() {
  const [viewMode, setViewMode] = useState<'terrain' | 'stats'>('terrain');
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'your-username';
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const { contributions, isLoading, error } = useGithubData({
    username,
    token,
    enabled: true,
  });

  const { stats, isLoading: statsLoading } = useGithubStats({
    username,
    token,
    enabled: true,
  });

  if (isLoading || statsLoading) {
    return (
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center">
        <div className="glass-panel p-8 rounded-lg text-center">
          <Github size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">GitHub Data Unavailable</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error.message || 'Unable to fetch GitHub data. Please check your configuration.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-mint to-neon-purple bg-clip-text text-transparent">
            GitHub Activity
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my contribution history and coding activity through interactive visualizations
          </p>
        </motion.div>

        {/* View mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-panel p-1 rounded-lg inline-flex">
            <button
              onClick={() => setViewMode('terrain')}
              className={`px-6 py-2 rounded-md transition-all ${
                viewMode === 'terrain'
                  ? 'bg-neon-mint text-black font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              3D Terrain
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`px-6 py-2 rounded-md transition-all ${
                viewMode === 'stats'
                  ? 'bg-neon-mint text-black font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Statistics
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {viewMode === 'terrain' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[600px] rounded-lg overflow-hidden glass-panel"
          >
            <GitHubTerrain contributions={contributions} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <StatCard
              icon={<GitCommit size={24} />}
              label="Total Commits"
              value={stats.totalCommits}
              color="text-neon-mint"
            />
            <StatCard
              icon={<GitPullRequest size={24} />}
              label="Pull Requests"
              value={stats.totalPullRequests}
              color="text-neon-purple"
            />
            <StatCard
              icon={<AlertCircle size={24} />}
              label="Issues"
              value={stats.totalIssues}
              color="text-neon-pink"
            />
            <StatCard
              icon={<Github size={24} />}
              label="Repositories"
              value={stats.totalRepositories}
              color="text-neon-blue"
            />
            <StatCard
              icon={<Star size={24} />}
              label="Total Stars"
              value={stats.totalStars}
              color="text-yellow-400"
            />
            <StatCard
              icon={<GitFork size={24} />}
              label="Total Forks"
              value={stats.totalForks}
              color="text-neon-cyan"
            />
          </motion.div>
        )}

        {/* Total contributions summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="glass-panel p-6 rounded-lg inline-block">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Contributions (Last Year)</p>
            <p className="text-4xl font-bold text-neon-mint">{contributions.length}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
