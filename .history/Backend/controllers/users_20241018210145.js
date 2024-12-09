import User from '../models/User.js';
 bcrypt from 'bcryptjs';

const signUp = async(req, res) => {
    try{
        const {channelName, userName, about, profilePic, password} = req.body;
        const isExist = await User.findOne({userName});
        if(isExist){
            res.status(400).json({error: "Username already exists, Please try with other username"});
        }
        else{
            console.log(password)
        }
    } catch(error){

    }
}

export default signUp;