import express from "express";
import userController from '../controllers/users.js';
const { signUp, signIn, logout, someRouteHandler} = userController;

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/logout', logout);
router.get('/someRou')

export default router;