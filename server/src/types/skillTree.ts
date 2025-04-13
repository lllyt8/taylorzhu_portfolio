export interface SkillNode {
    icon: string;
    id: string;
    title: string;
    description: string;
    level: number;
    maxLevel: number;
    color: string;
    position: {
      x: number;
      y: number;
    };
    children?: string[];
    prerequisites?: string[];
    category: string;
    details: {
      technologies: string[];
      projects: string[];
      experience: string;
    };
  }
  
  export interface ConnectionLine {
    start: { x: number; y: number };
    end: { x: number; y: number };
    active: boolean;
    prerequisite: boolean;
  }
  
  export type SkillMap = {
    [key: string]: SkillNode;
  };
