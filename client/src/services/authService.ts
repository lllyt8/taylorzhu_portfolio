// client/src/services/authService.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// 用户登录
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      credentials,
      { withCredentials: true } // 允许发送和接收cookie
    );
    return response.data.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 用户注册
export const register = async (data: RegisterData): Promise<User> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      data,
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// 用户登出
export const logout = async (): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// 获取当前登录用户
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    // 如果未登录，返回null而不是抛出错误
    return null;
  }
};
