import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import Video from '../models/Video'; // Assuming you have a Video model

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'videos',
    resource_type: 'video',
    format: async () => 'mp4',
  },
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'images',
    resource_type: 'image',
    format: async () => 'jpg',
  },
});

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      req.storage = videoStorage;
    } else if (file.mimetype.startsWith('image/')) {
      req.storage = imageStorage;
    }
    cb(null, true);
  },
});

export const uploadVideo = async (req, res) => {
  // Make sure multer uploads to Cloudinary
  upload.single('videoFile')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading video' });
    }

    try {
      // Retrieve the uploaded video URL from Cloudinary
      const videoUrl = req.file.path; // Cloudinary URL after upload

      // Assuming you want to save the video with additional data
      const newVideo = new Video({
        userId: req.user._id,  // Make sure you're sending the user ID (from authentication)
        title: req.body.title,  // Title sent in the body
        description: req.body.description, // Description sent in the body
        videoLink: videoUrl,  // Use Cloudinary URL as the video link
        thumbnail: req.body.thumbnail,  // Optional: Thumbnail if provided
        videoType: req.file.mimetype,  // The file type (e.g., mp4)
      });

      // Save the video to the database
      await newVideo.save();
      res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });
    } catch (err) {
      res.status(500).json({ error: 'Error saving video data', details: err });
    }
  });
};

export default upload;
