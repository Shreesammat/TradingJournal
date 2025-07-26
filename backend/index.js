import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import tradeRouter from './routes/tradeRouter.js';
import heatmapRouter from './routes/heatmapRouter.js';
import imageRouter from './routes/imageRouter.js';

// Config imports
import connectDB from './config/db.js';
import setupSwagger from './config/swaggerConfig.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Get allowed origins from env
const allowedOrigins = process.env.CLIENT?.split(',') || [];

// Initialize Express
const app = express();

// CORS config
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ CORS BLOCKED:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};

// Apply CORS and preflight
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Swagger (enabled only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('📘 Swagger is enabled (dev mode)');
  setupSwagger(app);
} else {
  console.log('🚫 Swagger is disabled in production');
}

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Trading Journal API!');
});

// Mount API routers
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/trade', tradeRouter);
app.use('/heatmap', heatmapRouter);
app.use('/image', imageRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`🌐 Allowed origins:`, allowedOrigins);
});