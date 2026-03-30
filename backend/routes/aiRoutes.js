import express from "express";
import {
  startInterview,
  evaluateAnswer
} from "../controllers/aiInterviewController.js";

const router = express.Router();

router.get("/start", startInterview);
router.post("/answer", evaluateAnswer);

export default router;