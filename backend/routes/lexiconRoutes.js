import express from "express";
import { getBiasLexicon, saveLexiconEntry } from "../controllers/lexiconController.js";

const router = express.Router();

// Route for bias lexicon data
router.get("/bias-lexicon", getBiasLexicon);
router.post("/bias-lexicon", saveLexiconEntry);

export default router;