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
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token, "key");
        console.log("Decoded Token:", decode);

        const user = await User.findById(decode.userId).select('-password');
        console.log("Authenticated User:", user);

        if (!user) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        req.user = user; // Attach the user object to req
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please log in again' });
        }
        res.status(401).json({ error: 'Token is not valid' });
    }
};
