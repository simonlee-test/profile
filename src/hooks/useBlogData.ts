/**
 * Hook for fetching blog data from Django API
 */
import { useState, useEffect } from 'react';
import { BlogPost, BlogCategory, BlogTag, BlogFilters } from '@/types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function useBlogData(filters?: BlogFilters) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.tag) params.append('tags', filters.tag);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.featured) params.append('is_featured', 'true');

        // Fetch posts
        const postsResponse = await fetch(
          `${API_BASE_URL}/api/blog/posts/?${params.toString()}`
        );
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        setPosts(postsData.results || postsData);

        // Fetch categories
        const categoriesResponse = await fetch(`${API_BASE_URL}/api/blog/categories/`);
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.results || categoriesData);

        // Fetch tags
        const tagsResponse = await fetch(`${API_BASE_URL}/api/blog/tags/`);
        if (!tagsResponse.ok) throw new Error('Failed to fetch tags');
        const tagsData = await tagsResponse.json();
        setTags(tagsData.results || tagsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  return { posts, categories, tags, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}/`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setPost(data);

        // Increment view count
        await fetch(`${API_BASE_URL}/api/blog/posts/${slug}/increment_view/`, {
          method: 'POST',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}

export function useBlogComments(postSlug: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE_URL}/api/blog/posts/${postSlug}/comments/`
        );
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.results || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (postSlug) {
      fetchComments();
    }
  }, [postSlug]);

  return { comments, loading, error };
}
