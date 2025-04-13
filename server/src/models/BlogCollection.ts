// server/src/models/BlogCollection.ts
import mongoose, { Document, Schema } from "mongoose";

interface IBlogChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  articles: string[];
}

export interface IBlogCollection extends Document {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  chapters: IBlogChapter[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  totalArticles: number;
  estimatedReadTime: number;
}

const BlogCollectionSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    chapters: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        order: { type: Number, required: true },
        articles: [{ type: String }],
      },
    ],
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    totalArticles: { type: Number, required: true },
    estimatedReadTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBlogCollection>(
  "BlogCollection",
  BlogCollectionSchema
);
