import express from 'express';
import { registerUser, loginUser, logoutUser, showUserProfile } from '../controllers/user.controller.js';
import upload from '../config/multer.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import passport from '../config/passport.js';

const router = express.Router();

// Route for user registration (POST /api/users/register)
router.post('/register', upload.single('profilePic'), registerUser);

// Route for user login (POST /api/users/login)
router.post('/login', loginUser);

// Route for getting user profile (GET /api/users/profile) - Protected by JWT authentication
router.get('/profile', authMiddleware, showUserProfile);


router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            console.log('Google OAuth callback reached');
            console.log('User from request:', req.user);
            const { token } = await loginUser({ user: req.user });
            console.log('Token generated:', token);
            res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
        } catch (error) {
            console.error('Error in Google OAuth callback:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }
    }
);

export default router;