/**
 * Custom hooks for interests data fetching
 */

import { useState, useEffect } from 'react';
import type { Interest, InterestCategory, InterestFilters, InterestApiResponse } from '@/types/interests';
import { mockInterests, mockInterestCategories } from '@/data/mockInterestsData';

/**
 * Fetch all interests with optional filters
 */
export function useInterests(filters?: InterestFilters) {
  const [data, setData] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInterests() {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));
        
        let filteredData = [...mockInterests];
        
        if (filters?.category) {
          filteredData = filteredData.filter(i => i.category === filters.category);
        }
        if (filters?.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(i =>
            i.title.toLowerCase().includes(searchLower) ||
            i.description.toLowerCase().includes(searchLower)
          );
        }
        if (filters?.tags && filters.tags.length > 0) {
          filteredData = filteredData.filter(i =>
            filters.tags!.some(tag => i.tags.includes(tag))
          );
        }
        
        setData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchInterests();
  }, [filters]);

  return { data, loading, error };
}

/**
 * Fetch a single interest by ID
 */
export function useInterest(id: string) {
  const [data, setData] = useState<Interest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInterest() {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const result = mockInterests.find(i => i.id === id);
        setData(result || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchInterest();
    }
  }, [id]);

  return { data, loading, error };
}

/**
 * Fetch all interest categories
 */
export function useInterestCategories() {
  const [data, setData] = useState<InterestCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setData(mockInterestCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { data, loading, error };
}

/**
 * Fetch featured interests
 */
export function useFeaturedInterests() {
  const [data, setData] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));
        setData(mockInterests.filter(i => i.featured));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return { data, loading, error };
}
