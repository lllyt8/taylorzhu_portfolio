import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage';
import FloatingChat from './components/Chat/FloatingChat';
import { PageType } from './types/navigation';
import './styles/sidebar.css';
import './styles/landing-page.css';
import './styles/floating-chat.css';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showChat, setShowChat] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onOpenChat={() => setShowChat(true)} />;
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
        isVisible={showChat}
        setIsVisible={setShowChat}
      />
    </div>
  );
}

export default App;
