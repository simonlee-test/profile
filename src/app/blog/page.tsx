import { Metadata } from 'next';
import BlogSection from '@/components/BlogSection';

export const metadata: Metadata = {
  title: 'Blog | Neural Digital Garden',
  description: 'Thoughts, tutorials, and explorations in software development and technology',
};

export default function BlogPage() {
  return <BlogSection />;
}
