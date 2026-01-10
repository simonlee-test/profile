import BlogPostDetail from '@/components/BlogPostDetail';
import { useParams, useNavigate } from 'react-router-dom';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505]">
      <BlogPostDetail slug={slug || ''} onBack={() => navigate(-1)} />
    </div>
  );
}
