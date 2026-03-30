import express from "express";
import { uploadResume, deleteResume,getResumes } from "../controllers/resumeController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Upload
router.post("/upload", protect, upload.single("resume"), uploadResume);

// Delete
router.delete("/:id", protect, deleteResume);

// Get all resumes
router.get("/", protect, getResumes);

export default router;