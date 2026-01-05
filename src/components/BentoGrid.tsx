'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { BentoItem } from './BentoItem';
import { useInterests, useInterestCategories } from '@/hooks/useInterestsData';
import type { InterestFilters } from '@/types/interests';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * BentoGrid component for displaying interests in a bento box layout
 *
 * Features:
 * - Responsive grid layout
 * - Category filtering
 * - Search functionality
 * - Varied item sizes
 * - Hover animations
 * - Theme-aware colors
 */
export function BentoGrid() {
  const { theme } = useThemeStore();
  const [filters, setFilters] = useState<InterestFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const { data: interests, loading, error } = useInterests(filters);
  const { data: categories } = useInterestCategories();

  const themeColors = {
    light: {
      bg: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      accent: '#00FFCC',
      border: 'rgba(0, 0, 0, 0.1)',
      inputBg: 'rgba(255, 255, 255, 0.5)',
      inputBorder: 'rgba(0, 0, 0, 0.2)',
    },
    dark: {
      bg: '#050505',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: '#00FFCC',
      border: 'rgba(255, 255, 255, 0.1)',
      inputBg: 'rgba(0, 0, 0, 0.5)',
      inputBorder: 'rgba(255, 255, 255, 0.2)',
    },
  };

  const colors = themeColors[theme.mode as 'light' | 'dark'];

  const handleCategoryFilter = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? undefined : category,
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilters((prev) => ({
      ...prev,
      search: query || undefined,
    }));
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Interests & Passions
          </h2>
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Exploring the diverse areas that fuel my curiosity and creativity
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search interests..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.text,
              }}
            />
          </div>

          {/* Category Filters */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryFilter('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !filters.category ? 'opacity-100' : 'opacity-60'
                }`}
                style={{
                  backgroundColor: !filters.category ? colors.accent : colors.inputBg,
                  color: !filters.category ? '#000' : colors.text,
                }}
              >
                All
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filters.category === category.slug ? 'opacity-100' : 'opacity-60'
                  }`}
                  style={{
                    backgroundColor:
                      filters.category === category.slug
                        ? category.color || colors.accent
                        : colors.inputBg,
                    color: filters.category === category.slug ? '#000' : colors.text,
                  }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bento Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" text="Loading interests..." />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p style={{ color: colors.textSecondary }}>
              Failed to load interests. Please try again later.
            </p>
          </div>
        ) : interests.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: colors.textSecondary }}>
              No interests found matching your criteria.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          >
            {interests.map((interest, index) => (
              <BentoItem key={interest.id} interest={interest} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
