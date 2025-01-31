// src/components/Projects/ProjectModal.tsx

import { motion } from 'framer-motion';
import { Project } from '../../types/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-${project.id}`}
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-600 mb-6">{project.longDescription}</p>
        <div className="flex gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
            >
              View on GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-[#4CAF50] text-[#4CAF50] rounded-lg hover:bg-[#4CAF50] hover:text-white transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
