// controllers/lexiconController.js
import fs from "fs";
import path from "path";
import csv from "csv-parser";

export const getBiasLexicon = (req, res) => {
  try {
    // Construct the correct path to your CSV file
    const filePath = path.resolve("../model/lexicon/bias_lexicon_meaning.csv");
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.json(results);
      })
      .on("error", (err) => {
        console.error("Error reading CSV:", err);
        res.status(500).json({ error: "Failed to load lexicon data" });
      });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};