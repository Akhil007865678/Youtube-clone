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
    const thumnail = await cloudinary.uploader.upload(req.file.path, {
        folder: 'thumbnail',
    });

    const videoUpload = new Product({
        title, 
        description,
      imageUrl: result.secure_url,
      description,
      productType
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

const getAllVideo = async(req, res) => {
    try{
        const videos = await Video.find().populate('User',"channelName profilePic userName createdAt");
        res.status(201).json({success: "true", "videos": videos});
    } catch(error) {
        res.status(500).json({error: "Server error"});
    }
}

const getVideoById = async (req, res) => {
    try{
        let {id} = req.params;
        const video = await Video.findById(id);
        res.status(201).json({success: "true", "video": video});
    } catch(error){
        res.status(500).json({error: "Server error"});
    }
}

const getAllVideoByUserId = async(req, res) => {
    try{
        let {userId} = req.params;
        const video = await Video.find({user:userId}).populate('User',"channelName profilePic userName createdAt about");
        res.status(201).json({success: 'true', "video": video});
    } catch(error) {
        res.status(500).json({error: "Server error"});
    }
}


export default {uploadVideo, getAllVideo, getVideoById, getAllVideoByUserId};