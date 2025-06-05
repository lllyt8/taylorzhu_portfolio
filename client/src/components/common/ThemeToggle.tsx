import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Theme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { value: Theme; icon: string; label: string }[] = [
    { value: 'light', icon: '☀️', label: t('theme.light') },
    { value: 'dark', icon: '🌙', label: t('theme.dark') },
    { value: 'auto', icon: '🔄', label: t('theme.auto') },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="theme-toggle">
      <motion.button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('theme.toggle')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="theme-icon" role="img" aria-hidden="true">
          {currentTheme.icon}
        </span>
        <span className="theme-label">{currentTheme.label}</span>
        <motion.span
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              className="theme-toggle-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* 下拉菜单 */}
            <motion.div
              className="theme-toggle-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {themes.map((themeOption) => (
                <motion.button
                  key={themeOption.value}
                  className={`theme-option ${theme === themeOption.value ? 'active' : ''}`}
                  onClick={() => handleThemeChange(themeOption.value)}
                  whileHover={{ backgroundColor: 'var(--theme-option-hover)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="theme-option-icon" role="img" aria-hidden="true">
                    {themeOption.icon}
                  </span>
                  <span className="theme-option-label">{themeOption.label}</span>
                  {theme === themeOption.value && (
                    <motion.span
                      className="theme-option-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
