import React from 'react';
import { motion } from 'framer-motion';
import { ConnectionLine } from '../../types/skillTree';

interface SkillConnectionProps {
  connection: ConnectionLine;
}

const SkillConnection: React.FC<SkillConnectionProps> = ({ connection }) => {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: connection.active ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Base line */}
      <line
        x1={connection.start.x}
        y1={connection.start.y}
        x2={connection.end.x}
        y2={connection.end.y}
        stroke={connection.prerequisite ? '#444' : '#2a2a2a'}
        strokeWidth="2"
      />

      {/* Animated energy flow */}
      {connection.active && (
        <motion.circle
          cx={connection.start.x}
          cy={connection.start.y}
          r="2"
          fill="#fff"
          animate={{
            cx: [connection.start.x, connection.end.x],
            cy: [connection.start.y, connection.end.y],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Glow effect */}
      <motion.line
        x1={connection.start.x}
        y1={connection.start.y}
        x2={connection.end.x}
        y2={connection.end.y}
        stroke={connection.active ? '#4CAF50' : '#2a2a2a'}
        strokeWidth="1"
        strokeOpacity="0.5"
        filter="url(#glow)"
      />

      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </motion.g>
  );
};

export default SkillConnection;
