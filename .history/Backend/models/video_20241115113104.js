import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    videoType: {
        type: String,
        default: "All",
    },
    like: {
        type: Number,
        default: 0,
    },
    deslike: {
        type: Number,
        default: 0,
    }
},{timestamps: true});

export default mongoose.model("Video", VideoSchema);

const VideoSchema = new mongoose.Schema({
    user: {  // Changed from "User" to "user"
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,  // 'required' instead of 'require'
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    videoType: {
      type: String,
      default: "All",
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {  // Fixed typo: 'deslike' to 'dislike'
      type: Number,
      default: 0,
    },
  }, { timestamps: true });
  
  export default mongoose.model("Video", VideoSchema);
  