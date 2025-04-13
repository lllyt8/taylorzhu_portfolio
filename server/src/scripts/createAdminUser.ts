// server/src/scripts/createAdminUser.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://htzhu3:A5vqbaR1lFjKCuA0@cluster0.byzcpbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const createAdminUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // 检查是否已存在管理员
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.username);
      await mongoose.disconnect();
      return;
    }

    // 创建新管理员用户
    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: "password123", // 这只是示例，实际应使用复杂密码
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
