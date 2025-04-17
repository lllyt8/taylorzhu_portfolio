import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../../services/api';
import { Project } from '../../types/projects';
import '../../styles/projects-page.css';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
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

  const handleSelectProject = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

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
            <div 
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
              className="project-card-container"
            >
              {/* 项目卡片内容 */}
              <motion.div
                className="project-card"
                whileHover={{ y: -5 }}
              >
                <div className="project-preview">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="preview-image"
                  />
                  <motion.div 
                    className="preview-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <button 
                      className="preview-btn"
                      aria-label={`View more details about ${project.title}`}
                    >
                      View Details
                    </button>
                  </motion.div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="more-tech">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
