const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Cloudinary storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'video',
    format: async () => 'mp4',
  },
});

// Set up Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    resource_type: 'image',
    format: async () => 'jpg',
  },
});

// Define upload configuration for both video and image fields
const upload = multer({
  storage: multer.diskStorage({}), // This storage type is just a placeholder; we’ll use storage dynamically
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      req.storage = videoStorage;
    } else if (file.mimetype.startsWith('image/')) {
      req.storage = imageStorage;
    }
    cb(null, true);
  },
});

module.exports = upload;
