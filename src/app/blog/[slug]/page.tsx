import { Metadata } from 'next';
import BlogPostDetail from '@/components/BlogPostDetail';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Note: In a real app, you'd fetch the post data here to generate dynamic metadata
  // For now, we'll use static metadata
  return {
    title: 'Blog Post | Neural Digital Garden',
    description: 'Read the full article',
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <BlogPostDetail slug={params.slug} onBack={() => window.history.back()} />
    </div>
  );
}
