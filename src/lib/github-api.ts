import { GraphQLClient } from 'graphql-request';
import type { GitHubDataResponse } from '@/types/github';

/**
 * GitHub GraphQL API client
 */
const GITHUB_API_URL = 'https://api.github.com/graphql';

/**
 * Create GraphQL client with authentication
 */
export function createGitHubClient(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return new GraphQLClient(GITHUB_API_URL, { headers });
}

/**
 * GitHub GraphQL queries
 */
export const GITHUB_QUERIES = {
  getUserContributions: `
    query GetUserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        login
        name
        avatarUrl
        bio
        url
        repositories(first: 100, ownerAffiliations: [OWNER], orderBy: {direction: DESC, field: STARGAZERS}) {
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            updatedAt
          }
        }
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
        }
      }
    }
  `
};

/**
 * Fetch user data from GitHub
 */
export async function fetchGitHubUser(
  username: string,
  token?: string,
  from?: Date,
  to?: Date
) {
  const client = createGitHubClient(token);

  // Default to last year of contributions
  const defaultFrom = new Date();
  defaultFrom.setFullYear(defaultFrom.getFullYear() - 1);
  const defaultTo = new Date();

  const variables = {
    username,
    from: (from || defaultFrom).toISOString(),
    to: (to || defaultTo).toISOString()
  };

  try {
    const data = await client.request<GitHubDataResponse>(
      GITHUB_QUERIES.getUserContributions,
      variables
    );
    return data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}
