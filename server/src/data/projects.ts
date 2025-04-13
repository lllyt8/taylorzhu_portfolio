// server/src/data/projects.ts
import { Project } from "../types/projects";

export const projects: Project[] = [
  {
    id: 1,
    title: "Distributed Systems Engineer (RPC Frameworks)",
    description:
      "Designed and implemented a high-performance RPC framework supporting service registration, discovery, and remote invocation in distributed environments.",
    longDescription:
      "Developed a highly available and scalable distributed key-value store by implementing the Chord protocol. Implemented consistent hashing for the distribution of keys and replication of factor 2 to make the system fault-tolerant.",
    image: "/api/placeholder/800/400",
    technologies: ["C++", "RPC", "Distributed Systems", "Zookeeper", "Muduo"],
    featured: true,
    githubLink: "https://github.com/lllyt8/Distributed-RPC-Service-Framework",
    category: "backend",
    images: ["../../../projects/RPC.png", "/api/placeholder/800/400"],
    details: {
      challenge:
        "Developed custom binary protocol with length-prefix framing to resolve TCP packet fragmentation, achieving data integrity under 10K+ concurrent connections.",
      solution:
        "Integrated Zookeeper for service discovery, implementing Watcher-based node monitoring to dynamically update client endpoints with <100ms latency during service churn.",
      result:
        "Built a high-concurrency network layer using Muduo's Reactor pattern, achieving 50K+ RPC calls/sec with 1ms average latency through IO-thread and worker-thread decoupling. Enhanced observability by integrating Glog for multi-level logging, reducing issue diagnosis time by 40% through structured log analysis.",
    },
  },
  {
    id: 2,
    title: "Won 1st Place at Solaris GPT-4o vs Gemini 1.5 Hackathon",
    description: "An AI-negotiate agent for restaurants and vendors.",
    longDescription:
      "A full-stack crowdfunding platform built with React and Node.js. Implements clean architecture principles and includes features like campaign creation, secure payments, and social sharing.",
    image: "/api/placeholder/800/400",
    technologies: ["React", "Python", "Django", "Next.js", "Stripe"],
    featured: true,
    githubLink: "https://devpost.com/tyzhu",
    category: "fullstack",
    images: ["../../../projects/george.jpg"],
    details: {
      challenge:
        "Designed an innovative AI negotiation platform during a hackathon, leveraging GPT-4 to enable automated supplier communications via WhatsApp for restaurant owners, demonstrating rapid prototyping and problem-solving capabilities.",
      solution:
        "Engineered a responsive frontend using Next.js and ShadCN, featuring real-time updates, interactive price comparison dashboards, and data visualization components for informed decision-making.",
      result:
        "Implemented comprehensive end-to-end workflows including supplier onboarding, automated negotiation paths, and detailed transaction tracking, receiving strong positive feedback from restaurant owners during demo presentations.",
    },
  },
];
