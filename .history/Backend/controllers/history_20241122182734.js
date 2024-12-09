import History from '../models/history.js';
const addToHistory = async (req, res) => {
    try {
        const { videoId } = req.body;
        const userId = req.user._id;
        const existingHistory = await History.findOne({ userId, videoId });
        if (!existingHistory) {
            const history = new History({ userId, videoId });
            await history.save();
        }

        res.status(200).json({ message: 'Video added to history' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
export const getHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const history = await History.find({ userId }).populate('videoId');
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default {addToHistory, g};
