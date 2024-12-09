import Comment from '../models/Comments.js';


const addComment = async (req, res) => {
    try{
        console.log(req.user);
    } catch(error){
        res.status(500)
    }
}

export default addComment;