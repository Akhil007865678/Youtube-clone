import express from 'express';
import {addComment, getCommentByVideoId} from '../controllers/comments.js';
import auth from '../middleware/authentication.js';

const router = express.Router();

router.post('/comment', auth, addComment);
router.get('/commetn/: videoId')


export default router;