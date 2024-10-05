import { userModel, validateUser } from '../models/user.model.js';
import { generateToken } from '../config/jwt.js'; // JWT utility

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Validate incoming request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered.' });

    // Ensure passwords match
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Handle profile picture upload
    let profilePicUrl = '';
    if (req.file) profilePicUrl = req.file.path;

    // Create new user
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password, // Password should be hashed via pre-hook in your model
      profilePic: profilePicUrl,
    });

    // Generate JWT for the new user
    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Logout user (client handles token removal)
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Show user profile (protected route)
const showUserProfile = async (req, res) => {
  try {
    // Fetch user by ID (user ID comes from JWT, attached by authMiddleware)
    const user = await userModel.findById(req.user._id).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export { registerUser, loginUser, logoutUser, showUserProfile };