
import MockTest from "../models/MockTest.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const startMockTest = async (req, res) => {
  try {
    const { testType, option, duration } = req.body;

    let questions = [];

    try {
      // your OpenAI call here
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate 5 ${testType} questions on ${option} with options and correctAnswer in JSON`
          }
        ],
      });

      questions = JSON.parse(completion.choices[0].message.content);

    } catch (aiError) {
      console.log("OpenAI failed — using fallback questions");

      questions = [
        {
          question: "What is React?",
          options: ["Library", "Framework", "Database", "OS"],
          correctAnswer: "Library"
        },
        {
          question: "What is Node.js?",
          options: ["Runtime", "Browser", "Language", "IDE"],
          correctAnswer: "Runtime"
        }
      ];
    }

    const newTest = await MockTest.create({
      testType,
      option,
      duration,
      questions
    });

    res.json({
      testId: newTest._id,
      questions
    });

  } catch (error) {
    console.error("Start Test Error:", error);
    res.status(500).json({ error: "Failed to start test" });
  }
};
export const submitMockTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;

    const test = await MockTest.findById(testId);

    let score = 0;

    test.questions.forEach((q, index) => {
      q.userAnswer = answers[index];
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    test.score = (score / test.questions.length) * 100;
    await test.save();

    res.json({ score: test.score });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ error: "Failed to submit test" });
  }
};
export const getMockTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await MockTest.findById(id);

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json({
      questions: test.questions
    });

  } catch (error) {
    console.error("Get Test Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await MockTest.find().sort({ date: -1 }).limit(5);
    res.json(results);
  } catch (error) {
    console.error("Results Error:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};
