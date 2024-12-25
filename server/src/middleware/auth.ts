// server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// 限制请求频率
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟窗口期
  max: 100, // 限制每个 IP 100 个请求
  message: 'Too many requests from this IP, please try again later.'
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

// 错误处理中间件
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
