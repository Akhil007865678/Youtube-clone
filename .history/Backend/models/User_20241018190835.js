import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: true,
    },
    profilePic:
},{timestamps: true});

export default mongoose.model("User", userSchema);