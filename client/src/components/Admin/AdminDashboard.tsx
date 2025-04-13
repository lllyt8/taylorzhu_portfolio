// client/src/components/Admin/AdminDashboard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import AdminBlogList from './AdminBlogList';
import '../../styles/admin-dashboard.css'; // 我们稍后会创建这个样式文件

interface AdminDashboardProps {
  onExit: () => void;
}

type AdminSection = 'dashboard' | 'blog' | 'projects' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onExit();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="admin-dashboard-overview">
            <h2>Dashboard Overview</h2>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <h3>Blog Posts</h3>
                <p className="stat-number">12</p>
              </div>
              <div className="admin-stat-card">
                <h3>Projects</h3>
                <p className="stat-number">8</p>
              </div>
              <div className="admin-stat-card">
                <h3>Messages</h3>
                <p className="stat-number">5</p>
              </div>
            </div>
            <div className="admin-recent-activity">
              <h3>Recent Activity</h3>
              <p>No recent activity to display.</p>
            </div>
          </div>
        );
      case 'blog':
        return <AdminBlogList />;
      case 'projects':
        return (
          <div className="admin-section-placeholder">
            <h2>Project Management</h2>
            <p>Project management functionality coming soon.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="admin-section-placeholder">
            <h2>Settings</h2>
            <p>Settings functionality coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h1>Admin Panel</h1>
          <div className="admin-user-info">
            <span>{user?.username || 'Admin'}</span>
          </div>
        </div>
        
        <nav className="admin-navigation">
          <button
            className={`admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveSection('blog')}
          >
            Blog Manager
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveSection('projects')}
          >
            Projects
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            Settings
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="admin-exit-button" onClick={onExit}>
            Exit to Site
          </button>
          <button className="admin-logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
