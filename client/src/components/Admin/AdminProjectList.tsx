// client/src/components/Admin/AdminProjectList.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects, deleteProject } from '../../services/api';
import ProjectForm from './ProjectForm';
import { Project } from '../../types/projects';
import '../../styles/admin-projects.css'; // 我们稍后会创建这个样式文件

type ViewMode = 'list' | 'new' | 'edit';

const AdminProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete project');
      }
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setViewMode('edit');
  };

  const handleFormSuccess = () => {
    setViewMode('list');
    setSelectedProject(null);
    fetchProjects();
  };

  const filterProjects = () => {
    return projects.filter(project => {
      if (filterCategory === 'all') return true;
      return project.category === filterCategory;
    });
  };

  if (viewMode === 'new') {
    return (
      <ProjectForm
        onSuccess={handleFormSuccess}
        onCancel={() => setViewMode('list')}
      />
    );
  }

  if (viewMode === 'edit' && selectedProject) {
    return (
      <ProjectForm
        initialData={selectedProject}
        onSuccess={handleFormSuccess}
        onCancel={() => setViewMode('list')}
      />
    );
  }

  return (
    <div className="admin-project-list">
      <div className="admin-project-header">
        <h1>Manage Projects</h1>
        <button 
          onClick={() => setViewMode('new')} 
          className="new-project-btn"
        >
          Create New Project
        </button>
      </div>
      
      <div className="admin-project-filters">
        <div className="category-filter">
          <select
            aria-label="Filter projects by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            <option value="research">Research</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="admin-project-grid">
          {filterProjects().length > 0 ? (
            filterProjects().map(project => (
              <motion.div
                key={project.id}
                className="admin-project-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} />
                  {project.featured && (
                    <div className="featured-badge">Featured</div>
                  )}
                </div>
                <div className="project-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-tech-tags">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="more-tag">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="project-category">
                    <span className={`category-badge ${project.category}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="project-actions">
                    <button 
                      onClick={() => handleEdit(project)} 
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)} 
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-projects-message">
              No projects found. Try a different category filter or create a new project.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjectList;
