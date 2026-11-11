
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import settingRoutes from './routes/settings.js';
import messageRoutes from './routes/messages.js';
import statRoutes from './routes/stats.js';
import errorHandler from './middleware/error.js';

const app = express();

// CORS configuration
const allowedOrigins = (
  process.env.CLIENT_URL || 'http://localhost:5173'
)
  .split(',')
  .map(url => url.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

// Middleware
app.use(express.json());

// MongoDB connection cache
let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is missing');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .catch(error => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
}

// Database connection before API requests
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StationeryX API is running',
    database: mongoose.connection.readyState === 1
      ? 'connected'
      : 'disconnected'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stats', statRoutes);

// Error handling (must be last)
app.use(errorHandler);

// Export Express app for Vercel
export default app;

// Local development server
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `StationeryX server running on http://localhost:${PORT}`
        );
      });
    })
    .catch(error => {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    });
}
