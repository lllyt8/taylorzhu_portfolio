// client/src/components/Admin/AdminBlogList.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogPosts, deletePost } from '../../services/api';
import BlogPostForm from './BlogPostForm';
import { BlogPost } from '../../types/blog';
import '../../styles/admin-blog.css';

type ViewMode = 'list' | 'new' | 'edit';

const AdminBlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete post');
      }
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setViewMode('edit');
  };

  const handleFormSuccess = () => {
    setViewMode('list');
    setSelectedPost(null);
    fetchPosts();
  };

  const filterPosts = () => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' ||
        post.categories.includes(filterCategory);
      
      return matchesSearch && matchesCategory;
    });
  };

  // 提取所有唯一的类别
  const allCategories = Array.from(
    new Set(posts.flatMap(post => post.categories))
  );

  if (viewMode === 'new') {
    return (
      <BlogPostForm
        onSuccess={handleFormSuccess}
        onCancel={() => setViewMode('list')}
      />
    );
  }

  if (viewMode === 'edit' && selectedPost) {
    return (
      <BlogPostForm
        initialData={selectedPost}
        onSuccess={handleFormSuccess}
        onCancel={() => setViewMode('list')}
      />
    );
  }

  return (
    <div className="admin-blog-list">
      <div className="admin-blog-header">
        <h1>Manage Blog Posts</h1>
        <button 
          onClick={() => setViewMode('new')} 
          className="new-post-btn"
        >
          Create New Post
        </button>
      </div>
      
      <div className="admin-blog-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <AnimatePresence>
          <div className="admin-blog-table">
            <div className="admin-blog-table-header">
              <div className="table-cell">Title</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Categories</div>
              <div className="table-cell">Featured</div>
              <div className="table-cell actions-cell">Actions</div>
            </div>
            
            <div className="admin-blog-table-body">
              {filterPosts().length > 0 ? (
                filterPosts().map(post => (
                  <motion.div
                    key={post.id}
                    className="admin-blog-table-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                  >
                    <div className="table-cell title-cell">
                      <span className="post-title">{post.title}</span>
                      <span className="post-excerpt">{post.excerpt.substring(0, 60)}...</span>
                    </div>
                    <div className="table-cell">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="table-cell categories-cell">
                      {post.categories.map(category => (
                        <span key={category} className="category-badge">{category}</span>
                      ))}
                    </div>
                    <div className="table-cell">
                      {post.featured ? (
                        <span className="featured-badge">Featured</span>
                      ) : (
                        <span className="not-featured">-</span>
                      )}
                    </div>
                    <div className="table-cell actions-cell">
                      <button 
                        onClick={() => handleEdit(post)} 
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)} 
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-posts-message">
                  No posts found. Try a different search or category filter.
                </div>
              )}
            </div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AdminBlogList;
