import { useState, useRef } from "react";
import axios from "axios";
import FaceTracker from "./FaceTracker";

export default function AIInterview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [listening, setListening] = useState(false);
  const [postureChanges, setPostureChanges] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [malpracticeCount, setMalpracticeCount] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);

  const recognitionRef = useRef<any>(null);
  const manuallyStoppedRef = useRef(false);

  // 🚫 malpractice handler
  const handleMalpractice = (msg: string) => {
    console.log("Malpractice:", msg);
    setMalpracticeCount(prev => prev + 1);
  };

  // 🎤 Start Speech
const startListening = () => {
  manuallyStoppedRef.current = false;

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Please use Google Chrome for speech recognition");
    return;
  }

  const recognition = new SpeechRecognition();
  recognitionRef.current = recognition;

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    console.log("Mic started");
    setListening(true);
  };

  recognition.onresult = (event: any) => {
  let finalTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript;
    }
  }

  if (finalTranscript) {
    console.log("You said:", finalTranscript);
    setAnswer(prev => prev + " " + finalTranscript);
  }
};

  recognition.onerror = (event: any) => {
    console.log("Speech error:", event.error);
  };

  recognition.onend = () => {
    if (!manuallyStoppedRef.current) {
      recognition.start();
    } else {
      setListening(false);
    }
  };

  recognition.start();
};
//stop listening
const stopListening = () => {
  manuallyStoppedRef.current = true;
  recognitionRef.current?.stop();
  setListening(false);
};
  // ▶ Start Interview
  const startInterview = async () => {
    const res = await axios.get("http://localhost:5000/api/ai/start");

    setQuestion(res.data.question);
    setKeywords(res.data.keywords);
    setAnswer("");
    setFeedback("");
    setPostureChanges(0);
    setMalpracticeCount(0);
    setInterviewStarted(true);
  };

  // 📤 Submit Answer
  const submitAnswer = async () => {
    stopListening(); // stop mic before submit

    const res = await axios.post(
      "http://localhost:5000/api/ai/answer",
      { question, answer, keywords }
    );

    let feedbackText = res.data.feedback;

    // posture penalty
    if (postureChanges > 3) {
      feedbackText += "\n⚠️ Too much posture movement (-10)";
    }

    // malpractice penalty
    if (malpracticeCount > 0) {
      feedbackText += `\n🚫 Malpractice detected ${malpracticeCount} time(s) (-${malpracticeCount * 5})`;
    }

    setFeedback(feedbackText);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-xl">

      <h2 className="text-2xl font-bold mb-4">
        AI Mock Interview
      </h2>

      {/* Start Interview */}
      <button
        onClick={startInterview}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        Start Interview
      </button>

      {/* Question */}
      {question && (
        <div className="mb-4">
          <p className="text-blue-300">Question:</p>
          <p>{question}</p>
        </div>
      )}

      {/* Speech Controls */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={startListening}
          className="bg-green-600 px-4 py-2 rounded"
        >
          🎤 Start Speaking
        </button>

        <button
          onClick={stopListening}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>

      {/* Listening Indicator */}
      {listening && (
        <p className="text-green-400">Listening...</p>
      )}

      {/* Camera */}
      {interviewStarted && (
        <FaceTracker 
          onPostureChange={setPostureChanges}
          onMalpractice={handleMalpractice}
        />
      )}

      {/* Answer Box */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 bg-gray-800 rounded mb-4"
        rows={5}
      />

      {/* Submit */}
      <button
        onClick={submitAnswer}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        Submit Answer
      </button>

      {/* Feedback */}
      {feedback && (
        <div className="mt-4 bg-gray-800 p-3 rounded">
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}