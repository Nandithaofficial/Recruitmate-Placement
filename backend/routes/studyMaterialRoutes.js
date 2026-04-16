import express from "express";
import {
  uploadMaterial,
  getMaterials,
  getMaterialById
} from "../controllers/studyMaterialController.js";

const router = express.Router();

router.post("/upload", uploadMaterial);

// keep this FIRST
router.get("/material/:id", getMaterialById);

// then category
router.get("/:category", getMaterials);

export default router;