// components/Chat/TypingMessage.tsx
import React, { useState, useEffect } from 'react';

interface TypingMessageProps {
  content: string;
  onComplete?: () => void;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 30); // 每个字符的延迟时间

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [content, currentIndex, onComplete]);

  return (
    <div className="message-content typing">
      {displayedContent}
      <span className="typing-cursor"/>
    </div>
  );
};

export default TypingMessage;
