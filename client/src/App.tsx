// client/src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ProjectsPage from './components/Projects/ProjectsPage';
import ProjectDetail from './components/Projects/ProjectDetail'; // 需要创建
import BlogPage from './components/BlogPage';
import BlogPost from './components/Blog/BlogPost';
import CollectionView from './components/Blog/CollectionView';
import ContactPage from './components/ContactPage';
import FloatingChat from './components/Chat/FloatingChat';
import AdminLoginPage from './components/Admin/AdminLoginPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import { PageType } from './types/navigation';
import { useAuth } from './contexts/AuthContext';
import './styles/sidebar.css';
import './styles/landing-page.css';
import './styles/floating-chat.css';
import './styles/contact-page.css';
import './styles/about-page.css';
import './styles/services-page.css'
import './styles/project-detail.css';

// 保护路由的组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 监听路由变化，更新当前页面状态
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setCurrentPage('home');
    } else if (path.startsWith('/about')) {
      setCurrentPage('about');
    } else if (path.startsWith('/services')) {
      setCurrentPage('services');
    } else if (path.startsWith('/projects')) {
      setCurrentPage('projects');
    } else if (path.startsWith('/blog')) {
      setCurrentPage('blog');
    } else if (path.startsWith('/contact')) {
      setCurrentPage('contact');
    }
    // 注意：我们不再将 admin 路径设置为当前页面
    // 这样即使用户直接访问 admin 页面，侧边栏也不会高亮显示 admin 选项
  }, [location.pathname]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);

    // 基于页面类型导航到对应的路由
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'admin':
        // 管理员页面特殊处理
        navigate('/admin-login');
        break;
      default:
        navigate(`/${page}`);
        break;
    }
  };

  const handleExitAdmin = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <Sidebar
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <div className="content">
        <Routes>
          {/* 公共路由 */}
          <Route path="/" element={
            <LandingPage
              onOpenChat={() => setShowChat(true)}
              onNavigate={handleNavigate}
            />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogPage
            onSelectPost={(postId: string) => navigate(`/blog/post/${postId}`)}
            onSelectCollection={(collectionId: string) => navigate(`/blog/collection/${collectionId}`)}
          />} />
          <Route path="/blog/post/:id" element={<BlogPost
            postId="" // 将从路由参数获取
            onBack={() => navigate('/blog')}
            onViewCollection={(collectionId) => navigate(`/blog/collection/${collectionId}`)}
          />} />
          <Route path="/blog/collection/:id" element={<CollectionView
            collectionId="" // 将从路由参数获取
            onBack={() => navigate('/blog')}
            onSelectPost={(postId) => navigate(`/blog/post/${postId}`)}
          />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 管理路由 */}
          <Route path="/admin-login" element={<AdminLoginPage onLoginSuccess={() => navigate('/admin-dashboard')} />} />
          <Route path="/admin-dashboard/*" element={
            <ProtectedRoute>
              <AdminDashboard onExit={handleExitAdmin} />
            </ProtectedRoute>
          } />

          {/* 兼容性重定向 */}
          <Route path="/admin" element={<Navigate to="/admin-login" replace />} />

          {/* 通配符路由 - 页面不存在时重定向到首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <FloatingChat
        isVisible={showChat}
        setIsVisible={setShowChat}
        isHomePage={currentPage === 'home'}
      />
    </div>
  );
}

export default App;
