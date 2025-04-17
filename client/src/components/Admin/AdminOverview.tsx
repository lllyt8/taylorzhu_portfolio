// client/src/components/Admin/AdminOverview.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts, getProjects } from '../../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    blogPosts: 0,
    projects: 0,
    featuredContent: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // 获取博客文章
        const posts = await getBlogPosts();
        
        // 获取项目
        const projects = await getProjects();
        
        // 计算统计信息
        const featuredContent = 
          posts.filter((post: { featured: boolean }) => post.featured).length + 
          projects.filter((project: { featured: boolean }) => project.featured).length;
        
        setStats({
          blogPosts: posts.length,
          projects: projects.length,
          featuredContent
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <div className="admin-dashboard-overview">
      <h2>Dashboard Overview</h2>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading statistics...</p>
        </div>
      ) : (
        <>
          <div className="admin-stats-grid">
            <motion.div 
              className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Blog Posts</h3>
              <p className="stat-number">{stats.blogPosts}</p>
            </motion.div>
            
            <motion.div 
              className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3>Projects</h3>
              <p className="stat-number">{stats.projects}</p>
            </motion.div>
            
            <motion.div 
              className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3>Featured Content</h3>
              <p className="stat-number">{stats.featuredContent}</p>
            </motion.div>
          </div>
          
          <div className="admin-quick-actions">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-btn" onClick={() => window.location.href = '/admin-dashboard/blog'}>
                Manage Blog
              </button>
              <button className="quick-action-btn" onClick={() => window.location.href = '/admin-dashboard/projects'}>
                Manage Projects
              </button>
              <button className="quick-action-btn" onClick={() => window.open('/', '_blank')}>
                View Website
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOverview;
