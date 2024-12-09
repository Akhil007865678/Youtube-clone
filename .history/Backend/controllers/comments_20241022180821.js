import Comment from '../models/Comments.js';


const addComment = async (req, res) => {
    try{
        let {video, message} = req.body;
        const comment = new Comment()
    } catch(error){
        res.status(500).json({error: "Server error"});
    }
}

export default addComment;