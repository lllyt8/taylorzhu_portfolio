// client/src/components/Blog/BlogPost.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogPost } from '../../services/api';
import { BlogPost as BlogPostType } from '../../types/blog';

interface BlogPostProps {
  postId?: string; // 可选，兼容旧代码
  onBack?: () => void; // 可选，兼容旧代码
  onViewCollection?: (collectionId: string) => void; // 可选，兼容旧代码
}

const BlogPost = ({ postId: propPostId, onBack, onViewCollection }: BlogPostProps) => {
  const { id: paramPostId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = propPostId || paramPostId || '';

  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getBlogPost(postId);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/blog');
    }
  };

  const handleViewCollection = (collectionId: string) => {
    if (onViewCollection) {
      onViewCollection(collectionId);
    } else {
      navigate(`/blog/collection/${collectionId}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="not-found">
        <h2>{error || 'Post not found'}</h2>
        <button type="button" onClick={handleBack} className="back-button">Back to Blog</button>
      </div>
    );
  }

  return (
    <motion.div
      className="blog-post-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button type="button" onClick={handleBack} className="back-button">
        &larr; Back to Blog
      </button>

      {/* Rest of the component remains the same */}
      <div className="blog-post-header">
        <h1>{post.title}</h1>

        <div className="blog-post-meta">
          <span className="post-date">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="post-read-time">{post.readTime} min read</span>
        </div>

        <div className="blog-post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="post-tag">{tag}</span>
          ))}
        </div>
      </div>

      {post.coverImage && (
        <div className="blog-post-cover">
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      <div className="blog-post-content">
        <ReactMarkdown>{post.content || ''}</ReactMarkdown>
      </div>

      {post.collectionId && (
        <div className="collection-navigation">
          <h3>This post is part of a collection</h3>
          <button type="button" onClick={() => handleViewCollection(post.collectionId!)} className="view-collection-btn">
            View Complete Collection
          </button>
        </div>
      )}
    </motion.div>
  );
};

// 使用 ReactMarkdown 组件渲染 Markdown 内容，不再需要手动格式化

export default BlogPost;
