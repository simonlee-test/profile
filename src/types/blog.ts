/**
 * Blog types for the Neural Digital Garden
 */

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  reading_time: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  category: BlogCategory;
  tags: BlogTag[];
  author?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface BlogComment {
  id: number;
  post: number;
  author_name: string;
  author_email: string;
  content: string;
  parent?: number;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  replies?: BlogComment[];
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
}
