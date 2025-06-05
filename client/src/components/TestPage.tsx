import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const TestPage = () => {
  const { theme, actualTheme, setTheme } = useTheme();
  const { language, setLanguage, t, isLoading } = useLanguage();

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'var(--bg-primary)', 
      color: 'var(--text-primary)',
      minHeight: '100vh'
    }}>
      <h1>🧪 功能测试页面</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>📊 当前状态</h2>
        <ul>
          <li>语言加载状态: {isLoading ? '加载中...' : '已完成'}</li>
          <li>当前主题: {theme} (实际显示: {actualTheme})</li>
          <li>当前语言: {language}</li>
          <li>翻译测试: {t('landing.greeting')} {t('landing.name')}</li>
          <li>导航翻译: {t('navigation.home')} | {t('navigation.about')}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🎛️ 手动控制</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={() => setTheme('light')}>☀️ 浅色</button>
          <button onClick={() => setTheme('dark')}>🌙 深色</button>
          <button onClick={() => setTheme('auto')}>🔄 自动</button>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setLanguage('en')}>🇺🇸 English</button>
          <button onClick={() => setLanguage('zh')}>🇨🇳 中文</button>
          <button onClick={() => setLanguage('zh-HK')}>🇭🇰 繁體</button>
        </div>
      </div>

      <div style={{ 
        padding: '1rem', 
        background: 'var(--bg-secondary)', 
        borderRadius: '8px',
        border: '1px solid var(--border-primary)'
      }}>
        <h3>✅ 检查清单</h3>
        <ul>
          <li>✅ 导航栏右侧应该显示主题和语言切换器</li>
          <li>✅ 切换主题应该立即生效</li>
          <li>✅ 切换语言应该立即更新文字</li>
          <li>✅ 移动端汉堡菜单中应该显示控制选项</li>
          <li>✅ 刷新页面后设置应该保持</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;
