import express from "express";
import userController from '../controllers/history.js';
const { } = userController;

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/logout', logout);

export default router;