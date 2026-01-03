import { useState, useEffect, useCallback } from 'react';
import { fetchGitHubUser } from '@/lib/github-api';
import type {
  GitHubUser,
  NormalizedContributionData,
  GitHubRepository
} from '@/types/github';

interface UseGithubDataOptions {
  username: string;
  token?: string;
  from?: Date;
  to?: Date;
  enabled?: boolean;
}

interface UseGithubDataReturn {
  user: GitHubUser | null;
  repositories: GitHubRepository[];
  contributions: NormalizedContributionData[];
  totalContributions: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and normalize GitHub contribution data
 *
 * Features:
 * - Fetches user profile and contribution data
 * - Normalizes contribution data for 3D terrain visualization
 * - Caches data to prevent unnecessary refetches
 * - Handles loading and error states
 * - Provides refetch functionality
 *
 * @param options - Hook configuration options
 * @returns GitHub data and state
 */
export function useGithubData(options: UseGithubDataOptions): UseGithubDataReturn {
  const { username, token, from, to, enabled = true } = options;

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [contributions, setContributions] = useState<NormalizedContributionData[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Normalize contribution data for 3D terrain
   * Converts GitHub contribution calendar to voxel terrain format
   */
  const normalizeContributions = useCallback(
    (data: GitHubUser): NormalizedContributionData[] => {
      const normalized: NormalizedContributionData[] = [];
      const { contributionCalendar } = data.contributionsCollection;

      contributionCalendar.weeks.forEach((week, weekIndex) => {
        week.contributionDays.forEach((day, dayIndex) => {
          if (day.contributionCount > 0) {
            normalized.push({
              date: day.date,
              x: weekIndex,
              y: dayIndex,
              z: day.contributionCount,
              color: day.color
            });
          }
        });
      });

      return normalized;
    },
    []
  );

  /**
   * Fetch GitHub data
   */
  const fetchData = useCallback(async () => {
    if (!enabled || !username) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchGitHubUser(username, token, from, to);
      const userData = response.user;

      setUser(userData);
      setRepositories(userData.repositories.nodes);
      setTotalContributions(
        userData.contributionsCollection.contributionCalendar.totalContributions
      );
      setContributions(normalizeContributions(userData));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch GitHub data'));
      console.error('GitHub data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [username, token, from, to, enabled, normalizeContributions]);

  /**
   * Refetch data
   */
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  /**
   * Fetch data on mount and when dependencies change
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    user,
    repositories,
    contributions,
    totalContributions,
    isLoading,
    error,
    refetch
  };
}

/**
 * Hook to get contribution statistics
 */
export function useGithubStats(options: UseGithubDataOptions) {
  const { user, isLoading, error } = useGithubData(options);

  const stats = {
    totalCommits: user?.contributionsCollection.totalCommitContributions || 0,
    totalIssues: user?.contributionsCollection.totalIssueContributions || 0,
    totalPullRequests:
      user?.contributionsCollection.totalPullRequestContributions || 0,
    totalReviews:
      user?.contributionsCollection.totalPullRequestReviewContributions || 0,
    totalRepositories: user?.repositories.nodes.length || 0,
    totalStars:
      user?.repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0) || 0,
    totalForks:
      user?.repositories.nodes.reduce((sum, repo) => sum + repo.forkCount, 0) || 0
  };

  return {
    stats,
    isLoading,
    error
  };
}

/**
 * Hook to get top repositories
 */
export function useTopRepositories(options: UseGithubDataOptions, limit: number = 6) {
  const { repositories, isLoading, error } = useGithubData(options);

  const topRepositories = repositories
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, limit);

  return {
    repositories: topRepositories,
    isLoading,
    error
  };
}
