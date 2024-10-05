import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (optional, based on token payload)
      req.user = await userModel.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized access, invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided, unauthorized' });
  }
};