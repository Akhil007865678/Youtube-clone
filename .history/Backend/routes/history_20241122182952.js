import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', getHistory);

export default router;