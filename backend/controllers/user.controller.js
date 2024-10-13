import { userModel, validateUser } from "../models/user.model.js";
import { generateToken } from "../config/jwt.js";

import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    let profilePicUrl = '';
    if (req.file) {
      const localFilePath = req.file.path;
      try {
        const result = await cloudinary.uploader.upload(localFilePath, {
          folder: 'public',
          use_filename: true,
          unique_filename: false,
        });
        profilePicUrl = result.secure_url;
        await fs.unlink(localFilePath);
      } catch (uploadError) {
        console.error('Error uploading file to Cloudinary:', uploadError);
      }
    }

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      profilePic: profilePicUrl,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully!',
      firstName,
      lastName,
      email,
      profilePic: profilePicUrl,
      token,
    });
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login user
const loginUser = async (req) => {
  try {
    console.log('loginUser function called');
    console.log('Request:', req);

    let user;

    if (req.user) {
      // OAuth login
      user = req.user;
      console.log('OAuth login, user:', user);
    } else {
      // Regular login
      const { email, password } = req.body;
      user = await userModel.findOne({ email });
      console.log('Regular login, user found:', user);
      if (!user || !(await user.matchPassword(password))) {
        console.log('Invalid email or password');
        throw new Error('Invalid email or password');
      }
    }

    const token = generateToken(user._id);
    console.log('Token generated:', token);

    return { token };
  } catch (err) {
    console.error('Error in loginUser:', err);
    throw err;
  }
};

// Logout user (client handles token removal)
const logoutUser = (_, res) => {
  res
    .cookie('token', '', { expires: new Date(0), httpOnly: true })
    .status(200)
    .json({ message: "Logged out successfully" });
};


// Show user profile (protected route)
const showUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error in showUserProfile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export { registerUser, loginUser, logoutUser, showUserProfile };