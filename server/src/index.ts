// server/src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {
  limiter,
  validateRequest,
  errorHandler,
  authenticate,
} from "./middleware/auth";
import { Server } from "http";
import chatRoutes from "./routes/chatRoutes";
import formRoutes from "./routes/formRoutes";
import blogRoutes from "./routes/blogRoutes";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";
import { connectDatabase } from "./config/database";

dotenv.config();

// 连接数据库
connectDatabase();

const app = express();
let server: Server;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(limiter);
app.use(cookieParser());

// 使用路由
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api/form", formRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/projects", projectRoutes);

// 测试认证端点
app.get("/api/test-auth", authenticate, (req, res) => {
  res.json({ message: "Authentication successful", user: (req as any).user });
});

app.use(errorHandler);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
