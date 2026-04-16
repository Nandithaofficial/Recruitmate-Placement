import express from "express";
import {
  startMockTest,
  submitMockTest,
  getResults,
  getMockTest
} from "../controllers/mocktestController.js";

const router = express.Router();

router.post("/start", startMockTest);
router.post("/submit", submitMockTest);
router.get("/results", getResults);
router.get("/:id", getMockTest);

export default router;



