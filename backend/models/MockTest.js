import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  userAnswer: String,
});

const mockTestSchema = new mongoose.Schema({
  testType: String,
  option: String,
  duration: Number,
  score: Number,
  questions: [questionSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

const MockTest = mongoose.model("MockTest", mockTestSchema);

export default MockTest;