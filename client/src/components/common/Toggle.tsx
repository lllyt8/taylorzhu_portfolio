import React from 'react';
import { motion } from 'framer-motion';
import './Toggle.css';

interface ToggleOption {
  value: string;
  label: string;
  icon?: string;
}

interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle: React.FC<ToggleProps> = ({
  options,
  value,
  onChange,
  className = '',
  size = 'md'
}) => {


  return (
    <div className={`toggle-container ${size} ${className}`}>
      <div className="toggle-track">
        {/* 选项按钮 */}
        {options.map((option, index) => (
          <button
            key={option.value}
            className={`toggle-option ${value === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
            type="button"

          >
            {option.icon && (
              <span className="toggle-icon" role="img" aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className="toggle-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
