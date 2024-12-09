import express from "express";
const users from '../controllers/users';
const router = express.Router();

router.post('/signup', users.signUp);

export default router;