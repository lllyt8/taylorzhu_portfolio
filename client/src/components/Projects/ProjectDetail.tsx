// client/src/components/Projects/ProjectDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProject } from '../../services/api';
import { Project } from '../../types/projects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProject(parseInt(id || '0'));
        setProject(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/projects');
  };

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (error || !project) {
    return (
      <div className="not-found">
        <h2>{error || 'Project not found'}</h2>
        <button onClick={handleBack} className="back-button">Back to Projects</button>
      </div>
    );
  }

  return (
    <motion.div
      className="project-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={handleBack} className="back-button">
        &larr; Back to Projects
      </button>

      <div className="project-detail-header">
        <h1>{project.title}</h1>

        <div className="project-category">
          <span className={`category-badge ${project.category}`}>
            {project.category}
          </span>
        </div>
      </div>

      <div className="project-detail-content">
        <div className="project-carousel">
          <img
            src={(project.images && project.images.length > 0) ? project.images[currentImage] : project.image}
            alt={project.title}
            className="carousel-image"
          />
          <div className="carousel-controls">
            {project.images && project.images.length > 0 && project.images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentImage === index ? 'active' : ''}`}
                onClick={() => setCurrentImage(index)}
                aria-label={`View image ${index + 1} of ${project.images?.length || 0}`}
              />
            ))}
          </div>
        </div>

        <div className="project-detail-description">
          <p className="long-description">{project.longDescription}</p>

          <div className="project-tech-tags">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        {project.details && (
          <div className="project-details-section">
            <div className="detail-card">
              <h3>The Challenge</h3>
              <p>{project.details.challenge}</p>
            </div>

            <div className="detail-card">
              <h3>The Solution</h3>
              <p>{project.details.solution}</p>
            </div>

            <div className="detail-card">
              <h3>The Result</h3>
              <p>{project.details.result}</p>
            </div>
          </div>
        )}

        <div className="project-links">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              View on GitHub
            </a>
          )}

          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-link"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
