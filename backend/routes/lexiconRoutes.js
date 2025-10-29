import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const router = express.Router();

router.get("/bias-lexicon", (req, res) => {
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
});

export default router;