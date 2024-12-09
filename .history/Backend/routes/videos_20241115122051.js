import express from "express";
import videoController from "../controllers/videos.js";
const { uploadVideo, getAllVideo, getVideoById, getAllVideoByUserId, videoUpload } = videoController;
import auth from '../middleware/authentication.js';
import upload from '../Connection/upload.js';
import upload from '../middleware'

const router = express.Router();

router.post('/video', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), uploadVideo);
router.post('/videoupload', auth, )
 
router.get('/allvideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);

export default router;
