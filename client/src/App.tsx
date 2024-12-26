import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage';
import ContactPage from './components/ContactPage';  // 新增这行
import FloatingChat from './components/Chat/FloatingChat';
import { PageType } from './types/navigation';
import './styles/sidebar.css';
import './styles/landing-page.css';
import './styles/floating-chat.css';
import './styles/contact-page.css';  // 新增这行

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showChat, setShowChat] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onOpenChat={() => setShowChat(true)} 
            onNavigate={setCurrentPage}
          />
        );
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
