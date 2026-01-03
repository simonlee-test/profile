import { useState, useEffect, useCallback } from 'react';
import type {
  BlogPost,
  BlogPostDetail,
  BlogCategory,
  BlogTag,
  BlogComment,
  BlogApiResponse,
  BlogFilters,
  BlogCommentFormData
} from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Custom hook to fetch blog posts
 */
export function useBlogPosts(filters?: BlogFilters) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.is_featured !== undefined) queryParams.append('is_featured', String(filters.is_featured));
      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.ordering) queryParams.append('ordering', filters.ordering);
      
      filters?.tags?.forEach(tag => queryParams.append('tags', tag));

      const url = `${API_URL}/blog/posts/?${queryParams.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BlogApiResponse<BlogPost> = await response.json();
      setPosts(data.results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
      console.error('Blog posts fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}

/**
 * Custom hook to fetch a single blog post
 */
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const url = `${API_URL}/blog/posts/${slug}/`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BlogPostDetail = await response.json();
      setPost(data);
      
      // Increment view count
      await fetch(`${API_URL}/blog/posts/${slug}/increment_view/`, { method: 'POST' });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch blog post'));
      console.error('Blog post fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error, refetch: fetchPost };
}

/**
 * Custom hook to fetch blog categories
 */
export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${API_URL}/blog/categories/`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogApiResponse<BlogCategory> = await response.json();
        setCategories(data.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog categories'));
        console.error('Blog categories fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

/**
 * Custom hook to fetch blog tags
 */
export function useBlogTags() {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${API_URL}/blog/tags/`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogApiResponse<BlogTag> = await response.json();
        setTags(data.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog tags'));
        console.error('Blog tags fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
}

/**
 * Custom hook to fetch featured posts
 */
export function useFeaturedPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${API_URL}/blog/posts/featured/`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch featured posts'));
        console.error('Featured posts fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { posts, loading, error };
}

/**
 * Custom hook to fetch popular posts
 */
export function usePopularPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${API_URL}/blog/posts/popular/`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch popular posts'));
        console.error('Popular posts fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return { posts, loading, error };
}

/**
 * Custom hook to fetch comments for a post
 */
export function useBlogComments(postSlug: string) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    if (!postSlug) return;

    setLoading(true);
    setError(null);

    try {
      const url = `${API_URL}/blog/posts/${postSlug}/comments/`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BlogComment[] = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
      console.error('Comments fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const submitComment = useCallback(async (commentData: BlogCommentFormData) => {
    try {
      const url = `${API_URL}/blog/posts/${postSlug}/comments/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh comments after submission
      await fetchComments();
      return true;
    } catch (err) {
      console.error('Comment submission error:', err);
      return false;
    }
  }, [postSlug, fetchComments]);

  return { comments, loading, error, refetch: fetchComments, submitComment };
}
