import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;

const router = express.Router();

router.post('/addHistory', addToHistory);
router.post('/fetch', getHistory);

export default router;