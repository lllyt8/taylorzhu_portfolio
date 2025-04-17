// client/src/components/Admin/AdminSettings.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSettingsProps {
  handleLogout: () => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ handleLogout }) => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 重置状态
    setPasswordError('');
    setPasswordSuccess('');
    
    // 验证新密码
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    // 这里应该有实际的密码更改逻辑
    // 为了简单起见，我们假装成功了
    setPasswordSuccess('Password changed successfully');
    
    // 重置表单
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  return (
    <div className="admin-settings">
      <h2>Account Settings</h2>
      
      <motion.div 
        className="admin-profile-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3>Account Information</h3>
        <div className="admin-profile-info">
          <div className="profile-item">
            <label>Username:</label>
            <span>{user?.username}</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>
          <div className="profile-item">
            <label>Role:</label>
            <span>{user?.role}</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="admin-profile-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3>Change Password</h3>
        
        {passwordError && (
          <div className="password-error">{passwordError}</div>
        )}
        
        {passwordSuccess && (
          <div className="password-success">{passwordSuccess}</div>
        )}
        
        <form className="password-form" onSubmit={handleChangePassword}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input 
              type="password" 
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="admin-button primary">Change Password</button>
          </div>
        </form>
      </motion.div>
      
      <motion.div 
        className="admin-profile-section danger-zone"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3>Security</h3>
        <p>You can securely log out of your account from all devices.</p>
        <div className="admin-action-buttons">
          <button className="admin-button danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
