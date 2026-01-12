import type {
  GitHubUser,
  NormalizedContributionData,
  GitHubRepository,
  GitHubContributionDay,
  GitHubContributionWeek
} from '@/types/github';

function generateContributionWeeks(): GitHubContributionWeek[] {
  const weeks: GitHubContributionWeek[] = [];
  const startDate = new Date('2024-01-01');
  
  for (let weekIndex = 0; weekIndex < 52; weekIndex++) {
    const contributionDays: GitHubContributionDay[] = [];
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const contributionCount = Math.floor(Math.random() * 15);
      const color = contributionCount === 0
        ? '#161b22'
        : contributionCount < 4
          ? '#0e4429'
            : contributionCount < 8
              ? '#26a641'
                : contributionCount < 12
                  ? '#39d353'
                    : '#006d32';
      
      contributionDays.push({
        date: new Date(startDate.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000).toISOString(),
        contributionCount,
        color,
      });
    }
    
    weeks.push({ contributionDays });
  }
  
  return weeks;
}

export const mockRepositories: GitHubRepository[] = [
  {
    name: 'neural-digital-garden',
    description: 'A high-performance, immersive personal portfolio website',
    url: 'https://github.com/simonlee/neural-digital-garden',
    stargazerCount: 156,
    forkCount: 23,
    primaryLanguage: {
      name: 'TypeScript',
      color: '#3178c6',
    },
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    name: 'react-three-portfolio',
    description: '3D portfolio built with React Three Fiber',
    url: 'https://github.com/simonlee/react-three-portfolio',
    stargazerCount: 89,
    forkCount: 12,
    primaryLanguage: {
      name: 'JavaScript',
      color: '#f1e05a',
    },
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    name: 'vite-starter-template',
    description: 'Production-ready Vite starter template',
    url: 'https://github.com/simonlee/vite-starter-template',
    stargazerCount: 234,
    forkCount: 45,
    primaryLanguage: {
      name: 'TypeScript',
      color: '#3178c6',
    },
    updatedAt: '2024-01-08T10:00:00Z',
  },
  {
    name: 'threejs-experiments',
    description: 'Experimental Three.js projects and demos',
    url: 'https://github.com/simonlee/threejs-experiments',
    stargazerCount: 67,
    forkCount: 8,
    primaryLanguage: {
      name: 'JavaScript',
      color: '#f1e05a',
    },
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    name: 'api-gateway',
    description: 'Microservices API gateway with rate limiting',
    url: 'https://github.com/simonlee/api-gateway',
    stargazerCount: 45,
    forkCount: 6,
    primaryLanguage: {
      name: 'Go',
      color: '#00ADD8',
    },
    updatedAt: '2024-01-12T10:00:00Z',
  },
  {
    name: 'design-system',
    description: 'Comprehensive design system with React components',
    url: 'https://github.com/simonlee/design-system',
    stargazerCount: 178,
    forkCount: 34,
    primaryLanguage: {
      name: 'TypeScript',
      color: '#3178c6',
    },
    updatedAt: '2024-01-14T10:00:00Z',
  },
];

export const mockGitHubUser: GitHubUser = {
  login: 'simonlee',
  name: 'Simon Lee',
  avatarUrl: '/images/branding/avatar-frame.svg',
  bio: 'Full Stack Developer passionate about building modern web applications',
  url: 'https://simonlee.dev',
  repositories: {
    nodes: mockRepositories,
  },
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: 1247,
      weeks: generateContributionWeeks(),
    },
    totalCommitContributions: 856,
    totalIssueContributions: 234,
    totalPullRequestContributions: 112,
    totalPullRequestReviewContributions: 45,
  },
};

export const mockContributions: NormalizedContributionData[] = (() => {
  const contributions: NormalizedContributionData[] = [];
  const weeks = generateContributionWeeks();
  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day, dayIndex) => {
      if (day.contributionCount > 0) {
        contributions.push({
          date: day.date,
          x: weekIndex,
          y: dayIndex,
          z: day.contributionCount,
          color: day.color,
        });
      }
    });
  });
  return contributions;
})();
