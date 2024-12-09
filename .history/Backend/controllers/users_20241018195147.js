import User from '../models/User.js';

const signUp = async(req, res) => {
    try{
        const {channelName, userName, about, profilePic, password} = req.body;
        const isExist = await User.findOne({userName});
    } catch(error){

    }
}

export default signUp;