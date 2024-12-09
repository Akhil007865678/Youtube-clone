import express from "express";
import videoController from "../controllers/videos.js";
const { getAllVideo, getVideoById, getAllVideoByUserId, videoUpload } = videoController;
import auth from '../middleware/authentication.js';
import upload from '../middleware/uploading.js';

const router = express.Router();

router.post('/videoupload', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), videoUpload);
 
router.get('/allvideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);

export default router;
