import express from "express";
import { getBiasLexicon } from "../controllers/lexiconController.js";

const router = express.Router();

// Route for bias lexicon data
router.get("/bias-lexicon", getBiasLexicon);

export default router;