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
        const { prompt, results } = req.body;

        console.log("🧩 Received payload:", req.body);

        if (!prompt || !Array.isArray(results) || results.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid data: Expected a prompt and non-empty results array",
        });
        }

        const user = await userModel.findById(userId);
        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Fix older records missing prompt
        user.analyses = user.analyses.map((a) => ({
        prompt: a.prompt || "Old record (no prompt)",
        date: a.date || new Date(),
        results: a.results || [],
        }));

        // ✅ Create a new analysis entry
        const newAnalysis = {
        prompt,
        date: new Date(),
        results: results.map((r) => ({
            category: r.category || "unknown",
            type: r.type || "unknown",
            original_text: r.original_text || "",
            correction: r.correction || null,
            reason_of_correction: r.reason_of_correction || r.reason || "",
            sentiment_score: r.sentiment_score || null,
            words_detected: r.words_detected || null,
        })),
        };

        user.analyses.unshift(newAnalysis);
        await user.save();

        res.json({ success: true, message: "Analysis saved successfully" });
    } catch (error) {
        console.error("❌ Error saving analysis:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

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

export const deleteAnalysis = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the analysis index
        const analysisIndex = user.analyses.findIndex(analysis => analysis._id.toString() === id);
        
        if (analysisIndex === -1) {
            return res.status(404).json({ success: false, message: 'Analysis not found' });
        }

        // Remove the analysis from the array
        user.analyses.splice(analysisIndex, 1);
        
        // Save the updated user document
        await user.save();

        res.json({ success: true, message: 'Analysis deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}