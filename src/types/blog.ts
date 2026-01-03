/**
 * Blog category data
 */
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  post_count: number;
  created_at: string;
}

/**
 * Blog tag data
 */
export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  post_count: number;
  created_at: string;
}

/**
 * Blog post data (list view)
 */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author_name: string;
  category_name: string | null;
  tags: BlogTag[];
  excerpt: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  reading_time: number;
  view_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

/**
 * Blog post data (detail view)
 */
export interface BlogPostDetail extends BlogPost {
  author_email: string;
  category: BlogCategory | null;
  comments: BlogComment[];
}

/**
 * Blog comment data
 */
export interface BlogComment {
  id: number;
  post: number;
  author_name: string;
  author_name_display: string;
  author_email: string;
  content: string;
  parent: number | null;
  is_approved: boolean;
  replies: BlogComment[];
  created_at: string;
  updated_at: string;
}

/**
 * Blog API response
 */
export interface BlogApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Blog filters
 */
export interface BlogFilters {
  status?: 'draft' | 'published' | 'archived';
  category?: string;
  tags?: string[];
  is_featured?: boolean;
  search?: string;
  ordering?: string;
}

/**
 * Blog comment form data
 */
export interface BlogCommentFormData {
  author_name: string;
  author_email: string;
  content: string;
  parent?: number;
}
