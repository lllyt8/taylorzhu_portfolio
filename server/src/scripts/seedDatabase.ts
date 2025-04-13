// server/src/scripts/seedDatabase.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import BlogPost from "../models/BlogPost";
import BlogCollection from "../models/BlogCollection";
import Project from "../models/Project";
import { blogPosts } from "../data/blog/blogData";
import { blogCollections } from "../data/blog/collectionsData";
import { projects } from "../data/projects"; // 确保路径正确

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://htzhu3:A5vqbaR1lFjKCuA0@cluster0.byzcpbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const seedDatabase = async () => {
  try {
    // 连接数据库
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // 清空现有数据
    await BlogPost.deleteMany({});
    await BlogCollection.deleteMany({});
    await Project.deleteMany({});

    console.log("Existing data cleared");

    // 导入博客文章
    await BlogPost.insertMany(blogPosts);
    console.log(`${blogPosts.length} blog posts imported`);

    // 导入博客合集
    await BlogCollection.insertMany(blogCollections);
    console.log(`${blogCollections.length} blog collections imported`);

    // 导入项目
    await Project.insertMany(projects);
    console.log(`${projects.length} projects imported`);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
