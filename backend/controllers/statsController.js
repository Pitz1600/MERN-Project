import userModel from "../models/userModel.js";

export const getCategoryStats = async (req, res) => {
  try {
    const results = await userModel.aggregate([
      { $unwind: "$analyses" },
      { $unwind: "$analyses.results" },
      {
        $group: {
          _id: "$analyses.results.category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: "$_id",
          value: "$count",
          _id: 0,
        },
      },
    ]);

    if (!results || results.length === 0) {
      return res.json([]); // No data found
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category stats" });
  }
};