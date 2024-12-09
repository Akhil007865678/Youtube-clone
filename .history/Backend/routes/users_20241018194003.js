import express from "express";
const signUp from '../controllers/users';
const router = express.Router();

router.post('/signup', signUp);

export default router;