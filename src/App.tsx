import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/Chat/ChatWindow';
import LandingPage from './components/LandingPage';
import { PageType } from './types/navigation';
import './styles/sidebar.css';
import './styles/landing-page.css';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'chat':
        return (
          <div className="chat-container">
            <button 
              className="close-chat" 
              onClick={() => setCurrentPage('home')}
              type="button"
              aria-label="Close chat"
            >
              ×
            </button>
            <ChatWindow />
          </div>
        );
      default:
        return <div className="coming-soon">Coming Soon!</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
