import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js'; // Adjust the import path as necessary

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', // Specify the folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  },
});

const upload = multer({ storage: storage });

export default upload;
