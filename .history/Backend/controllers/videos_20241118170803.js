import Video from '../models/video.js';
import User from '../models/User.js'
import cloudinary from 'cloudinary';

const videoUpload = async (req, res) => {
  try {
    const {title, description} = req.body;
    if (!req.files || (!req.files.video && !req.files.thumbnail)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const videoUrl = req.files.video ? req.files.video[0].path : null;
    const thumbnailUrl = req.files.thumbnail ? req.files.thumbnail[0].path : null;

    const videoResult = await cloudinary.v2.uploader.upload(req.files.video[0].path, {
      folder: 'videos',
      resource_type: 'video',
      format: 'mp4',
    });
    
    const thumbnailResult = await cloudinary.v2.uploader.upload(req.files.thumbnail[0].path, {
      folder: 'thumbnails',
      resource_type: 'image',
      format: 'jpg',
    });
    
    const videoUpload = new Video({
      title,
      description,
      videoLink: videoResult.secure_url,
      thumbnail: thumbnailResult.secure_url,
      User: req.user._id,
      like: 0,
      deslike: 0,
    });
    await videoUpload.save();

    res.status(200).json({
      message: 'Files uploaded successfully',
      videoLink: videoResult.secure_url,
      thumbnail: thumbnailResult.secure_url,
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({
      error: error.message || 'Failed to upload files',
      details: error,
    });
  }
}

const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate('User', 'channelName profilePic userName createdAt');
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    const user = await User.findById(video.User);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ success: true, video, user});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const updateLikesDislikes = async (req, res) => {
  try {
    const { id } = req.params; // Video ID
    const { like, deslike } = req.body; // Action
    const userId = req.user._id; // Logged-in User ID

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    // Check if the user has already liked or disliked
    if (like && video.likedBy.includes(userId)) {
      return res.status(400).json({ success: false, message: 'User already liked this video' });
    }

    if (deslike && video.dislikedBy.includes(userId)) {
      return res.status(400).json({ success: false, message: 'User already disliked this video' });
    }

    // Update likes or dislikes
    if (like) {
      video.like += 1;
      video.likedBy.push(userId);
    }

    if (deslike) {
      video.deslike += 1;
      video.dislikedBy.push(userId);
    }

    await video.save();

    res.status(200).json({ success: true, message: 'Action recorded', video });
  } catch (error) {
    console.error('Error updating likes/dislikes:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
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

export default { getAllVideo, getVideoById, getAllVideoByUserId, videoUpload, updateLikesDislikes };
