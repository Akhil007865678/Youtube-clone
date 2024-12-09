import express from 'express';
import addComment from '../controllers/comments.js';


const router = express.Router();

router.post('/comment', addComment);


export default router;