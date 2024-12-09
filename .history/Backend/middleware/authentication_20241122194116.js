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
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }
const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, "key");
        console.log("Decoded Token:", decode);

        // Verify user
        const user = await User.findById(decode.userId).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please log in again' });
        }
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export default auth;
