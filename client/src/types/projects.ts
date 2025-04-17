// src/types/projects.ts

export type ProjectCategory = "frontend" | "backend" | "fullstack" | "research";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  featured: boolean;
  githubLink?: string;
  demoLink?: string;
  category: ProjectCategory;
  images?: string[];
  details?: {
    challenge: string;
    solution: string;
    result: string;
  };
}

export interface Category {
  id: string;
  label: string;
}

// 常量配置
export const CATEGORIES: Category[] = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "research", label: "Research" },
];

// 项目数据
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Distributed Hashtable using Chord Protocol",
    description: "Scalable distributed key-value store implementation",
    longDescription:
      "Developed a highly available and scalable distributed key-value store by implementing the Chord protocol. Implemented consistent hashing for the distribution of keys and replication of factor 2 to make the system fault-tolerant.",
    image: "/api/placeholder/800/400",
    technologies: ["Java", "RMI", "Distributed Systems"],
    featured: true,
    githubLink: "https://github.com/example/chord",
    category: "backend",
  },
  {
    id: 2,
    title: "Fund Me - Crowd Funding Platform",
    description: "Modern crowdfunding platform with clean architecture",
    longDescription:
      "A full-stack crowdfunding platform built with React and Node.js. Implements clean architecture principles and includes features like campaign creation, secure payments, and social sharing.",
    image: "/api/placeholder/800/400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    featured: true,
    githubLink: "https://github.com/example/fundme",
    demoLink: "https://fundme-demo.com",
    category: "fullstack",
  },
];
