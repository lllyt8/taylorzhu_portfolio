import React from 'react';
import { Message } from '../../types/chat';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`message ${message.sender === 'user' ? 'message-user' : 'message-ai'}`}
        >
          <div className="message-content">{message.content}</div>
          <div className="message-time">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
