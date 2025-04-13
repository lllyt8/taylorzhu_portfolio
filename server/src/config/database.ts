// server/src/config/database.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 替换为你从MongoDB Atlas获取的连接字符串
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://htzhu3:A5vqbaR1lFjKCuA0@cluster0.byzcpbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
