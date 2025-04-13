// server/src/types/project.ts
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
  images: string[];
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
}
