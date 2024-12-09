/*import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    console.log('Cookies:', req.cookies);
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    } else {
        try {
            const decode = jwt.verify(token, "key");
            console.log("Decoded Token:", decode);
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
};

export default auth;
*/