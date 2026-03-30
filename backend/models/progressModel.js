import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: String,

  weeklyProgress: [
    {
      day: String,
      score: Number,
      time: Number,
    },
  ],

  skillsData: [
    {
      subject: String,
      score: Number,
    },
  ],

  moduleActivity: [
    {
      name: String,
      sessions: Number,
    },
  ],

  overallScore: Number,
  studyHours: Number,
  testsCompleted: Number,
  streak: Number,
});

export default mongoose.model("Progress", progressSchema);