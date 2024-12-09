import Comment from '../models/Comments.js';


const addComment = async (req, res) => {
    try{
        let {video, message} = req.body;
        const comment = new Comment({user: req.user._id, video, message});
        await comment.save();
        res.status(201).json({
            message: "Success",
            comment
        });
    } catch(error){
        res.status(500).json({error: "Server error"});
    }
}

const getCommentByVideoId = async (req, res) => {
    try{
        let {videoId} = req.params
    } catch(error){
        res.status(500).json({error: "Server error"});
    }
}

export default {addComment, getCommentByVideoId};