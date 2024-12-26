import { useState, FormEvent } from 'react';

interface MessageInputProps {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  // 移除 handleKeyPress，直接在表单提交时处理
  return (
    <form 
      className="message-input" 
      onSubmit={handleSubmit}
      // 添加移动端触摸事件处理
      onTouchStart={(e) => e.stopPropagation()}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me something about Taylor! ^_^"
        // 添加移动端输入优化
        inputMode="text"
        autoComplete="off"
      />
      <button 
        type="submit"
        // 添加明确的类型
        role="button"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
