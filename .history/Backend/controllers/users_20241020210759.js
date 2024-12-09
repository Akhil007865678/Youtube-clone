import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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
}

const signIn = async (req, res) => {
    try{
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        if(user){
            s
        }
    } catch(error){

    }
}


export default signUp;