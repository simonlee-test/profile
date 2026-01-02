import { useEffect, useState, useCallback } from 'react';
import { useThemeStore } from '@/store/themeStore';

/**
 * Custom hook to track scroll position and direction
 *
 * Features:
 * - Debounced scroll updates
 * - Scroll direction detection
 * - Scroll progress calculation
 * - Section detection
 */
export function useScrollPosition() {
  const setScrollProgress = useThemeStore((state) => state.setScrollProgress);
  const setScrollDirection = useThemeStore((state) => state.setScrollDirection);
  const setCurrentSection = useThemeStore((state) => state.setCurrentSection);

  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;

    // Calculate scroll progress (0 to 1)
    const progress = Math.min(1, Math.max(0, currentScrollY / documentHeight));

    // Determine scroll direction
    const direction = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : null;

    // Update state
    setScrollY(currentScrollY);
    setLastScrollY(currentScrollY);
    setScrollProgress(progress);
    setScrollDirection(direction);

    // Detect current section based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= currentScrollY + windowHeight / 2 && rect.bottom >= currentScrollY + windowHeight / 2) {
        setCurrentSection(section.id);
      }
    });
  }, [lastScrollY, setScrollProgress, setScrollDirection, setCurrentSection]);

  useEffect(() => {
    // Add scroll event listener with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial calculation
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollY,
    scrollProgress: useThemeStore((state) => state.scrollProgress),
    scrollDirection: useThemeStore((state) => state.scrollDirection),
    currentSection: useThemeStore((state) => state.currentSection)
  };
}
