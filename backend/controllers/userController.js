import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // const { userId } = req.body;
        const { userId } = req;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const saveAnalysis = async (req, res) => {
    try {
        const { userId } = req;
        const analysis = req.body;

        if (!analysis || Object.keys(analysis).length === 0) {
            return res.status(400).json({ success: false, message: 'No analysis data provided' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Push new analysis and save
        user.analyses.unshift({
            type: analysis.type || analysis.category || 'unknown',
            category: analysis.category || 'unknown',
            original_text: analysis.original_text || analysis.text || '',
            correction: analysis.correction || null,
            reason_of_correction: analysis.reason_of_correction || analysis.reason || '',
            sentiment_score: analysis.sentiment_score || null,
            words_detected: analysis.words_detected || null,
            date: new Date()
        });

        await user.save();

        res.json({ success: true, message: 'Analysis saved' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAnalyses = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Return analyses array
        res.json({ success: true, analyses: user.analyses || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}