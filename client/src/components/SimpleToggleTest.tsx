import { useState } from 'react';
import Toggle from './common/Toggle';

const SimpleToggleTest = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const themeOptions = [
    { value: 'light', label: '浅色' },
    { value: 'auto', label: '自动' },
    { value: 'dark', label: '深色' },
  ];

  const languageOptions = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中' },
    { value: 'zh-HK', label: '繁' },
  ];

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'var(--bg-primary, #fff)', 
      color: 'var(--text-primary, #333)',
      minHeight: '100vh'
    }}>
      <h1>🧪 Toggle 组件测试</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>当前状态</h2>
        <p>主题: {theme}</p>
        <p>语言: {language}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>主题切换</h3>
        <Toggle
          options={themeOptions}
          value={theme}
          onChange={setTheme}
          size="sm"
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>语言切换</h3>
        <Toggle
          options={languageOptions}
          value={language}
          onChange={setLanguage}
          size="sm"
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>不同尺寸</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p>小尺寸:</p>
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
            <p>中等尺寸:</p>
            <Toggle
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' }
              ]}
              value="b"
              onChange={() => {}}
              size="md"
            />
          </div>
          
          <div>
            <p>大尺寸:</p>
            <Toggle
              options={[
                { value: 'a', label: 'Large A' },
                { value: 'b', label: 'Large B' }
              ]}
              value="a"
              onChange={() => {}}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleToggleTest;
