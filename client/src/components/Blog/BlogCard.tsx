// 不再需要 useState
import { motion } from 'framer-motion';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onSelect: () => void;
}

const BlogCard = ({ post, onSelect }: BlogCardProps) => {
  // 移除未使用的状态

  return (
    <motion.div
      className="blog-card"
      // 使用 whileHover 就足够了，不需要额外的状态管理
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
          <span className="blog-date">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
