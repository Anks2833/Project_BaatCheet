import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 255,
  },
  profilePic: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password is required only if googleId is not present
    },
    minlength: 6,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare provided password with stored password
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Joi Validation Schema
const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).when('googleId', { 
      is: Joi.exist(), 
      then: Joi.optional(), 
      otherwise: Joi.required() 
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).when('googleId', { 
      is: Joi.exist(), 
      then: Joi.optional(), 
      otherwise: Joi.required() 
    }),
    profilePic: Joi.string().allow(''),
    googleId: Joi.string()
  });

  return schema.validate(user);
};

const userModel = mongoose.model('User', userSchema);

export { userModel, validateUser };