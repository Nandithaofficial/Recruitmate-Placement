import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const questions = [
  {
    question: "Tell me about yourself",
    keywords: ["student", "experience", "skills", "project", "background"],
  },
  {
    question: "What is REST API?",
    keywords: ["http", "stateless", "get", "post", "put", "delete", "endpoint"],
  },
  {
    question: "Explain JWT authentication",
    keywords: ["token", "header", "payload", "signature", "authentication"],
  },
  {
    question: "Difference between SQL and NoSQL",
    keywords: ["relational", "table", "schema", "mongodb", "flexible"],
  },
  {
    question: "What is middleware in Express?",
    keywords: ["next", "request", "response", "function", "express"],
  },
  {
    question: "Explain React useEffect",
    keywords: ["lifecycle", "dependency", "side effect", "render"],
  },
  {
    question: "What is the difference between let, const, and var in JavaScript?",
    keywords: ["scope", "hoisting", "block", "reassign", "es6"],
  },
  {
    question: "What are React hooks and why were they introduced?",
    keywords: ["functional", "state", "class", "useState", "reuse"],
  },
];

// ─── Start Interview ───────────────────────────────────────────────────────────
export const startInterview = async (req, res) => {
  const random = questions[Math.floor(Math.random() * questions.length)];
  res.json(random);
};

// ─── Evaluate Answer ──────────────────────────────────────────────────────────
export const evaluateAnswer = async (req, res) => {
  const { question, answer, keywords } = req.body;

  if (!answer || answer.trim().length === 0) {
    return res.json({ feedback: "Please provide an answer.", score: 0 });
  }

  // ── Keyword scoring (fast, no API cost) ──
  let keywordMatches = 0;
  if (keywords?.length > 0) {
    keywords.forEach((k) => {
      if (answer.toLowerCase().includes(k.toLowerCase())) keywordMatches++;
    });
  }

  // ── Try OpenAI evaluation ──────────────────────────────────────────────────
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content: `You are a technical interview evaluator. 
Evaluate the candidate's answer for clarity, accuracy, and completeness.
Respond ONLY in this exact format (no extra text):

SCORE: <number 0-100>
STRENGTHS:
- <point>
- <point>
IMPROVEMENTS:
- <point>
- <point>
SUMMARY: <one sentence overall assessment>`,
        },
        {
          role: "user",
          content: `Question: ${question}\n\nCandidate's Answer: ${answer}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "";

    // Parse score from response
    const scoreMatch = raw.match(/SCORE:\s*(\d+)/i);
    const score = scoreMatch ? Math.min(100, parseInt(scoreMatch[1])) : 50;

    const feedback = `🎯 Score: ${score}/100\n\n${raw
      .replace(/SCORE:\s*\d+\n?/i, "")
      .trim()}`;

    return res.json({ feedback, score });

  } catch (err) {
    // ── Fallback: rule-based evaluation if OpenAI fails ──────────────────────
    console.warn("OpenAI unavailable, using rule-based fallback:", err.message);

    let score = 0;
    const strengths = [];
    const improvements = [];

    if (answer.length > 30) {
      score += 10;
      strengths.push("Answer has good length");
    } else {
      improvements.push("Try to elaborate more");
    }

    if (answer.split(" ").length > 15) {
      score += 10;
      strengths.push("Detailed explanation");
    }

    score += keywordMatches * 10;
    if (keywordMatches > 2) {
      strengths.push("Used relevant technical terms");
    } else {
      improvements.push("Include more technical keywords");
    }

    if (answer.includes(".") || answer.includes(",")) {
      score += 10;
      strengths.push("Well-structured answer");
    }

    if (answer.length > 100) {
      score += 20;
      strengths.push("Strong detailed explanation");
    }

    score = Math.min(score, 100);

    const feedback = `🎯 Score: ${score}/100

✅ Strengths:
${strengths.map((s) => "- " + s).join("\n") || "- None noted"}

🛠 Improve:
${improvements.map((i) => "- " + i).join("\n") || "- Keep it up!"}`;

    return res.json({ feedback, score });
  }
};