import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// Connect to the database
connectDB()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health check route
app.get('/health', (_, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// User registration routes
app.use('/api/users', userRoutes);

// Global error handling middleware
app.use((err, _, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
