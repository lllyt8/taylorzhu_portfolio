import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { blogPosts } from '../../data/blog/blogData';
import { BlogPost } from '../../types/blog';

interface BlogListProps {
  activeCategory: string;
  onSelectPost: (postId: string) => void;
}

const BlogList = ({ activeCategory, onSelectPost }: BlogListProps) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => 
        post.categories.includes(activeCategory)
      ));
    }
  }, [activeCategory]);

  return (
    <div className="blog-grid">
      {filteredPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BlogCard 
            post={post} 
            onSelect={() => onSelectPost(post.id)}
          />
        </motion.div>
      ))}
      
      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <p>No posts found in this category. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
