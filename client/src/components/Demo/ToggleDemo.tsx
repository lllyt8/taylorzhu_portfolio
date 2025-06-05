import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemeSwitch from '../common/ThemeSwitch';
import LanguageToggle from '../common/LanguageToggle';
import Toggle from '../common/Toggle';

const ToggleDemo: React.FC = () => {
  const { theme, actualTheme } = useTheme();
  const { language, t } = useLanguage();

  const demoOptions = [
    { value: 'option1', label: 'Option 1', icon: '🎯' },
    { value: 'option2', label: 'Option 2', icon: '🚀' },
    { value: 'option3', label: 'Option 3', icon: '✨' },
  ];

  const [demoValue, setDemoValue] = React.useState('option1');

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh'
    }}>
      <h1>🎛️ Toggle 组件演示</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>📊 当前状态</h2>
        <ul>
          <li>主题: {theme} (实际显示: {actualTheme})</li>
          <li>语言: {language}</li>
          <li>问候语: {t('landing.greeting')}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🌙 主题切换</h2>
        <p>集成在导航栏中的主题切换器：</p>
        <ThemeSwitch />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🌍 语言切换</h2>
        <p>集成在导航栏中的语言切换器：</p>
        <LanguageToggle />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🎯 自定义 Toggle</h2>
        <p>当前选择: {demoValue}</p>
        <Toggle
          options={demoOptions}
          value={demoValue}
          onChange={setDemoValue}
          size="md"
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>📏 不同尺寸</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p>小尺寸 (sm):</p>
            <Toggle
              options={[
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
                { value: 'c', label: 'C' }
              ]}
              value="a"
              onChange={() => {}}
              size="sm"
            />
          </div>
          
          <div>
            <p>中等尺寸 (md):</p>
            <Toggle
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
                { value: 'c', label: 'Option C' }
              ]}
              value="b"
              onChange={() => {}}
              size="md"
            />
          </div>
          
          <div>
            <p>大尺寸 (lg):</p>
            <Toggle
              options={[
                { value: 'a', label: 'Large Option A', icon: '🎯' },
                { value: 'b', label: 'Large Option B', icon: '🚀' },
                { value: 'c', label: 'Large Option C', icon: '✨' }
              ]}
              value="c"
              onChange={() => {}}
              size="lg"
            />
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '1rem', 
        background: 'var(--bg-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--border-primary)'
      }}>
        <h3>💡 使用说明</h3>
        <ul>
          <li>主题和语言切换器已集成在顶部导航栏中</li>
          <li>桌面端：显示在导航栏右侧</li>
          <li>移动端：显示在汉堡菜单中</li>
          <li>支持键盘导航和无障碍访问</li>
          <li>设置会自动保存到本地存储</li>
        </ul>
      </div>
    </div>
  );
};

export default ToggleDemo;
