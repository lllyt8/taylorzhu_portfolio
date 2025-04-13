import { BlogCollection } from "../../types/blog";

export const blogCollections: BlogCollection[] = [
  {
    id: "energy-systems",
    title: "Modern Energy Storage System Design",
    slug: "modern-energy-storage-design",
    description:
      "In-depth exploration of energy storage system design, implementation, and optimization, from architecture to technical details.",
    coverImage: "/images/collections/energy-systems.jpg",
    author: {
      name: "Taylor Zhu",
      avatar: "/profile_pic.jpg",
    },
    chapters: [
      {
        id: "fundamentals",
        title: "Fundamental Architecture",
        description:
          "Basic architecture and design principles of energy storage systems",
        order: 1,
        articles: ["2"],
      },
      {
        id: "data-management",
        title: "Data Management",
        description:
          "Data collection, storage, and analysis in energy storage systems",
        order: 2,
        articles: ["2"],
      },
    ],
    tags: ["Energy Storage", "System Design", "Renewable Energy"],
    createdAt: "2023-05-01",
    updatedAt: "2023-06-15",
    featured: true,
    totalArticles: 1,
    estimatedReadTime: 12,
  },
];
