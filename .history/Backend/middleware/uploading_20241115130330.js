import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Cloudinary storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'videos',
    resource_type: 'video',
    format: async () => 'mp4',  // Default format for videos
  },
});

// Set up Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'images',
    resource_type: 'image',
    format: async () => 'jpg',  // Default format for images
  },
});

// Define upload configuration for both video and image fields
const upload = multer({
  // Use dynamic storage based on file type
  storage: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, videoStorage);
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, imageStorage);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
}).fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);

export default upload;
