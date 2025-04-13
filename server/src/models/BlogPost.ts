// server/src/models/BlogPost.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  date: Date;
  updatedAt?: Date;
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

const BlogPostSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String },
    coverImage: { type: String, required: true },
    date: { type: Date, required: true },
    updatedAt: { type: Date },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    categories: [{ type: String }],
    tags: [{ type: String }],
    readTime: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    collectionId: { type: String },
    chapterId: { type: String },
    order: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
