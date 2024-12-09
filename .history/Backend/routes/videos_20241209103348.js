import express from "express";
import videoController from "../controllers/videos.js";
const { getAllVideo, getVideoById, getAllVideoByUserId, videoUpload, updateLikesDislikes } = videoController;
import auth from '../middleware/authentication.js';
import upload from '../middleware/uploading.js';
import UserVideo from "../../frontend/src/components/UserVideo/video.js";

const router = express.Router();

router.post('/videoupload', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), videoUpload);
 
router.get('/allvideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);
router.put('/video/:id/likes-dislikes', updateLikesDislikes);
router.get('/userVideo', auth, UserVideo)

export default router;
