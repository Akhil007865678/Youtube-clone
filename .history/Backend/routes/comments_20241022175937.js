import express from 'express';
import addComment from '../controllers/comments.js';
import auth from '../'

const router = express.Router();

router.post('/comment', addComment);


export default router;