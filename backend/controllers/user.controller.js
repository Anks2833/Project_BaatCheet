import { userModel, validateUser } from "../models/user.model.js";
import { generateToken } from "../config/jwt.js";

import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Validate incoming request body
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    // Ensure passwords match
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Handle profile picture upload
    let profilePicUrl = "";
    if (req.file) {
      const localFilePath = req.file.path;

      // Upload the local file to Cloudinary
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: 'public', // Cloudinary folder
        use_filename: true,
        unique_filename: false,
      });

      // Get the Cloudinary URL
      profilePicUrl = result.secure_url;

      // Delete the local file after uploading to Cloudinary
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error('Error deleting local file:', err);
        }
      });
    }

    // Create new user with Cloudinary profile picture URL
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      profilePic: profilePicUrl,
    });

    // Generate JWT for the new user
    const token = generateToken(newUser._id);

    // Respond with success
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (err) {
    // Handle server error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({ message: "Logged in successfully", token });
    console.log(req.user)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
    // Fetch user by ID (user ID comes from JWT, attached by authMiddleware)
    const user = await userModel.findById(req.user._id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { registerUser, loginUser, logoutUser, showUserProfile };