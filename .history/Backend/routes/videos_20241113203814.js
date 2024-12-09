import express from "express";
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

const router = express.Router();

// Configure Multer for memory storage (suitable for direct upload to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes with Multer middleware for file upload
router.post('/video', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), uploadVideo);

router.get('/allvideo', getAllVideo);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);

export default router;
