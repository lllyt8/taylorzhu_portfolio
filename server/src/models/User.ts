// server/src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  generateAuthToken: () => string;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

// 密码加密中间件
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  // 只在密码被修改时才进行加密
  if (!user.isModified("password")) return next();

  try {
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    // 加密密码
    const hashedPassword = await bcrypt.hash(user.password, salt);
    // 替换明文密码
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// 比较密码的方法
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// 生成JWT令牌的方法
UserSchema.methods.generateAuthToken = function (): string {
  const user = this;
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "8h" }
  );

  return token;
};

export default mongoose.model<IUser>("User", UserSchema);
