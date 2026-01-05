'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useBlogPosts, useBlogCategories, useBlogTags } from '@/hooks/useBlogData';
import type { BlogFilters } from '@/types/blog';
import { Search, Filter, Calendar, Clock, MessageCircle, Tag, ArrowRight } from 'lucide-react';

/**
 * BlogSection - Main blog section with filtering and search
 */
export default function BlogSection() {
  const [filters, setFilters] = useState<BlogFilters>({
    status: 'published',
    search: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { posts, loading, error } = useBlogPosts(filters);
  const { categories } = useBlogCategories();
  const { tags } = useBlogTags();

  // Update filters when selections change
  const activeFilters = useMemo<BlogFilters>(
    () => ({
      ...filters,
      category: selectedCategory || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    }),
    [filters, selectedCategory, selectedTags]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setFilters({ status: 'published', search: '' });
  };

  return (
    <section id="blog" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-neon-mint to-circuit-purple bg-clip-text text-transparent">
              Digital Garden
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and explorations in software development and technology
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="glass-panel rounded-2xl p-6">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={filters.search}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-mint/50 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {(selectedCategory || selectedTags.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-neon-mint/20 text-neon-mint text-xs rounded-full">
                    {selectedCategory ? 1 : 0} + {selectedTags.length}
                  </span>
                )}
              </button>

              {(selectedCategory || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        !selectedCategory
                          ? 'bg-neon-mint/20 text-neon-mint'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-neon-mint/20 text-neon-mint'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {category.name} ({category.post_count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.name)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedTags.includes(tag.name)
                            ? 'bg-circuit-purple/20 text-circuit-purple'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        #{tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-neon-mint/30 border-t-neon-mint rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-red-400">Failed to load blog posts. Please try again later.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-gray-400">No posts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * BlogPostCard - Individual blog post card
 */
function BlogPostCard({ post, index }: { post: any; index: number }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-panel rounded-2xl overflow-hidden hover:border-neon-mint/30 transition-all duration-300 group h-full flex flex-col"
      >
        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.is_featured && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-neon-mint/20 backdrop-blur-sm rounded-full">
                <span className="text-neon-mint text-xs font-semibold">Featured</span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {post.category_name && (
            <span className="inline-block px-3 py-1 bg-circuit-purple/20 text-circuit-purple text-xs rounded-full mb-3">
              {post.category_name}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-mint transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag: any) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md"
                >
                  <Tag className="w-3 h-3" />
                  {tag.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-gray-500 text-xs">+{post.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/10 mt-auto">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.reading_time} min read
              </span>
            </div>
            <span className="flex items-center gap-1 text-neon-mint group-hover:translate-x-1 transition-transform">
              <span>Read more</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
