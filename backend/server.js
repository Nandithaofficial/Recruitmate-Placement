import 'dotenv/config'; 
import express from "express";
import cors from "cors";
//import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import path from "path";
import atsRoutes from "./routes/atsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import studyMaterialRoutes from "./routes/studyMaterialRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";


//dotenv.config();
connectDB();

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/materials", studyMaterialRoutes);
app.use("/api/progress", progressRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});