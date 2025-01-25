import React from 'react';
import '../styles/cyberpunk-background.css';

const CyberpunkBackground = () => {
  return (
    <div className="cyberpunk-background">
      {/* 网格背景 */}
      <div className="grid-overlay"></div>
      
      {/* 动态光效 */}
      <div className="light-effects">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`light-beam beam-${i + 1}`}></div>
        ))}
      </div>

      {/* 赛博朋克装饰元素 */}
      <svg className="cyber-patterns" width="100%" height="100%" viewBox="0 0 100 100">
        <pattern id="cyber-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(64, 224, 208, 0.1)" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        
        {/* 角落装饰 */}
        <path 
          d="M 0 10 L 10 0 L 12 0 L 2 10 Z" 
          fill="rgba(64, 224, 208, 0.2)" 
          className="corner-decoration"
        />
        <path 
          d="M 90 0 L 100 10 L 100 12 L 88 0 Z" 
          fill="rgba(64, 224, 208, 0.2)" 
          className="corner-decoration"
        />
      </svg>

      {/* 故障效果 */}
      <div className="glitch-overlay"></div>

      {/* 扫描线效果 */}
      <div className="scan-lines"></div>
    </div>
  );
};

export default CyberpunkBackground;
