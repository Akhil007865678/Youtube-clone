import express from "express";
import userController from '../controllers/users.js';
const { signUp, signIn, logout} = userController;

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/logout', log)

export default router;