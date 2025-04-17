import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, MessageStatus } from '../../types/chat';
import MessageInput from './MessageInput';
import TypingMessage from './TypingMessage';
import { sendMessage } from '../../services/api';
import '../../styles/chat.css';

const ChatWindow = () => {
  // 从 localStorage 读取历史记录
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat-history');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 重试消息发送
  const handleRetry = useCallback(async (messageId: string) => {
    const messageToRetry = messages.find(m => m.id === messageId);
    if (!messageToRetry || messageToRetry.sender !== 'user') return;

    // 更新消息状态为发送中
    setMessages(prev => prev.map(m =>
      m.id === messageId ? { ...m, status: 'sending' as MessageStatus } : m
    ));

    try {
      const response = await sendMessage(messageToRetry.content);

      // 更新消息状态为成功
      setMessages(prev => prev.map(m =>
        m.id === messageId ? { ...m, status: 'sent' as MessageStatus } : m
      ));

      // 添加 AI 响应
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // 更新消息状态为错误
      setMessages(prev => prev.map(m =>
        m.id === messageId ? { ...m, status: 'error' as MessageStatus } : m
      ));
    }
  }, [messages]);

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 当消息更新时保存到 localStorage
  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  }, [messages]);

  // Handle Message
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending message:', content);
      const aiResponse = await sendMessage(content);
      console.log('Received response:', aiResponse);

      // 更新用户消息状态为已发送
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, status: 'sent' } : m
      ));

      // 添加 AI 响应
      const aiMessageId = (Date.now() + 1).toString();
      setTypingMessageId(aiMessageId);

      const aiMessage: Message = {
        id: aiMessageId,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error('Error in handleSendMessage:', error);

      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, status: 'error' } : m
      ));

      // 添加错误消息
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: errorMessage,
        sender: 'ai',
        timestamp: new Date(),
        status: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear History
  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chat-history');
  };

  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message message-${message.sender} message-${message.status}`}
          >
            {message.id === typingMessageId ? (
              <TypingMessage
                content={message.content}
                onComplete={() => setTypingMessageId(null)}
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
                  onClick={() => handleRetry(message.id)}
                  className="retry-button"
                  type="button"
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
        {isLoading && (
          <>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="loading-indicator">
              AI is thinking...
            </div>
          </>
        )}
        <div ref={messagesEndRef} />
        <button
          onClick={clearHistory}
          className="clear-history-button"
          type="button"
          aria-label="Clear chat history"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
      <MessageInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
