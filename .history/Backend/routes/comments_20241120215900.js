import express from 'express';
import commentsController from '../controllers/comments.js';
const { addComment, getCommentByVideoId } = commentsController;

import auth from '../middleware/authentication.js';

const router = express.Router();

router.post('/comment', addComment);
router.get('/comment/:videoId', getCommentByVideoId);


export default router;