import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;
import auth from '../middleware/authentication.js'

const router = express.Router();

router.post('/add-history', auth, addToHistory);
router.post('/fetch-history',auth, getHistory);

export default router;