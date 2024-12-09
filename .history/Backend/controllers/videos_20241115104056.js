import Video from '../models/video.js';
//import cloudinary from 'cloudinary';
//import dotenv from 'dotenv';


const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.files || (!req.files.video && !req.files.image)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    // Retrieve the file URLs
    const videoUrl = req.files.video ? req.files.video[0].path : null;
    const imageUrl = req.files.image ? req.files.image[0].path : null;
    
    const videoUpload = new Video({
      title,
      description,
      videoUrl,
      imageUrl,
      user: req.user._id,
    });
    await videoUpload.save();
    res.status(200).json({
      message: 'Files uploaded and URLs saved successfully',
      media: newMedia
    });
  } catch (error) {
    console.error('Error uploading files and saving URLs:', error);
    res.status(500).json({
      error: error.message || 'Failed to upload files and save URLs',
      details: error,
    });
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
