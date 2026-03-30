import express from "express";
import {
  uploadMaterial,
  getMaterials,
  getMaterialById
} from "../controllers/studyMaterialController.js";

const router = express.Router();

// admin upload
router.post("/upload", uploadMaterial);

// student fetch
router.get("/:category", getMaterials);

// single
router.get("/material/:id", getMaterialById);

export default router;