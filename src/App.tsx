import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FloatingChat from './components/Chat/FloatingChat';
import LandingPage from './components/LandingPage';
import { PageType } from './types/navigation';
import './styles/sidebar.css';
import './styles/landing-page.css';
import './styles/floating-chat.css';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isChatVisible, setIsChatVisible] = useState(false);

  // 移除 chat 从导航选项，因为它现在会通过浮动窗口显示
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      // 移除 chat case，因为它现在由 FloatingChat 处理
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
        isVisible={isChatVisible}
        setIsVisible={setIsChatVisible}
      />
    </div>
  );
}

export default App;
