import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { stringify } from 'csv-stringify';


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

export const saveLexiconEntry = (req, res) => {
  try {
    const entry = req.body; // Single entry {word, score, meaning}

    // Validate the entry
    if (!entry.word || !entry.score || !entry.meaning) {
      return res.status(400).json({ error: "Invalid lexicon entry." });
    }

    const filePath = path.resolve("../model/lexicon/bias_lexicon_meaning.csv");

    // Function to append a single entry to the CSV file
    const appendToCSV = (entry, callback) => {
      stringify([entry], { header: false }, (err, output) => {
        if (err) {
          console.error("❌ Error stringifying CSV:", err);
          return callback(err);
        }

        // Append the output (add line break before the output to separate rows)
        const finalOutput = "\n" + output;

        // Append the output to the CSV file
        fs.appendFile(filePath, finalOutput, (err) => {
          if (err) {
            console.error("❌ Error writing to CSV:", err);
            return callback(err);
          }

          console.log("✅ Saved lexicon entry:", entry.word);
          callback(null, "Saved");
        });
      });
    };

    // Append the single entry to CSV
    appendToCSV(entry, (err, message) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save lexicon entry" });
      }

      res.json({ success: true, message: "Lexicon entry saved successfully" });
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
