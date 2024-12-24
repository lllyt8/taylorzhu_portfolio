import { useState } from 'react';
import ChatWindow from './ChatWindow';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingChatProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const FloatingChat = ({ isVisible, setIsVisible }: FloatingChatProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsVisible(!isVisible);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  return (
    <div className="floating-chat-container">
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <motion.div
            className="floating-chat-window"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="chat-header">
              <span>Chat with Taylor's AI Assistant</span>
              <div className="chat-controls">
                <button 
                  onClick={minimizeChat}
                  type="button"
                  aria-label="Minimize chat"
                >
                  −
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  type="button"
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="chat-window-container">
              <div className="floating-chat-content">
                <ChatWindow />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`chat-toggle-button ${isVisible ? 'active' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat window"
        type="button"
      >
        {!isVisible || isMinimized ? (
          <>
            <span className="chat-icon">💬</span>
            <span className="chat-label">Chat with AI</span>
          </>
        ) : (
          <span className="chat-icon">×</span>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingChat;
