import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'react-use';
import { PageType, NAV_ITEMS } from '../../types/navigation';

interface SidebarProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

const Sidebar = ({ onNavigate, currentPage }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastVisitedPage, setLastVisitedPage] = useLocalStorage<PageType>('lastVisitedPage', 'home');
  const [startX, setStartX] = useState<number | null>(null);
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(target) &&
          menuButtonRef.current &&
          !menuButtonRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    // 分别处理鼠标和触摸事件
    const handleMouseDown = (e: MouseEvent) => handleClickOutside(e);
    const handleTouchStart = (e: TouchEvent) => handleClickOutside(e);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (lastVisitedPage && lastVisitedPage !== currentPage) {
      onNavigate(lastVisitedPage);
    }
  }, []);

  useEffect(() => {
    setLastVisitedPage(currentPage);
  }, [currentPage]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      } else if (diff < 0 && !isMobileMenuOpen) {
        setIsMobileMenuOpen(true);
      }
      setStartX(null);
    }
  };

  const renderNavItems = (containerClass: string) => (
    <div className={containerClass}>
      {NAV_ITEMS.map(item => (
        <motion.button
          key={item.id}
          type="button"
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => handleNavigation(item.id)}
          aria-label={`Navigate to ${item.label}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );

  return (
    <header 
      className="nav-header"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <motion.div 
        className="logo" 
        onClick={handleLogoClick}
        onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
        role="button"
        tabIndex={0}
        aria-label="Go to home page"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        TZ
      </motion.div>
      
      {renderNavItems('nav-menu')}

      <button 
        ref={menuButtonRef}
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

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.nav 
            ref={mobileMenuRef}
            className="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {renderNavItems('mobile-menu-items')}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Sidebar;
