export const startInterview = async (req, res) => {
  const questions = [
    {
      question: "Tell me about yourself",
      keywords: ["student", "experience", "skills", "project", "background"]
    },
    {
      question: "What is REST API?",
      keywords: ["http", "stateless", "get", "post", "put", "delete", "endpoint"]
    },
    {
      question: "Explain JWT authentication",
      keywords: ["token", "header", "payload", "signature", "authentication"]
    },
    {
      question: "Difference between SQL and NoSQL",
      keywords: ["relational", "table", "schema", "mongodb", "flexible"]
    },
    {
      question: "What is middleware in Express?",
      keywords: ["next", "request", "response", "function", "express"]
    },
    {
      question: "Explain React useEffect",
      keywords: ["lifecycle", "dependency", "side effect", "render"]
    }
  ];

  const random =
    questions[Math.floor(Math.random() * questions.length)];

  res.json(random);
};


export const evaluateAnswer = async (req, res) => {
  const { question, answer, keywords } = req.body;

  if (!answer) {
    return res.json({
      feedback: "Please provide an answer."
    });
  }

  let score = 0;
  let feedback = "";
  let strengths = [];
  let improvements = [];

  // 🧠 length scoring
  if (answer.length > 30) {
    score += 10;
    strengths.push("Answer has good length");
  } else {
    improvements.push("Try to elaborate more");
  }

  // 🧠 word count scoring
  const wordCount = answer.split(" ").length;
  if (wordCount > 15) {
    score += 10;
    strengths.push("Detailed explanation");
  }

  // 🧠 keyword scoring
  let keywordMatches = 0;
  if (keywords && keywords.length > 0) {
    keywords.forEach(k => {
      if (answer.toLowerCase().includes(k.toLowerCase())) {
        keywordMatches++;
      }
    });
  }

  const keywordScore = keywordMatches * 10;
  score += keywordScore;

  if (keywordMatches > 2) {
    strengths.push("Used relevant technical terms");
  } else {
    improvements.push("Include more technical keywords");
  }

  // 🧠 structure scoring
  if (answer.includes(".") || answer.includes(",")) {
    score += 10;
    strengths.push("Well structured answer");
  }

  // 🧠 bonus for long explanation
  if (answer.length > 100) {
    score += 20;
    strengths.push("Strong detailed explanation");
  }

  // cap score
  if (score > 100) score = 100;

  feedback = `
🎯 Score: ${score}/100

✅ Strengths:
${strengths.map(s => "- " + s).join("\n")}

🛠 Improve:
${improvements.map(i => "- " + i).join("\n")}
`;

  res.json({ feedback, score });
};