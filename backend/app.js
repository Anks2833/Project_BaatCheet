import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/db.js';
import passport from './config/passport.js';
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
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Health check route
app.get('/health', (_, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// User registration routes
app.use('/api/users', userRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;