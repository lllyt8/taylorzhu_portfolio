import React from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import Toggle from './Toggle';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languageOptions = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中' },
    { value: 'zh-HK', label: '繁' },
  ];

  return (
    <Toggle
      options={languageOptions}
      value={language}
      onChange={(value) => setLanguage(value as Language)}
      size="sm"
      className="language-toggle"
    />
  );
};

export default LanguageToggle;
