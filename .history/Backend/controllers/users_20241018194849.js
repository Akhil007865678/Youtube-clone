import User from '../models/User.js';

const signUp = async(req, res) => {
    try{
        const {channelName, userName, about, profilePic, password} = req.body;
        console.log(channelName);
    } catch(error){

    }
}

export default signUp;