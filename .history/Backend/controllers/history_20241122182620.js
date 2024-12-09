import History from '../models/History.js';

export const addToHistory = async (req, res) => {
    try {
        const { videoId } = req.body;
        const userId = req.user._id;

        // Check if the video already exists in history
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
