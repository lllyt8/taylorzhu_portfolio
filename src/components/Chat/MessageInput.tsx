import React, { useState } from 'react';

interface Props {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入消息..."
      />
      <button type="submit">发送</button>
    </form>
  );
};

export default MessageInput;
