import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/projects-page.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  link: string;
  images: string[];  // 项目截图
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Distributed Systems Engineer (RPC Frameworks)",
    description: "Designed and implemented a high-performance RPC framework supporting service registration, discovery, and remote invocation in distributed environments.",
    technologies: ["C++", "RPC", "Distributed Systems", "Zookeeper", "Muduo"],
    category: 'backend',
    link: "https://github.com/lllyt8/Distributed-RPC-Service-Framework",
    images: ["../../../projects/RPC.png", "/api/placeholder/800/400"],
    details: {
      challenge: "Developed custom binary protocol with length-prefix framing to resolve TCP packet fragmentation, achieving data integrity under 10K+ concurrent connections.",
      solution: "Integrated Zookeeper for service discovery, implementing Watcher-based node monitoring to dynamically update client endpoints with <100ms latency during service churn.",
      result: "Built a high-concurrency network layer using Muduo’s Reactor pattern, achieving 50K+ RPC calls/sec with 1ms average latency through IO-thread and worker-thread decoupling. Enhanced observability by integrating Glog for multi-level logging, reducing issue diagnosis time by 40% through structured log analysis."
    }
  },
  {
    id: 2,
    title: "Won 1st Place at Solaris GPT-4o vs Gemini 1.5 Hackathon",
    description: "An AI-negotiate agent for restruants and vendors.",
    technologies: ["React", "Python", "Django", "Next.js", "Stripe"],
    category: 'fullstack',
    link: "https://devpost.com/tyzhu",
    images: ["../../../projects/george.jpg"],
    details: {
      challenge: "Designed an innovative AI negotiation platform during a hackathon, leveraging GPT-4 to enable automated supplier communications via WhatsApp for restaurant owners, demonstrating rapid prototyping and problem-solving capabilities.",
      solution: "Engineered a responsive frontend using Next.js and ShadCN, featuring real-time updates, interactive price comparison dashboards, and data visualization components for informed decision-making.",
      result: "Implemented comprehensive end-to-end workflows including supplier onboarding, automated negotiation paths, and detailed transaction tracking, receiving strong positive feedback from restaurant owners during demo presentations."
    }
  }
];

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
          <button className="preview-btn">View More</button>
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
          <button className="close-btn" onClick={onClose}>&times;</button>
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

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'research', label: 'Research' }
  ];

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);

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
