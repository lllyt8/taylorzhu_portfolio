// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { limiter, validateRequest, errorHandler } from './middleware/auth';
import { Server } from 'http';
import chatRoutes from './routes/chatRoutes';
import formRoutes from './routes/formRoutes';  // 新增这行

dotenv.config();

const app = express();
let server: Server;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

// 使用路由
app.use('/api', chatRoutes);
app.use('/api/form', formRoutes);  // 新增这行

app.use(errorHandler);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
