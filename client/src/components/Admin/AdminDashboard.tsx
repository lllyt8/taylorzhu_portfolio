// client/src/components/Admin/AdminDashboard.tsx
// import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import AdminBlogList from './AdminBlogList';
import AdminProjectList from './AdminProjectList';
import AdminSettings from './AdminSettings'; // 需要创建这个组件
import AdminOverview from './AdminOverview'; // 需要创建这个组件
import '../../styles/admin-dashboard.css';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onExit();
  };

  const handleNavigation = (path: string) => {
    navigate(`/admin-dashboard/${path}`);
  };

  // 确定当前活动部分
  const getCurrentSection = () => {
    const path = window.location.pathname;
    if (path.includes('/admin-dashboard/blog')) return 'blog';
    if (path.includes('/admin-dashboard/projects')) return 'projects';
    if (path.includes('/admin-dashboard/settings')) return 'settings';
    return 'dashboard';
  };

  const activeSection = getCurrentSection();

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
            onClick={() => handleNavigation('')}
          >
            Dashboard
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'blog' ? 'active' : ''}`}
            onClick={() => handleNavigation('blog')}
          >
            Blog Manager
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => handleNavigation('projects')}
          >
            Projects
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavigation('settings')}
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
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/blog/*" element={<AdminBlogList />} />
          <Route path="/projects/*" element={<AdminProjectList />} />
          <Route path="/settings" element={<AdminSettings handleLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
