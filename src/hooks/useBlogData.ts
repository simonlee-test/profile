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
import { mockBlogPosts, mockBlogCategories, mockBlogTags, mockBlogComments, getMockBlogPostDetail } from '@/data/mockBlogData';

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredPosts = [...mockBlogPosts];
      
      if (filters?.status) {
        filteredPosts = filteredPosts.filter(p => p.status === filters.status);
      }
      if (filters?.category) {
        filteredPosts = filteredPosts.filter(p => p.category_name === filters.category);
      }
      if (filters?.is_featured !== undefined) {
        filteredPosts = filteredPosts.filter(p => p.is_featured === filters.is_featured);
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredPosts = filteredPosts.filter(p =>
          p.title.toLowerCase().includes(searchLower) ||
          p.excerpt.toLowerCase().includes(searchLower)
        );
      }
      if (filters?.tags && filters.tags.length > 0) {
        filteredPosts = filteredPosts.filter(p =>
          filters.tags!.some(tag => p.tags.some(t => t.name === tag))
        );
      }
      
      setPosts(filteredPosts);
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = getMockBlogPostDetail(slug);
      setPost(data);
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setCategories(mockBlogCategories);
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setTags(mockBlogTags);
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));
        setPosts(mockBlogPosts.filter(p => p.is_featured));
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));
        setPosts(mockBlogPosts.sort((a, b) => b.view_count - a.view_count).slice(0, 5));
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const post = mockBlogPosts.find(p => p.slug === postSlug);
      if (post) {
        setComments(mockBlogComments.filter(c => c.post === post.id));
      }
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add new comment to mock data
      const newComment: BlogComment = {
        id: mockBlogComments.length + 1,
        post: parseInt(postSlug),
        author_name: commentData.author_name,
        author_name_display: commentData.author_name,
        author_email: commentData.author_email,
        content: commentData.content,
        parent: commentData.parent || null,
        is_approved: true,
        replies: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      mockBlogComments.push(newComment);
      await fetchComments();
      return true;
    } catch (err) {
      console.error('Comment submission error:', err);
      return false;
    }
  }, [postSlug, fetchComments]);

  return { comments, loading, error, refetch: fetchComments, submitComment };
}
