import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  profilePic: {
    type: String,
    default: 'defaultProfilePic.png',
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare provided password with stored password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Joi Validation Schema
const userValidationSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(), // Validate email format
  profilePic: Joi.string().uri().optional(), // Optional profile picture URL
  password: Joi.string().min(6).required(), // Require password to be at least 6 characters
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match', // Custom error message for password mismatch
  }),
});

// Function to validate user input
const validateUser = (user) => {
  return userValidationSchema.validate(user);
};

const userModel = mongoose.model('User', userSchema);

export { userModel, validateUser };