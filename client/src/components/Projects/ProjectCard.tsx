// src/components/Projects/ProjectCard.tsx

import { motion } from 'framer-motion';
import { Project } from '../../types/projects';

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  viewMode: 'grid' | 'list';
}

const ProjectCard = ({
  project,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  viewMode
}: ProjectCardProps) => {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`
        relative cursor-pointer rounded-lg overflow-hidden
        ${viewMode === 'grid' ? 'aspect-[4/3]' : 'aspect-[16/5]'}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-60 p-6 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-200 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
