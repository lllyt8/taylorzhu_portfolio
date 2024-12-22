import { useState } from 'react';
import { PageType, NAV_ITEMS } from '../../types/navigation';

interface SidebarProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

const Sidebar = ({ onNavigate, currentPage }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavItems = (containerClass: string) => (
    <div className={containerClass}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          type="button"
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-label={`${item.label} page`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="nav-header">
      <div 
        className="logo" 
        onClick={() => onNavigate('home')}
        role="button"
        tabIndex={0}
        aria-label="Go to home page"
      >
        TZ
      </div>
      
      {/* 桌面端菜单 */}
      {renderNavItems('nav-menu')}

      {/* 移动端菜单按钮 */}
      <button 
        type="button" 
        className="menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <div className="menu-circle"></div>
      </button>

      {/* 移动端下拉菜单 */}
      {isMobileMenuOpen && renderNavItems('mobile-menu')}
    </nav>
  );
};

export default Sidebar;
