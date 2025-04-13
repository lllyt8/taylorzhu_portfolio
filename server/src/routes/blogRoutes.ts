// server/src/routes/blogRoutes.ts
import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllCollections,
  getCollectionById,
} from "../controllers/blogController";

const router = express.Router();

// 博客文章路由
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

// 博客合集路由
router.get("/collections", getAllCollections);
router.get("/collections/:id", getCollectionById);

export default router;
