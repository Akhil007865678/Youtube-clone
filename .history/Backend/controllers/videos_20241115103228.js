import Video from '../models/video.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadVideo = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      if (!req.files || !req.files.thumbnail || !req.files.video) {
        return res.status(400).json({ message: 'Thumbnail and video files are required' });
      }
  
      // Upload video file to Cloudinary
      const videoResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { folder: 'videos', resource_type: 'video' },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(req.files.video[0].buffer);
      });
  
      // Upload thumbnail file to Cloudinary
      const thumbnailResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { folder: 'thumbnails' },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(req.files.thumbnail[0].buffer);
      });
  
      // Create new Video document in MongoDB
      const videoUpload = new Video({
        title,
        description,
        thumbnailUrl: thumbnailResult.secure_url,
        videoUrl: videoResult.secure_url,
        user: req.user._id,
      });
  
      await videoUpload.save();
      res.status(201).json({ message: 'Video uploaded successfully', video: videoUpload });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'channelName profilePic userName createdAt');
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllVideoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ user: userId }).populate('user', 'channelName profilePic userName createdAt about');
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default { uploadVideo, getAllVideo, getVideoById, getAllVideoByUserId };
