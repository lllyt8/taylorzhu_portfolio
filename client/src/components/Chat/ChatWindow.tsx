import { useState, useEffect } from 'react';
import { Message } from '../../types/chat';
import MessageInput from './MessageInput';
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

  // 当消息更新时保存到 localStorage
  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  }, [messages]);

  // Handle Message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const aiResponse = await sendMessage(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Message failed to send:', error);
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
            className={`message message-${message.sender}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <button 
          onClick={clearHistory}
          className="clear-history-button"
          type="button"
          aria-label="Clear chat history"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
