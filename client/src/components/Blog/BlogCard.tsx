import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onSelect: () => void;
}

const BlogCard = ({ post, onSelect }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="blog-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      onClick={onSelect}
    >
      <div className="blog-card-image">
        <img src={post.coverImage} alt={post.title} />
        {post.collectionId && (
          <div className="collection-badge">
            <span>Part of a Collection</span>
          </div>
        )}
      </div>
      
      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="blog-date">{post.date}</span>
          <span className="blog-read-time">{post.readTime} min read</span>
        </div>
        
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        
        <div className="blog-tags">
          {post.tags.map(tag => (
            <span key={tag} className="blog-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
