///import Video from '../models/video.js';
const Video = require('../models/video.js');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
//const User = require('../models/User');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = await cloudinary.uploader.upload(req.file.path, {
      folder: 'videos',
    });
    const thumbnail = await cloudinary.uploader.upload(req.file.path, {
        folder: 'thumbnail',
    });

    const videoUpload = new Product({
        title, 
        description,
        thumbnailUrl: thumbnail.secure_url,
        videoUrl: video.secure_url
    });

    await videoUpload.save();

    res.status(200).json({ message: 'Product uploaded successfully', product: newProduct });
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
/*const uploadVideo = async (req, res) => {
    try{
        const {title, description, videoType, thumbnail} = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'video',
        });
        const videoUpload = new Video({user: req.user._id, title, description, videoLink: result.secure_url, videoType, thumbnail});
        
        await videoUpload.save();
        res.status(201).json({success: 'true', videoUpload});
    } catch(error){
        res.status(500).json({error: 'Server error'});
    }
}*/


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

    // Ensure `req.file` is defined and files are correctly separated for thumbnail and video
    if (!req.files || !req.files.thumbnail || !req.files.video) {
      return res.status(400).json({ message: 'Thumbnail and video files are required' });
    }

    const videoResult = await cloudinary.v2.uploader.upload(req.files.video[0].path, {
      folder: 'videos',
      resource_type: 'video',
    });

    const thumbnailResult = await cloudinary.v2.uploader.upload(req.files.thumbnail[0].path, {
      folder: 'thumbnails',
    });

    const videoUpload = new Video({
      title,
      description,
      thumbnailUrl: thumbnailResult.secure_url,
      videoUrl: videoResult.secure_url,
      user: req.user._id, // Assuming user ID is set in `req.user`
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
