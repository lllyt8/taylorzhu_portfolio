import { useState, useCallback } from 'react';
import { PageType, NAV_ITEMS } from '../../types/navigation';

interface SidebarProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

const Sidebar = ({ onNavigate, currentPage }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavigation = useCallback((pageId: PageType) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  }, [onNavigate]);

  const handleLogoClick = useCallback(() => {
    handleNavigation('home');
  }, [handleNavigation]);

  const renderNavItems = (containerClass: string) => (
    <div className={containerClass}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          type="button"
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => handleNavigation(item.id)}
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <header className="nav-header">
      <div 
        className="logo" 
        onClick={handleLogoClick}
        onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
        role="button"
        tabIndex={0}
        aria-label="Go to home page"
      >
        TZ
      </div>
      
      {renderNavItems('nav-menu')}

      <button 
        type="button" 
        className={`menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded="false"
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>

      {isMobileMenuOpen && (
        <nav 
          className="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {renderNavItems('mobile-menu-items')}
        </nav>
      )}
    </header>
  );
};

export default Sidebar;
