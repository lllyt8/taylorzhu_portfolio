import React from 'react';
import { useTheme, Theme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Toggle from './Toggle';

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const themeOptions = [
    { value: 'light', label: t('theme.light') },
    { value: 'auto', label: t('theme.auto') },
    { value: 'dark', label: t('theme.dark') },
  ];

  return (
    <Toggle
      options={themeOptions}
      value={theme}
      onChange={(value) => setTheme(value as Theme)}
      size="sm"
      className="theme-switch"
    />
  );
};

export default ThemeSwitch;
