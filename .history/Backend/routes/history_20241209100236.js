import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;
import auth from '../middleware/authentication.js'

const router = express.Router();

router.post('/add-history', Userauth, addToHistory);
router.get('/fetch-history', auth, getHistory);

export default router;