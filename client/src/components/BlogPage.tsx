import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogList from './Blog/BlogList';
import CollectionsList from './Blog/CollectionsList';
import '../styles/blog-page.css';

interface BlogPageProps {
  onSelectPost: (postId: string) => void;
  onSelectCollection: (collectionId: string) => void;
}

const BlogPage = ({ onSelectPost, onSelectCollection }: BlogPageProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', 'web', 'energy', 'architecture', 'performance'];

  return (
    <div className="blog-page">
      <motion.div 
        className="blog-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Thoughts on <span className="highlight">Tech & Energy</span></h1>
        <p className="subtitle">Exploring software engineering and energy storage solutions</p>
      </motion.div>

      <div className="filter-nav">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'all' ? 'All Posts' : category}
          </button>
        ))}
      </div>

      <BlogList 
        activeCategory={activeCategory} 
        onSelectPost={onSelectPost}
      />

      <CollectionsList onSelectCollection={onSelectCollection} />
    </div>
  );
};

export default BlogPage;
