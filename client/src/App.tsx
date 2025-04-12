import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ProjectsPage from './components/Projects/ProjectsPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/Blog/BlogPost';
import CollectionView from './components/Blog/CollectionView';
import ContactPage from './components/ContactPage';
import FloatingChat from './components/Chat/FloatingChat';
import { PageType } from './types/navigation';
import './styles/sidebar.css';
import './styles/landing-page.css';
import './styles/floating-chat.css';
import './styles/contact-page.css';
import './styles/about-page.css';
import './styles/services-page.css'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showChat, setShowChat] = useState(false);
  // 在状态声明部分添加
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [blogViewMode, setBlogViewMode] = useState<'list' | 'post' | 'collection'>('list');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onOpenChat={() => setShowChat(true)} 
            onNavigate={setCurrentPage}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'services': 
        return <ServicesPage />;
      case 'projects':
          return <ProjectsPage />;
      case 'blog':
        if (blogViewMode === 'post' && selectedBlogPostId) {
          return (
            <BlogPost 
              postId={selectedBlogPostId} 
              onBack={() => {
                setBlogViewMode('list');
                setSelectedBlogPostId(null);
              }}
              onViewCollection={(collectionId) => {
                setBlogViewMode('collection');
                setSelectedCollectionId(collectionId);
              }}
            />
          );
        } else if (blogViewMode === 'collection' && selectedCollectionId) {
          return (
            <CollectionView 
              collectionId={selectedCollectionId}
              onBack={() => {
                setBlogViewMode('list');
                setSelectedCollectionId(null);
              }}
              onSelectPost={(postId) => {
                setBlogViewMode('post');
                setSelectedBlogPostId(postId);
              }}
            />
          );
        } else {
          return (
            <BlogPage 
              onSelectPost={(postId) => {
                setBlogViewMode('post');
                setSelectedBlogPostId(postId);
              }}
              onSelectCollection={(collectionId) => {
                setBlogViewMode('collection');
                setSelectedCollectionId(collectionId);
              }}
            />
          );
        }
      case 'contact':
        return <ContactPage />;
      default:
        return <div className="coming-soon">Coming Soon!</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
      />
      <div className="content">
        {renderPage()}
      </div>
      <FloatingChat 
        isVisible={showChat}
        setIsVisible={setShowChat}
      />
    </div>
  );
}

export default App;
