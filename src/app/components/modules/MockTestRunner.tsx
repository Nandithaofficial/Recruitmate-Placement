// src/app/components/modules/MockTestRunner.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MockTestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

useEffect(() => {
  if (!testId) return;

  const fetchTest = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/mocktest/${testId}`);
      const data = await res.json();

      console.log("FULL RESPONSE >>>", JSON.stringify(data, null, 2));

      if (data.questions) {
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(""));
      } else if (data.test?.questions) {
        setQuestions(data.test.questions);
        setAnswers(new Array(data.test.questions.length).fill(""));
      } else {
        console.log("NO QUESTIONS FOUND IN RESPONSE");
      }

    } catch (err) {
      console.error("Fetch test error", err);
    }
  };

  fetchTest();
}, [testId]);

  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mocktest/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, answers }),
      });
      const data = await res.json();
      setScore(data.score);
    } catch (err) {
      console.error("Submit test error", err);
    }
  };

  if (score !== null) {
    return <div className="p-8 max-w-4xl mx-auto"><h2>Your Score: {Math.round(score)}%</h2></div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mock Test Questions</h2>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="p-4 border rounded-lg">
              <p className="font-medium">{idx+1}. {q.question}</p>
              <div className="mt-2 space-x-4">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(idx, opt)}
                    className={`px-3 py-1 border rounded ${answers[idx]===opt?"bg-blue-600 text-white":"bg-white"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">Submit Test</button>
        </div>
      )}
    </div>
  );
}