import Comment from '../models/Comments.js';


const addComment = async (req, res) => {
    try{
        
    } catch(error){
        res.status(500).json({error: "Server error"});
    }
}

export default addComment;