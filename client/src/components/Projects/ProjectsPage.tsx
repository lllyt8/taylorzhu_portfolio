import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../../services/api';
import '../../styles/projects-page.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  link: string;
  images: string[];
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
}

const ProjectCard: React.FC<{ project: Project; onSelect: (id: number) => void }> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(project.id)}
      whileHover={{ y: -5 }}
    >
      <div className="project-preview">
        <img 
          src={project.images[0]} 
          alt={project.title}
          className="preview-image"
        />
        <motion.div 
          className="preview-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <button 
            className="preview-btn"
            aria-label={`View more details about ${project.title}`}
          >
            View More
          </button>
        </motion.div>
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ 
  project: Project; 
  onClose: () => void 
}> = ({ project, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{project.title}</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* 图片轮播 */}
          <div className="project-carousel">
            <img 
              src={project.images[currentImage]} 
              alt={project.title}
              className="carousel-image" 
            />
            <div className="carousel-controls">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${currentImage === index ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                  aria-label={`View image ${index + 1} of ${project.images.length}`}
                />
              ))}
            </div>
          </div>

          {/* 项目详情 */}
          <div className="project-details">
            <section>
              <h3>Challenge</h3>
              <p>{project.details.challenge}</p>
            </section>
            <section>
              <h3>Solution</h3>
              <p>{project.details.solution}</p>
            </section>
            <section>
              <h3>Result</h3>
              <p>{project.details.result}</p>
            </section>
          </div>

          {/* 技术栈 */}
          <div className="project-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-project-btn"
          >
            Project Details
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'research', label: 'Research' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="projects-section">
      <div className="projects-container">
        <h1 className="section-title">
          Some Things I've<span className="highlight"> Built</span>
        </h1>

        <div className="filter-nav">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedProjectData && (
            <ProjectModal
              project={selectedProjectData}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
