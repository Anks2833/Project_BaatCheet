import express from 'express';
import { registerUser, loginUser, logoutUser, showUserProfile } from '../controllers/user.controller.js';
import upload from '../config/multer.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route for user registration (POST /api/users/register)
router.post('/register', upload.single('profilePic'), registerUser);

// Route for user login (POST /api/users/login)
router.post('/login', loginUser);

// Route for user logout (POST /api/users/logout) - Handled on client-side by deleting JWT token
router.post('/logout', logoutUser);

// Route for getting user profile (GET /api/users/profile) - Protected by JWT authentication
router.get('/profile', authMiddleware, showUserProfile);

export default router;