/**
 * Custom hooks for interests data fetching
 */

import { useState, useEffect } from 'react';
import type { Interest, InterestCategory, InterestFilters, InterestApiResponse } from '@/types/interests';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.tags?.length) params.append('tags', filters.tags.join(','));

        const response = await fetch(`${API_BASE_URL}/interests/?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch interests');
        const result: InterestApiResponse<Interest> = await response.json();
        setData(result.data);
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
        const response = await fetch(`${API_BASE_URL}/interests/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch interest');
        const result: Interest = await response.json();
        setData(result);
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
        const response = await fetch(`${API_BASE_URL}/interests/categories/`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const result: InterestApiResponse<InterestCategory> = await response.json();
        setData(result.data);
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
        const response = await fetch(`${API_BASE_URL}/interests/featured/`);
        if (!response.ok) throw new Error('Failed to fetch featured interests');
        const result: InterestApiResponse<Interest> = await response.json();
        setData(result.data);
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
