import type {
  BlogPost,
  BlogPostDetail,
  BlogCategory,
  BlogTag,
  BlogComment
} from '@/types/blog';

export const mockBlogCategories: BlogCategory[] = [
  { id: 1, name: 'Technology', slug: 'technology', description: 'Tech-related articles', post_count: 15, created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Development', slug: 'development', description: 'Software development topics', post_count: 25, created_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Design', slug: 'design', description: 'UI/UX design articles', post_count: 10, created_at: '2024-01-01T00:00:00Z' },
  { id: 4, name: 'Tutorial', slug: 'tutorial', description: 'Step-by-step guides', post_count: 8, created_at: '2024-01-01T00:00:00Z' },
];

export const mockBlogTags: BlogTag[] = [
  { id: 1, name: 'React', slug: 'react', post_count: 20, created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'TypeScript', slug: 'typescript', post_count: 15, created_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Three.js', slug: 'threejs', post_count: 8, created_at: '2024-01-01T00:00:00Z' },
  { id: 4, name: 'Vite', slug: 'vite', post_count: 5, created_at: '2024-01-01T00:00:00Z' },
  { id: 5, name: 'Web Development', slug: 'web-development', post_count: 30, created_at: '2024-01-01T00:00:00Z' },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Modern Web Applications with Vite',
    slug: 'building-modern-web-apps-with-vite',
    excerpt: 'Discover how Vite revolutionizes the development experience with lightning-fast HMR and optimized builds.',
    featured_image: '/images/placeholders/blog-featured-placeholder.svg',
    author_name: 'Simon Lee',
    category_name: 'Development',
    tags: [mockBlogTags[0], mockBlogTags[3], mockBlogTags[4]],
    status: 'published',
    is_featured: true,
    reading_time: 8,
    published_at: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    view_count: 1250,
    comment_count: 12,
  },
  {
    id: 2,
    title: 'Creating Immersive 3D Experiences with Three.js',
    slug: 'creating-immersive-3d-experiences',
    excerpt: 'Learn how to create stunning 3D web experiences using Three.js and React Three Fiber.',
    featured_image: '/images/textures/neural-network.svg',
    author_name: 'Simon Lee',
    category_name: 'Technology',
    tags: [mockBlogTags[2], mockBlogTags[4]],
    status: 'published',
    is_featured: true,
    reading_time: 12,
    published_at: '2024-01-10T10:00:00Z',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
    view_count: 980,
    comment_count: 8,
  },
  {
    id: 3,
    title: 'TypeScript Best Practices for Large Scale Applications',
    slug: 'typescript-best-practices',
    excerpt: 'Essential TypeScript patterns and practices for building maintainable large-scale applications.',
    featured_image: '/images/textures/circuit-board.svg',
    author_name: 'Simon Lee',
    category_name: 'Development',
    tags: [mockBlogTags[1], mockBlogTags[4]],
    status: 'published',
    is_featured: true,
    reading_time: 10,
    published_at: '2024-01-05T10:00:00Z',
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z',
    view_count: 1450,
    comment_count: 15,
  },
  {
    id: 4,
    title: 'Design Systems: Building Consistent UI at Scale',
    slug: 'design-systems-building-consistent-ui',
    excerpt: 'How to create and maintain a design system that scales with your product.',
    featured_image: '/images/textures/geometric-pattern.svg',
    author_name: 'Simon Lee',
    category_name: 'Design',
    tags: [mockBlogTags[4]],
    status: 'published',
    is_featured: false,
    reading_time: 7,
    published_at: '2024-01-01T10:00:00Z',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
    view_count: 890,
    comment_count: 6,
  },
  {
    id: 5,
    title: 'Getting Started with React Server Components',
    slug: 'getting-started-react-server-components',
    excerpt: 'A comprehensive guide to understanding and implementing React Server Components.',
    featured_image: '/images/textures/particle-field.svg',
    author_name: 'Simon Lee',
    category_name: 'Development',
    tags: [mockBlogTags[0], mockBlogTags[1]],
    status: 'published',
    is_featured: false,
    reading_time: 9,
    published_at: '2023-12-28T10:00:00Z',
    created_at: '2023-12-28T10:00:00Z',
    updated_at: '2023-12-28T10:00:00Z',
    view_count: 1120,
    comment_count: 9,
  },
];

export const mockBlogComments: BlogComment[] = [
  {
    id: 1,
    post: 1,
    author_name: 'Alex Chen',
    author_name_display: 'Alex Chen',
    author_email: 'alex@example.com',
    content: 'Great article! Vite has really improved my development workflow.',
    parent: null,
    is_approved: true,
    replies: [],
    created_at: '2024-01-16T14:30:00Z',
    updated_at: '2024-01-16T14:30:00Z',
  },
  {
    id: 2,
    post: 1,
    author_name: 'Sarah Johnson',
    author_name_display: 'Sarah Johnson',
    author_email: 'sarah@example.com',
    content: 'I especially appreciated the section on build optimization. Very helpful!',
    parent: null,
    is_approved: true,
    replies: [],
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z',
  },
  {
    id: 3,
    post: 2,
    author_name: 'Mike Thompson',
    author_name_display: 'Mike Thompson',
    author_email: 'mike@example.com',
    content: 'Three.js examples are always so inspiring. Thanks for sharing!',
    parent: null,
    is_approved: true,
    replies: [],
    created_at: '2024-01-11T16:45:00Z',
    updated_at: '2024-01-11T16:45:00Z',
  },
];

export const getMockBlogPostDetail = (slug: string): BlogPostDetail | null => {
  const post = mockBlogPosts.find(p => p.slug === slug);
  if (!post) return null;

  const comments = mockBlogComments.filter(c => c.post === post.id);
  const category = mockBlogCategories.find(c => c.name === post.category_name);

  return {
    ...post,
    content: `# ${post.title}\n\n${post.excerpt}\n\nThis is a comprehensive article about ${post.title}. It covers various aspects of the topic in detail.\n\n## Key Points\n\n- Point 1: Introduction to the concept\n- Point 2: Deep dive into implementation\n- Point 3: Best practices and patterns\n- Point 4: Real-world examples\n- Point 5: Conclusion and next steps\n\n## Conclusion\n\nThis article provides a solid foundation for understanding ${post.title}. By following these guidelines, you'll be able to implement similar solutions in your own projects.`,
    author_email: 'simon@example.com',
    category: category || null,
    comments,
  };
};
