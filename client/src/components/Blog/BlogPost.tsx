import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blog/blogData';
// import { blogCollections } from '../../data/blog/collectionsData';
import { BlogPost as BlogPostType } from '../../types/blog';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
  onViewCollection?: (collectionId: string) => void;
}

const BlogPost = ({ postId, onBack, onViewCollection }: BlogPostProps) => {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // 查找匹配的博客文章
    const foundPost = blogPosts.find(p => p.id === postId);
    
    if (foundPost) {
      setPost(foundPost);
    }
    
    setLoading(false);
  }, [postId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>Post not found</h2>
        <button onClick={onBack} className="back-button">Back to Blog</button>
      </div>
    );
  }

  const handleViewCollection = () => {
    if (post.collectionId && onViewCollection) {
      onViewCollection(post.collectionId);
    }
  };

  return (
    <motion.div 
      className="blog-post-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={onBack} className="back-button">
        &larr; Back to Blog
      </button>
      
      <div className="blog-post-header">
        <h1>{post.title}</h1>
        
        <div className="blog-post-meta">
          <span className="post-date">{post.date}</span>
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
        {/* 在实际应用中，这里会使用Markdown渲染器处理内容 */}
        <div dangerouslySetInnerHTML={{ __html: formatContent(post.content || '') }} />
      </div>
      
      {post.collectionId && (
        <div className="collection-navigation">
          <h3>This post is part of a collection</h3>
          <button onClick={handleViewCollection} className="view-collection-btn">
            View Complete Collection
          </button>
        </div>
      )}
    </motion.div>
  );
};

// 简单的内容格式化函数，将Markdown格式转换为HTML
// 在实际应用中，你可能需要使用一个完整的Markdown渲染库
function formatContent(content: string): string {
  // 简单的标题转换
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  
  // 段落处理
  content = content.replace(/^(?!<h[1-6]>)(.*$)/gim, '<p>$1</p>');
  content = content.replace(/<p><\/p>/gim, '');
  
  return content;
}

export default BlogPost;
