import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
},{timestamps: true});

export default mongoose.model("Comment", CommentSchema);