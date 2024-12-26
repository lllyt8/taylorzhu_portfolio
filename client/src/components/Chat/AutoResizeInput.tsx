import React, { useRef, useEffect, ChangeEvent } from 'react';

interface AutoResizeInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: () => void;
}

const AutoResizeInput: React.FC<AutoResizeInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  onKeyPress,
  onCompositionStart,
  onCompositionEnd
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // 重置高度
      textAreaRef.current.style.height = 'auto';
      // 设置新高度
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`; // 最大高度150px
    }
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      onKeyPress={onKeyPress}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      rows={1}
      className="auto-resize-input"
    />
  );
};

export default AutoResizeInput;
