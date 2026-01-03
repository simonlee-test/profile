/**
 * GitHub contribution day data
 */
export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

/**
 * GitHub contribution week data
 */
export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

/**
 * GitHub contribution calendar data
 */
export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

/**
 * GitHub contributions collection data
 */
export interface GitHubContributionsCollection {
  contributionCalendar: GitHubContributionCalendar;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
}

/**
 * GitHub repository language data
 */
export interface GitHubRepositoryLanguage {
  name: string;
  color: string;
}

/**
 * GitHub repository data
 */
export interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: GitHubRepositoryLanguage | null;
  updatedAt: string;
}

/**
 * GitHub user data
 */
export interface GitHubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  url: string;
  repositories: {
    nodes: GitHubRepository[];
  };
  contributionsCollection: GitHubContributionsCollection;
}

/**
 * Normalized contribution data for 3D terrain
 */
export interface NormalizedContributionData {
  date: string;
  x: number; // Week index (0-51)
  y: number; // Day index (0-6)
  z: number; // Contribution count (height)
  color: string;
}

/**
 * GitHub data response
 */
export interface GitHubDataResponse {
  user: GitHubUser;
}
