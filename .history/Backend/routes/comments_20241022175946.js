import express from 'express';
import addComment from '../controllers/comments.js';
import auth from '../middleware/authentication.js';

const router = express.Router();

router.post('/comment', addComment);


export default router;