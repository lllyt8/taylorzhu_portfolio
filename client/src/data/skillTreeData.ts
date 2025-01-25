import { SkillMap } from '../types/skillTree';

export const skillTreeData: SkillMap = {
  'fullstack': {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end web application development and architecture',
    level: 3,
    maxLevel: 3,
    color: '#4CAF50',
    position: { x: 400, y: 100 },
    children: ['frontend', 'backend'],
    prerequisites: [],
    category: 'core',
    details: {
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      projects: ['Enterprise Web Applications', 'E-commerce Platforms'],
      experience: '3+ years of full stack development experience'
    }
  },
  'frontend': {
    id: 'frontend',
    title: 'Frontend Mastery',
    description: 'Advanced frontend development and optimization',
    level: 3,
    maxLevel: 3,
    color: '#2196F3',
    position: { x: 200, y: 250 },
    children: ['react', 'performance'],
    prerequisites: ['fullstack'],
    category: 'specialization',
    details: {
      technologies: ['React', 'TypeScript', 'Webpack', 'CSS3'],
      projects: ['Web Performance Optimization', 'UI/UX Enhancement'],
      experience: 'Specialized in modern frontend frameworks'
    }
  },
  'backend': {
    id: 'backend',
    title: 'Backend Architecture',
    description: 'Scalable backend systems and APIs',
    level: 3,
    maxLevel: 3,
    color: '#9C27B0',
    position: { x: 600, y: 250 },
    children: ['databases', 'apis'],
    prerequisites: ['fullstack'],
    category: 'specialization',
    details: {
      technologies: ['Node.js', 'Express', 'MongoDB', 'Redis'],
      projects: ['Microservices Architecture', 'API Design'],
      experience: 'Expert in backend system design'
    }
  },
  'react': {
    id: 'react',
    title: 'React Ecosystem',
    description: 'Advanced React development and patterns',
    level: 3,
    maxLevel: 3,
    color: '#00BCD4',
    position: { x: 100, y: 400 },
    children: [],
    prerequisites: ['frontend'],
    category: 'technology',
    details: {
      technologies: ['React', 'Redux', 'Next.js', 'React Native'],
      projects: ['SPA Development', 'Mobile Applications'],
      experience: 'Deep expertise in React ecosystem'
    }
  },
  'performance': {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Web performance and optimization techniques',
    level: 3,
    maxLevel: 3,
    color: '#FFC107',
    position: { x: 300, y: 400 },
    children: [],
    prerequisites: ['frontend'],
    category: 'technology',
    details: {
      technologies: ['Webpack', 'Lighthouse', 'Browser DevTools'],
      projects: ['Performance Auditing', 'Optimization Implementation'],
      experience: 'Specialized in web performance optimization'
    }
  },
  'databases': {
    id: 'databases',
    title: 'Database Design',
    description: 'Database architecture and optimization',
    level: 3,
    maxLevel: 3,
    color: '#FF5722',
    position: { x: 500, y: 400 },
    children: [],
    prerequisites: ['backend'],
    category: 'technology',
    details: {
      technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch'],
      projects: ['Database Optimization', 'Data Modeling'],
      experience: 'Expert in database design and optimization'
    }
  },
  'apis': {
    id: 'apis',
    title: 'API Development',
    description: 'RESTful and GraphQL API design',
    level: 3,
    maxLevel: 3,
    color: '#795548',
    position: { x: 700, y: 400 },
    children: [],
    prerequisites: ['backend'],
    category: 'technology',
    details: {
      technologies: ['REST', 'GraphQL', 'OpenAPI', 'gRPC'],
      projects: ['API Gateway Implementation', 'Microservices'],
      experience: 'Specialized in API design and development'
    }
  }
};
