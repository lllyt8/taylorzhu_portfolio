import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../../types/chat';
import { sendMessage } from '../../services/api';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (content: string) => {
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
      console.error('发送消息失败:', error);
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
