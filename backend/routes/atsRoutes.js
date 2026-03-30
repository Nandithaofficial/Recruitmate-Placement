import express from "express";
import { protect } from "../middleware/auth.js";
import { analyzeResume } from "../controllers/atsController.js";

const router = express.Router();

router.post("/analyze", protect, analyzeResume);

export default router;