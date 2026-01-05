/**
 * TypeScript types for Interests section
 */

export interface Interest {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  tags: string[];
  color?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  featured?: boolean;
  link?: string;
  image?: string;
}

export interface InterestCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface InterestFilters {
  category?: string;
  search?: string;
  tags?: string[];
}

export interface InterestApiResponse<T> {
  data: T[];
  count: number;
  next?: string;
  previous?: string;
}
