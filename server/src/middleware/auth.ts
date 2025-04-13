// server/src/middleware/auth.ts
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// 限制请求频率
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟窗口期
  max: 100, // 限制每个 IP 100 个请求
  message: "Too many requests from this IP, please try again later.",
});

// 验证请求中间件
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 这里可以添加请求验证逻辑
  // 例如验证必要的请求头、参数等

  // 如果验证失败，可以返回错误
  // if (!someCondition) {
  //   return res.status(400).json({ error: 'Invalid request' });
  // }

  // 验证通过，继续下一个中间件
  next();
};

interface JwtPayload {
  id: string;
  username: string;
  role: string;
}

// 验证用户是否已登录
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 从请求中获取令牌
    const token =
      req.cookies.auth_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // 验证令牌
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    // 查找用户
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // 将用户信息添加到请求对象
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication required" });
  }
};

// 验证用户是否为管理员
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user && (req as any).user.role === "admin") {
    return next();
  }

  res.status(403).json({ error: "Admin access required" });
};

// 错误处理中间件
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // 处理不同类型的错误
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
