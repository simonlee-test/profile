'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useThemeStore } from '@/store/themeStore';
import { useBlogPost, useBlogComments } from '@/hooks/useBlogData';
import type { BlogCommentFormData } from '@/types/blog';
import {
  Calendar,
  Clock,
  Eye,
  Share2,
  ArrowLeft,
  MessageSquare,
  Send,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostDetailProps {
  slug: string;
  onBack?: () => void;
}

export default function BlogPostDetail({ slug, onBack }: BlogPostDetailProps) {
  const { post, loading: postLoading, error: postError } = useBlogPost(slug);
  const { comments, loading: commentsLoading, submitComment } = useBlogComments(slug);
  const theme = useThemeStore();

  const [commentForm, setCommentForm] = useState<BlogCommentFormData>({
    author_name: '',
    author_email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(true);

  const themeColors = {
    light: {
      bg: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      accent: '#00FFCC',
      border: 'rgba(0, 0, 0, 0.1)',
      cardBg: 'rgba(255, 255, 255, 0.8)',
      codeBg: '#f5f5f5',
    },
    dark: {
      bg: '#050505',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: '#00FFCC',
      border: 'rgba(255, 255, 255, 0.1)',
      cardBg: 'rgba(0, 0, 0, 0.6)',
      codeBg: '#1a1a1a',
    },
  };

  const colors = themeColors[theme.theme.mode as 'light' | 'dark'];

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.author_name || !commentForm.author_email || !commentForm.content) {
      return;
    }

    setIsSubmitting(true);
    const success = await submitComment(commentForm);
    if (success) {
      setCommentForm({ author_name: '', author_email: '', content: '' });
    }
    setIsSubmitting(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Custom markdown components
  const MarkdownComponents: any = {
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" style={{ color: colors.text }} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl font-bold mt-6 mb-3" style={{ color: colors.text }} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-bold mt-4 mb-2" style={{ color: colors.text }} {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-4 leading-relaxed" style={{ color: colors.text }} {...props}>
        {children}
      </p>
    ),
    a: ({ href, children, ...props }: any) => (
      <a
        href={href}
        className="underline hover:no-underline"
        style={{ color: colors.accent }}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc space-y-2 mb-4 ml-6" style={{ color: colors.text }} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal space-y-2 mb-4 ml-6" style={{ color: colors.text }} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="ml-4" style={{ color: colors.text }} {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 pl-4 mb-4 italic"
        style={{ borderColor: colors.accent, color: colors.textSecondary }}
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: any) => (
      <code
        className="px-2 py-1 rounded font-mono text-sm"
        style={{ backgroundColor: colors.codeBg, color: colors.accent }}
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }: any) => (
      <pre
        className="p-4 rounded-lg mb-4 overflow-x-auto"
        style={{ backgroundColor: colors.codeBg }}
        {...props}
      >
        {children}
      </pre>
    ),
    img: ({ src, alt, ...props }: any) => (
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg my-4"
        loading="lazy"
        {...props}
      />
    ),
  };

  // Loading state
  if (postLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={48} style={{ color: colors.accent }} />
        </motion.div>
      </div>
    );
  }

  // Error state
  if (postError || !post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
            Post Not Found
          </h2>
          <p className="mb-6" style={{ color: colors.textSecondary }}>
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: colors.accent, color: '#000' }}
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onBack}
          className="flex items-center gap-2 mb-6 transition-colors hover:opacity-80"
          style={{ color: colors.textSecondary }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
            {post.title}
          </h1>

          {/* Meta Information */}
          <div
            className="flex flex-wrap items-center gap-4 mb-6"
            style={{ color: colors.textSecondary }}
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.reading_time} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.view_count} views</span>
            </div>
          </div>

          {/* Category */}
          {post.category && (
            <Link
              to={`/blog?category=${post.category.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 mb-6"
              style={{ backgroundColor: colors.accent, color: '#000' }}
            >
              {post.category.name}
            </Link>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/blog?tags=${tag.slug}`}
                  className="px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <Share2 size={18} />
            <span>Share</span>
          </motion.button>
        </motion.header>

        {/* Featured Image */}
        {post.featured_image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none"
          style={{ color: colors.text }}
        >
          <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
            Written by {post.author_name}
          </h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Published on {formatDate(post.published_at || post.created_at)}
          </p>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold flex items-center gap-2"
              style={{ color: colors.text }}
            >
              <MessageSquare size={24} />
              Comments ({post.comment_count})
            </h2>
            <button
              onClick={() => setShowComments(!showComments)}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              {showComments ? 'Hide' : 'Show'}
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: showComments ? 1 : 0, height: showComments ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentForm.author_name}
                  onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={commentForm.author_email}
                  onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                  required
                />
              </div>
              <textarea
                placeholder="Write your comment..."
                value={commentForm.content}
                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none mb-4"
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ backgroundColor: colors.accent, color: '#000' }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 size={20} />
                    </motion.div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Submit Comment</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Comments List */}
            {commentsLoading ? (
              <div
                className="flex items-center justify-center py-8"
                style={{ color: colors.textSecondary }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 size={32} />
                </motion.div>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-lg"
                    style={{
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold" style={{ color: colors.text }}>
                          {comment.author_name_display}
                        </h4>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                    </div>
                    <p style={{ color: colors.text }}>{comment.content}</p>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 ml-6 space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="p-4 rounded-lg"
                            style={{
                              backgroundColor: colors.bg,
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="font-bold text-sm" style={{ color: colors.text }}>
                                  {reply.author_name_display}
                                </h5>
                                <p className="text-xs" style={{ color: colors.textSecondary }}>
                                  {formatDate(reply.created_at)}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm" style={{ color: colors.text }}>
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: colors.textSecondary }}>
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
}
