// server/src/controllers/authController.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

// 用户注册
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists with this email or username",
      });
    }

    // 创建新用户
    const user = new User({
      username,
      email,
      password,
      role: "admin", // 因为这是管理员系统，我们默认所有注册用户为管理员
    });

    await user.save();

    // 创建并返回JWT令牌
    const token = user.generateAuthToken();

    // 设置cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 生产环境使用HTTPS
      maxAge: 8 * 60 * 60 * 1000, // 8小时
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 用户登录
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 生成令牌
    const token = user.generateAuthToken();

    // 设置cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 8 * 60 * 60 * 1000, // 8小时
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// 用户登出
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully" });
};

// 获取当前用户信息
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // req.user 将由身份验证中间件设置
    const user = await User.findById((req as any).user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
