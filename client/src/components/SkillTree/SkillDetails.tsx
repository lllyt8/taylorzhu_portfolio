import React from 'react';
import { motion } from 'framer-motion';
import { SkillNode } from '../../types/skillTree';

interface SkillDetailsProps {
  skill: SkillNode | null;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
  if (!skill) return null;

  return (
    <motion.div
      className="skill-details"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="skill-header" style={{ borderColor: skill.color }}>
        <h3>{skill.title}</h3>
        <div className="skill-level">
          {Array.from({ length: skill.maxLevel }).map((_, i) => (
            <span
              key={i}
              className={`level-dot ${i < skill.level ? 'active' : ''}`}
              style={{ backgroundColor: i < skill.level ? skill.color : '#2a2a2a' }}
            />
          ))}
        </div>
      </div>

      <p className="skill-description">{skill.description}</p>

      <div className="skill-detail-section">
        <h4>Core Technologies</h4>
        <div className="tech-tags">
          {skill.details.technologies.map((tech, index) => (
            <span key={index} className="tech-tag" style={{ borderColor: skill.color }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="skill-detail-section">
        <h4>Featured Projects</h4>
        <ul className="project-list">
          {skill.details.projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>

      <div className="skill-detail-section">
        <h4>Experience</h4>
        <p>{skill.details.experience}</p>
      </div>
    </motion.div>
  );
};

export default SkillDetails;
