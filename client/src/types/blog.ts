export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  date: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar: string;
  };
  categories: string[];
  tags: string[];
  readTime: number;
  featured: boolean;
  collectionId?: string;
  chapterId?: string;
  order?: number;
}

export interface BlogCollection {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  chapters: BlogChapter[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  totalArticles: number;
  estimatedReadTime: number;
}

export interface BlogChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  articles: string[]; // 文章ID数组
}
