import express from 'express';
import commentsController from '../controllers/comments.js';
const { addComment, getCommentByVideoId } = commentsController;

import auth from '../middleware/authentication.js';

const router = express.Router();

router.post('/comment'import jwt from 'jsonwebtoken';
    import User from '../models/User.js';
    
    const auth = async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: 'No token, authorization denied' });
            }
    
            const decode = jwt.verify(token, "key");
            console.log("Decoded Token:", decode);
    
            const user = await User.findById(decode.userId).select('-password');
            if (!user) {
                return res.status(401).json({ error: 'User does not exist' });
            }
    
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired, please log in again' });
            }
            res.status(401).json({ error: 'Token is not valid' });
        }
    };
    
    export default auth; 
    , addComment);
router.get('/comment/:videoId', getCommentByVideoId);


export default router;