// server/src/controllers/blogController.ts
import { Request, Response } from "express";
import BlogPost, { IBlogPost } from "../models/BlogPost";
import BlogCollection from "../models/BlogCollection";

// 获取所有博客文章
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

// 获取单篇博客文章
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ id: req.params.id });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

// 创建新博客文章
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

// 更新博客文章
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

// 删除博客文章
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOneAndDelete({ id: req.params.id });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};

// 获取所有合集
export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const collections = await BlogCollection.find();
    res.status(200).json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};

// 获取单个合集
export const getCollectionById = async (req: Request, res: Response) => {
  try {
    const collection = await BlogCollection.findOne({ id: req.params.id });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
};
