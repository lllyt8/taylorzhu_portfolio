// server/src/models/Project.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  featured: boolean;
  githubLink?: string;
  demoLink?: string;
  category: string;
  images: string[];
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
}

const ProjectSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    image: { type: String, required: true },
    technologies: [{ type: String }],
    featured: { type: Boolean, default: false },
    githubLink: { type: String },
    demoLink: { type: String },
    category: { type: String, required: true },
    images: [{ type: String }],
    details: {
      challenge: { type: String, required: true },
      solution: { type: String, required: true },
      result: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
