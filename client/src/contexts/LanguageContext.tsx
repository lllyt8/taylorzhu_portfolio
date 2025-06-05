import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'zh' | 'zh-HK';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// 翻译数据类型
type TranslationData = Record<string, any>;

// 语言配置
export const LANGUAGES = [
  { code: 'en' as const, name: 'English', nativeName: 'English' },
  { code: 'zh' as const, name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-HK' as const, name: 'Chinese (Traditional)', nativeName: '繁體中文' },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 从 localStorage 读取保存的语言设置
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && LANGUAGES.some(lang => lang.code === savedLanguage)) {
      return savedLanguage;
    }
    
    // 检测浏览器语言
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('zh')) {
      if (browserLanguage.includes('hk') || browserLanguage.includes('tw')) {
        return 'zh-HK';
      }
      return 'zh';
    }
    
    return 'en'; // 默认英语
  });

  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);

  // 加载翻译文件
  const loadTranslations = async (lang: Language) => {
    try {
      setIsLoading(true);
      
      // 动态导入翻译文件
      const translationModule = await import(`../locales/${lang}.json`);
      setTranslations(translationModule.default || translationModule);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      
      // 如果加载失败，尝试加载英语作为后备
      if (lang !== 'en') {
        try {
          const fallbackModule = await import('../locales/en.json');
          setTranslations(fallbackModule.default || fallbackModule);
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError);
          setTranslations({});
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 设置语言
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    loadTranslations(newLanguage);
    
    // 设置 HTML lang 属性
    document.documentElement.lang = newLanguage;
  };

  // 翻译函数
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    // 深度查找翻译值
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回 key 本身
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string for key: ${key}`);
      return key;
    }
    
    // 参数替换
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };

  // 初始化加载翻译
  useEffect(() => {
    loadTranslations(language);
    document.documentElement.lang = language;
  }, []);

  const value = {
    language,
    setLanguage,
    t,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
