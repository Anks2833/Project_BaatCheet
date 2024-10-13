import multer from 'multer';
import path from 'path';

// Multer storage configuration for local file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Save to public/uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`); // Custom filename
  },
});

// Multer upload configuration with file size limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit to 5MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(file.mimetype);
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

export default upload;
