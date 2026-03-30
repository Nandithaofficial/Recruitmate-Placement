import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {
    type: String,
    enum: ["aptitude", "interview", "coding"],
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"]
  },
  questions: [String],   // stored questions
  fileUrl: String,       // optional PDF upload
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("StudyMaterial", studyMaterialSchema);