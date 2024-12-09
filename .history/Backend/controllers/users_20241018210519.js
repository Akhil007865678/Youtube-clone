import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const signUp = async(req, res) => {
    try{
        const {channelName, userName, about, profilePic, password} = req.body;
        const isExist = await User.findOne({userName});
        if(isExist){
            res.status(400).json({error: "Username already exists, Please try with other username"});
        }
        else{
            let updatedPassword = await bcrypt.hash(password, 10);
            const user = new User({channelName, userName, about, profilePic, password: updatedPassword});
            await user.save();
            res.status(201).json({message: 'User registered'})
        }
    } catch(error){

    }
}

export default signUp;