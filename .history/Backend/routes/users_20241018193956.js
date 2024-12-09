import express from "express";
const signUp from '../controllers/users';
const router = express.Router();

router.post('/signup', users.signUp);

export default router;