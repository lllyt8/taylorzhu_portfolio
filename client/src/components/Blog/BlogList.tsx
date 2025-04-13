import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { getBlogPosts } from '../../services/api';
import { BlogPost } from '../../types/blog';

interface BlogListProps {
  activeCategory: string;
  onSelectPost: (postId: string) => void;
}

const BlogList = ({ activeCategory, onSelectPost }: BlogListProps) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        
        if (activeCategory === 'all') {
          setFilteredPosts(posts);
        } else {
          setFilteredPosts(posts.filter((post: BlogPost) => 
            post.categories.includes(activeCategory)
          ));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [activeCategory]);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
