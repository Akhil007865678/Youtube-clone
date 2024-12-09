import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;

const router = express.Router();

router.post('/addHistory', addToHistory);
router.post('/', getHistory);

export default router;