import User from '../models/User.js';

const signUp = async(req, res) => {
    try{
        const {channelName, userName, about, profilePic, password} = req.body;
        const isExist = await User.findOne({userName});
        if(isExist){
            res.status(400).json({error: "Username already exists"})
        }
    } catch(error){

    }
}

export default signUp;