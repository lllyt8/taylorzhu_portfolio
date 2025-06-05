import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';
import './SettingsPanel.css';

interface SettingsPanelProps {
  className?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`settings-panel ${className}`}>
      {/* 设置按钮 */}
      <motion.button
        className="settings-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open settings"
        aria-expanded={isOpen}
      >
        <motion.span
          className="settings-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ⚙️
        </motion.span>
      </motion.button>

      {/* 设置面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              className="settings-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* 设置内容 */}
            <motion.div
              className="settings-content"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="settings-header">
                <h3>Settings</h3>
                <button
                  className="settings-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close settings"
                >
                  ✕
                </button>
              </div>
              
              <div className="settings-body">
                <div className="setting-group">
                  <label className="setting-label">
                    {t('theme.toggle')}
                  </label>
                  <ThemeToggle />
                </div>
                
                <div className="setting-group">
                  <label className="setting-label">
                    {t('language.switch')}
                  </label>
                  <LanguageSwitch />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPanel;
