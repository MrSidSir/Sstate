// api/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


import UserRouter from './routes/user.route.js';
import AuthRouter from './routes/auth.route.js';

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = 3000;


app.use(cookieParser());

// Middleware
app.use(express.json());

// CORS for frontend access
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// DB Connection
mongoose.connect("mongodb+srv://irshad1554:jFPbK2Qu1Ycvw97l@sidestate.flbqdyq.mongodb.net/?retryWrites=true&w=majority&appName=sidEstate")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
