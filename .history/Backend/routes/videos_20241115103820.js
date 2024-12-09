/*import express from "express";
import videoController from "../controllers/videos.js";
const {uploadVideo, getAllVideo, getVideoById, getAllVideoByUserId} = videoController;
import auth from '../middleware/authentication.js';
const router = express.Router();

router.post('/video', auth, uploadVideo);
router.get('/allvideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);
export default router;
*/

import express from "express";
import videoController from "../controllers/videos.js";
const { uploadVideo, getAllVideo, getVideoById, getAllVideoByUserId } = videoController;
import auth from '../middleware/authentication.js';
import multer from 'multer';

import upload from '../Connection/upload.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/video', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), uploadVideo);

router.get('/allvideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);

export default router;
