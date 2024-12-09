import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    describe(', () => {
      
    })
    : {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
},{timestamps: true});

export default mongoose.model("Video", VideoSchema);