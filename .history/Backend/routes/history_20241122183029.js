import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;

const router = express.Router();

router.post('/add-history', addToHistory);
router.post('/fetch-history', getHistory);

export default router;