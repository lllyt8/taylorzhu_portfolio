import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../../types/chat';
import TypingMessage from './TypingMessage';

interface VirtualMessageListProps {
  messages: Message[];
  onRetry?: (messageId: string) => void;
  isTyping?: boolean;
  typingMessageId?: string | null;
}

const ITEM_HEIGHT = 80; // 预估的每条消息高度
const BUFFER_ITEMS = 5; // 缓冲区消息数量

const VirtualMessageList: React.FC<VirtualMessageListProps> = ({
  messages,
  onRetry,
  isTyping,
  typingMessageId
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  // 处理滚动和可见范围计算
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        const totalVisibleItems = Math.ceil(clientHeight / ITEM_HEIGHT);
        
        const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS);
        const endIndex = Math.min(
          messages.length,
          Math.ceil((scrollTop + clientHeight) / ITEM_HEIGHT) + BUFFER_ITEMS
        );

        setVisibleRange({ start: startIndex, end: endIndex });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // 初始化
    }

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [messages.length]);

  // 新消息时自动滚动到底部
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="message-list" ref={containerRef}>
      <div
        style={{
          height: `${messages.length * ITEM_HEIGHT}px`,
          position: 'relative'
        }}
      >
        {messages
          .slice(visibleRange.start, visibleRange.end)
          .map((message, index) => (
            <div
              key={message.id}
              style={{
                position: 'absolute',
                top: `${(index + visibleRange.start) * ITEM_HEIGHT}px`,
                width: '100%'
              }}
              className={`message message-${message.sender} message-${message.status}`}
            >
              {message.id === typingMessageId ? (
                <TypingMessage 
                  content={message.content} 
                  onComplete={() => {/* 可以添加完成回调 */}}
                />
              ) : (
                <div className="message-content">{message.content}</div>
              )}
              <div className="message-footer">
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
                {message.status === 'error' && message.sender === 'user' && (
                  <button
                    onClick={() => onRetry?.(message.id)}
                    className="retry-button"
                    aria-label="Retry sending message"
                  >
                    <span className="material-icons">refresh</span>
                  </button>
                )}
                {message.status === 'sending' && (
                  <span className="sending-indicator">
                    <span className="material-icons">schedule</span>
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
      {isTyping && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};

export default VirtualMessageList;
