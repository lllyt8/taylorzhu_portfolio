import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillNode as SkillNodeType } from '../../types/skillTree';

interface SkillNodeProps {
  node: SkillNodeType;
  isActive: boolean;
  isUnlocked: boolean;
  canUnlock: boolean;
  onClick: () => void;
  onHover: () => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({
  node,
  isActive,
  isUnlocked,
  canUnlock,
  onClick,
  onHover,
}) => {
  const [isClicking, setIsClicking] = useState(false);
  const nodeSize = 60;
  
  const handleClick = () => {
    if (!canUnlock && !isUnlocked) return;
    
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300);
    onClick();
  };

  const nodeStatus = isUnlocked ? 'unlocked' : (canUnlock ? 'unlockable' : 'locked');
  
  return (
    <motion.g
      className={`skill-node ${nodeStatus} ${isClicking ? 'clicking' : ''} ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={() => !isUnlocked && onHover()}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 发光效果 */}
      <motion.circle
        className="node-glow"
        cx={node.position.x}
        cy={node.position.y}
        r={nodeSize * 0.7}
        fill={`url(#glow-${node.id})`}
        animate={{
          opacity: isActive ? 0.6 : 0.2,
          scale: isActive ? 1.1 : 1
        }}
      />

      {/* 主节点圆圈 */}
      <motion.circle
        className="node-circle"
        cx={node.position.x}
        cy={node.position.y}
        r={nodeSize * 0.5}
        fill={`url(#gradient-${node.id})`}
        stroke={isUnlocked ? node.color : '#2a2a2a'}
        strokeWidth="2"
        animate={{
          scale: isActive ? 1.1 : 1,
          strokeWidth: isActive ? "3" : "2"
        }}
      />

      {/* 图标或文字 */}
      <text
        x={node.position.x}
        y={node.position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize="20"
        fontFamily="'Rajdhani', sans-serif"
      >
        {node.icon || node.title.charAt(0)}
      </text>

      {/* 技能等级指示器 */}
      <g>
        {Array.from({ length: node.maxLevel }).map((_, i) => (
          <motion.circle
            key={i}
            cx={node.position.x - (node.maxLevel * 5) / 2 + i * 5}
            cy={node.position.y + nodeSize * 0.5 + 10}
            r={2}
            fill={i < node.level ? node.color : '#2a2a2a'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </g>

      {/* 技能名称 */}
      <motion.text
        x={node.position.x}
        y={node.position.y + nodeSize * 0.8 + 20}
        textAnchor="middle"
        fill={isUnlocked ? '#fff' : '#666'}
        fontSize="12"
        fontFamily="'Rajdhani', sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {node.title}
      </motion.text>

      {/* 定义渐变和滤镜 */}
      <defs>
        <radialGradient id={`gradient-${node.id}`}>
          <stop offset="0%" stopColor={node.color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={node.color} stopOpacity="0.3" />
        </radialGradient>
        <filter id={`glow-${node.id}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 悬浮提示 */}
      <AnimatePresence>
        {!isUnlocked && !canUnlock && isActive && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <rect
              x={node.position.x - 60}
              y={node.position.y - nodeSize - 40}
              width="120"
              height="30"
              rx="4"
              fill="rgba(0,0,0,0.9)"
            />
            <text
              x={node.position.x}
              y={node.position.y - nodeSize - 20}
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
            >
              Complete prerequisites first
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
};

export default SkillNode;
