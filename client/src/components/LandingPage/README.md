# LandingPage 组件完整功能说明

## 🎯 新增功能

### ✅ 骨架屏加载
- 智能加载状态检测
- 完整的 LandingPage 骨架屏布局
- 支持浅色/深色主题
- 响应式设计适配

### ✅ 深色模式支持
- 自动检测系统主题偏好
- 手动切换浅色/深色/自动模式
- 平滑的主题过渡动画
- 完整的 CSS 变量系统

### ✅ 多语言支持
- 支持英语、简体中文、繁体中文
- 自动检测浏览器语言
- 动态加载翻译文件
- 参数化翻译支持

### ✅ 设置面板
- 浮动设置按钮
- 主题和语言切换
- 优雅的动画效果
- 移动端适配

## 🔧 技术实现

### 1. Context 管理
```typescript
// 主题管理
const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

// 语言管理
const { language, setLanguage, t, isLoading } = useLanguage();
```

### 2. 骨架屏使用
```tsx
// 自动显示骨架屏
if (languageLoading || !isContentLoaded) {
  return <LandingPageSkeleton />;
}
```

### 3. 翻译系统
```tsx
// 基础翻译
{t('landing.greeting')}

// 参数化翻译
{t('accessibility.profileImage', { name: PERSONAL_INFO.name })}
```

## 📁 文件结构

```
client/src/
├── contexts/
│   ├── ThemeContext.tsx      # 主题管理
│   └── LanguageContext.tsx   # 语言管理
├── components/common/
│   ├── Skeleton.tsx          # 骨架屏组件
│   ├── ThemeToggle.tsx       # 主题切换
│   ├── LanguageSwitch.tsx    # 语言切换
│   └── SettingsPanel.tsx     # 设置面板
├── locales/
│   ├── en.json              # 英语翻译
│   ├── zh.json              # 简体中文
│   └── zh-HK.json           # 繁体中文
└── styles/
    └── themes.css           # 主题样式
```

## 🎨 主题系统

### CSS 变量
```css
/* 浅色主题 */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --primary-color: #4CAF50;
}

/* 深色主题 */
[data-theme="dark"] {
  --bg-primary: #121212;
  --text-primary: #ffffff;
  --primary-color: #4CAF50;
}
```

### 使用方式
```tsx
// 组件中使用主题
const { theme, setTheme } = useTheme();

// 切换到深色模式
setTheme('dark');

// 自动模式（跟随系统）
setTheme('auto');
```

## 🌍 国际化

### 添加新语言
1. 在 `locales/` 目录添加新的 JSON 文件
2. 更新 `LanguageContext.tsx` 中的 `LANGUAGES` 配置
3. 添加对应的语言检测逻辑

### 翻译文件结构
```json
{
  "landing": {
    "greeting": "Hello I'm",
    "buttons": {
      "about": "About Me"
    }
  },
  "common": {
    "loading": "Loading..."
  }
}
```

## 📱 响应式设计

### 骨架屏适配
- 桌面端：三栏布局
- 平板端：两栏布局
- 移动端：单栏垂直布局

### 设置面板适配
- 桌面端：右上角固定位置
- 移动端：自适应宽度和位置

## 🚀 性能优化

### 懒加载
- 翻译文件动态导入
- 骨架屏预加载
- 组件级别的懒加载

### 缓存策略
- 主题偏好本地存储
- 语言选择持久化
- 翻译文件缓存

## 🔧 配置选项

### 个人信息配置
```typescript
// client/src/types/landing.ts
export const PERSONAL_INFO: PersonalInfo = {
  name: "Taylor Zhu",
  title: "Software Engineer Intern @ EPC Energy",
  description: "Software | Data | AI | ...",
  profileImage: "/profile_pic.jpg"
};
```

### 统计数据配置
```typescript
export const STATS_DATA: StatCardData[] = [
  {
    value: "3+",
    label: "Professional Experience",
    ariaLabel: "3 plus years of professional experience"
  }
];
```

## 🎯 使用指南

### 基础使用
```tsx
import LandingPage from './components/LandingPage';

<LandingPage
  onOpenChat={() => setShowChat(true)}
  onNavigate={handleNavigate}
/>
```

### 自定义设置面板位置
```tsx
// 固定在右上角
<SettingsPanel className="fixed" />

// 浮动在右下角
<SettingsPanel className="floating" />
```

### 手动控制主题
```tsx
const { setTheme } = useTheme();

// 切换到深色模式
setTheme('dark');
```

### 手动切换语言
```tsx
const { setLanguage } = useLanguage();

// 切换到中文
setLanguage('zh');
```
