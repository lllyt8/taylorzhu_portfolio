import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LandingPageSkeleton } from '../common/Skeleton';

/**
 * 功能演示组件 - 用于展示新增的功能
 * 这个组件可以用来测试和演示骨架屏、主题切换和语言切换功能
 */
const FeatureDemo: React.FC = () => {
  const { theme, actualTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showSkeleton, setShowSkeleton] = React.useState(false);

  const handleSkeletonDemo = () => {
    setShowSkeleton(true);
    setTimeout(() => setShowSkeleton(false), 3000);
  };

  if (showSkeleton) {
    return <LandingPageSkeleton />;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎯 LandingPage 新功能演示</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>🌙 主题系统</h2>
        <p>当前主题: {theme} (实际显示: {actualTheme})</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={() => setTheme('light')}>
            浅色模式
          </button>
          <button onClick={() => setTheme('dark')}>
            深色模式
          </button>
          <button onClick={() => setTheme('auto')}>
            自动模式
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🌍 语言系统</h2>
        <p>当前语言: {language}</p>
        <p>翻译示例: {t('landing.greeting')} {t('landing.name')}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={() => setLanguage('en')}>
            🇺🇸 English
          </button>
          <button onClick={() => setLanguage('zh')}>
            🇨🇳 简体中文
          </button>
          <button onClick={() => setLanguage('zh-HK')}>
            🇭🇰 繁體中文
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>💀 骨架屏演示</h2>
        <p>点击按钮查看骨架屏效果（3秒后自动消失）</p>
        <button onClick={handleSkeletonDemo}>
          🎭 显示骨架屏
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>📱 响应式测试</h2>
        <p>调整浏览器窗口大小来测试响应式设计</p>
        <ul>
          <li>桌面端: 三栏布局</li>
          <li>平板端: 两栏布局</li>
          <li>移动端: 单栏垂直布局</li>
        </ul>
      </div>

      <div style={{ 
        padding: '1rem', 
        background: 'var(--bg-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--border-primary)'
      }}>
        <h3>🎨 主题变量演示</h3>
        <p style={{ color: 'var(--text-primary)' }}>主要文字颜色</p>
        <p style={{ color: 'var(--text-secondary)' }}>次要文字颜色</p>
        <div style={{ 
          background: 'var(--primary-color)', 
          color: 'white', 
          padding: '0.5rem', 
          borderRadius: '4px',
          marginTop: '0.5rem'
        }}>
          主题色背景
        </div>
      </div>
    </div>
  );
};

export default FeatureDemo;
