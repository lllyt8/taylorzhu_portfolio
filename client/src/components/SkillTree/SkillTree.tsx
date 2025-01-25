import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SkillNode from './SkillNode';
import SkillConnection from './SkillConnection';
import SkillDetails from './SkillDetails';
import { skillTreeData } from '../../data/skillTreeData';
import { ConnectionLine } from '../../types/skillTree';

const SkillTree: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set(['fullstack']));
  const [connections, setConnections] = useState<ConnectionLine[]>([]);

  useEffect(() => {
    // Calculate connections
    const newConnections: ConnectionLine[] = [];
    Object.values(skillTreeData).forEach(node => {
      if (node.prerequisites) {
        node.prerequisites.forEach(preReqId => {
          const preReqNode = skillTreeData[preReqId];
          newConnections.push({
            start: preReqNode.position,
            end: node.position,
            active: unlockedNodes.has(preReqId) && unlockedNodes.has(node.id),
            prerequisite: true
          });
        });
      }
    });
    setConnections(newConnections);
  }, [unlockedNodes]);

  const handleNodeClick = (nodeId: string) => {
    // Check if node can be unlocked
    const node = skillTreeData[nodeId];
    const canUnlock = !node.prerequisites || 
      node.prerequisites.every(preReqId => unlockedNodes.has(preReqId));

    if (canUnlock) {
      setUnlockedNodes(prev => new Set([...prev, nodeId]));
      setActiveNode(nodeId);
    }
  };

  return (
    <div className="skill-tree-container">
      <svg className="skill-tree-svg" width="100%" height="800">
        {/* Background grid */}
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path 
            d="M 50 0 L 0 0 0 50" 
            fill="none" 
            stroke="#1a1a1a" 
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        {connections.map((connection, index) => (
          <SkillConnection key={index} connection={connection} />
        ))}

        {/* Nodes */}
        {Object.values(skillTreeData).map(node => (
          <SkillNode
            key={node.id}
            node={node}
            isActive={activeNode === node.id}
            isUnlocked={unlockedNodes.has(node.id)}
            onClick={() => handleNodeClick(node.id)}
            onHover={() => setActiveNode(node.id)}
          />
        ))}
      </svg>

      {/* Skill Details Panel */}
      <AnimatePresence>
        {activeNode && (
          <SkillDetails skill={skillTreeData[activeNode]} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTree;
