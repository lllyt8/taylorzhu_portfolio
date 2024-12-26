import { useState, FormEvent, useEffect, useRef } from 'react';
import AutoResizeInput from './AutoResizeInput';

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled && !isComposing) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // 输入法事件处理
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  // 处理移动端点击
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  // 自动聚焦到输入框
  useEffect(() => {
    const input = formRef.current?.querySelector('textarea');
    if (input && !disabled) {
      input.focus();
    }
  }, [disabled]);

  return (
    <form 
      ref={formRef}
      className="message-input" 
      onSubmit={handleSubmit}
      onTouchStart={handleTouchStart}
    >
      <AutoResizeInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me something about Taylor! ^_^"
        disabled={disabled}
        onKeyPress={handleKeyPress}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <button 
        type="submit"
        disabled={disabled || !input.trim() || isComposing}
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
