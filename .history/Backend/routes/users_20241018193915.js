import express from "express";
const user from '../controllers/users';
const router = express.Router();

router.post('/signup', userController.signUp);

export default router;