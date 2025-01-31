import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ProjectsPage from './components/Projects/ProjectsPage';
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
