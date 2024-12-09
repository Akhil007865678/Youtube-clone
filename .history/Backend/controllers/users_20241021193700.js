import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
};

const signUp = async (req, res) => {
    try {
        const { channelName, userName, about, profilePic, password } = req.body;
        const isExist = await User.findOne({ userName });
        if (isExist) {
            return res.status(400).json({ error: "Username already exists, please try with another username." });
        } else {
            let updatedPassword = await bcrypt.hash(password, 10);
            const user = new User({ channelName, userName, about, profilePic, password: updatedPassword });
            await user.save();
            return res.status(201).json({ message: 'User registered successfully', success: 'yes', data: user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error, please try again later.' });
    }
};

const signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
            res.cookie('token', token, cookieOptions);
            return res.json({ message: "Logged in successfully", success: "true", token });
        } else {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error, please try again later.' });
    }
};

const someRouteHandler = (req, res) => {
    console.log('Cookies:', req.cookies);
    res.json({ message: 'Success', cookies: req.cookies });
};

const logout = (req, res) => {
    res.clearCookie('token', cookieOptions).json({message: 'Logged out successfully'});
};

export default {signUp, signIn, logout};
