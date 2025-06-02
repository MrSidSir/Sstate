import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(cookieParser());
app.use(express.json());

// CORS for frontend on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Optional: Serve frontend if you have build files
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



// // api/index.js
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cors from 'cors';
// import authRouter from './routes/auth.route.js';
// import cookieParser from 'cookie-parser';


// import UserRouter from './routes/user.route.js';
// import AuthRouter from './routes/auth.route.js';

// // __dirname setup for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env variables
// dotenv.config({ path: path.join(__dirname, '../.env') });

// const app = express();
// const PORT = 3000;


// app.use(cookieParser());

// // Middleware
// app.use(express.json());

// // CORS for frontend access
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// // DB Connection
// mongoose.connect("mongodb+srv://irshad1554:jFPbK2Qu1Ycvw97l@sidestate.flbqdyq.mongodb.net/?retryWrites=true&w=majority&appName=sidEstate")
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // Routes
// app.use('/api/user', UserRouter);
// app.use('/api/auth', AuthRouter);

// // Server Start
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
