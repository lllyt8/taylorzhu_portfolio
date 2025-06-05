import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language, LANGUAGES } from '../../contexts/LanguageContext';
import './LanguageSwitch.css';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(lang => lang.code === language) || LANGUAGES[0];

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const getLanguageFlag = (langCode: Language): string => {
    switch (langCode) {
      case 'en':
        return '🇺🇸';
      case 'zh':
        return '🇨🇳';
      case 'zh-HK':
        return '🇭🇰';
      default:
        return '🌐';
    }
  };

  return (
    <div className="language-switch">
      <motion.button
        className="language-switch-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('language.switch')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="language-flag" role="img" aria-hidden="true">
          {getLanguageFlag(language)}
        </span>
        <span className="language-label">{currentLanguage.nativeName}</span>
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
              className="language-switch-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* 下拉菜单 */}
            <motion.div
              className="language-switch-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {LANGUAGES.map((langOption) => (
                <motion.button
                  key={langOption.code}
                  className={`language-option ${language === langOption.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(langOption.code)}
                  whileHover={{ backgroundColor: 'var(--language-option-hover)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="language-option-flag" role="img" aria-hidden="true">
                    {getLanguageFlag(langOption.code)}
                  </span>
                  <div className="language-option-text">
                    <span className="language-option-native">{langOption.nativeName}</span>
                    <span className="language-option-english">{langOption.name}</span>
                  </div>
                  {language === langOption.code && (
                    <motion.span
                      className="language-option-check"
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

export default LanguageSwitch;
