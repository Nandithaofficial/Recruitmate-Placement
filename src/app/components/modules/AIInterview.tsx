import { useState, useRef, useEffect } from "react";
import axios from "axios";
import FaceTracker from "./FaceTracker";

// ─── useSpeechRecognition hook ────────────────────────────────────────────────
// Keeps a stable transcript by appending final results to a buffer ref.
// Interim results are shown live but never double-committed.
function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const stoppedRef = useRef(false);
  // Buffer of committed final words — survives recognition restarts
  const bufferRef = useRef("");

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
  }, []);

  const start = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition requires Google Chrome.");
      return;
    }

    stoppedRef.current = false;

    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event: any) => {
      let finalChunk = "";
      let interimChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalChunk += t;
        } else {
          interimChunk += t;
        }
      }

      // Append any new final words to the committed buffer
      if (finalChunk) {
        bufferRef.current = (bufferRef.current + " " + finalChunk).trim();
      }

      // Display: committed + live interim
      const display = interimChunk
        ? bufferRef.current + " " + interimChunk
        : bufferRef.current;

      setTranscript(display.trim());
    };

    recognition.onerror = (event: any) => {
      // 'no-speech' is normal silence — ignore it
      if (event.error !== "no-speech") {
        console.warn("Speech error:", event.error);
      }
    };

    recognition.onend = () => {
      if (!stoppedRef.current) {
        // Auto-restart after natural end (browser cuts off after ~60s silence)
        try { recognition.start(); } catch (_) { /* already starting */ }
      } else {
        setListening(false);
      }
    };

    recognition.start();
  };

  const stop = () => {
    stoppedRef.current = true;
    recognitionRef.current?.stop();
    setListening(false);
  };

  const reset = () => {
    stop();
    bufferRef.current = "";
    setTranscript("");
  };

  // Allow external edits (e.g. user types in the textarea)
  const setExternal = (value: string) => {
    bufferRef.current = value;
    setTranscript(value);
  };

  return { transcript, listening, supported, start, stop, reset, setExternal };
}

// ─── AIInterview component ────────────────────────────────────────────────────
export default function AIInterview() {
  const { transcript, listening, supported, start, stop, reset, setExternal } =
    useSpeechRecognition();

  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [postureChanges, setPostureChanges] = useState(0);
  const [malpracticeCount, setMalpracticeCount] = useState(0);
  const [malpracticeLogs, setMalpracticeLogs] = useState<string[]>([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMalpractice = (msg: string) => {
    setMalpracticeCount((prev) => prev + 1);
    setMalpracticeLogs((prev) => [...prev, msg]);
  };

  const startInterview = async () => {
    setLoading(true);
    stop();
    try {
      const res = await axios.get("http://localhost:5000/api/ai/start");
      setQuestion(res.data.question);
      setKeywords(res.data.keywords);
      setFeedback("");
      setScore(null);
      setPostureChanges(0);
      setMalpracticeCount(0);
      setMalpracticeLogs([]);
      reset(); // clear transcript + buffer
      setInterviewStarted(true);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    stop();
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/answer", {
        question,
        answer: transcript,
        keywords,
      });

      let feedbackText: string = res.data.feedback;
      let finalScore: number = res.data.score ?? 0;

      if (postureChanges > 3) {
        feedbackText += "\n⚠️ Excessive posture movement (-10 pts)";
        finalScore = Math.max(0, finalScore - 10);
      }
      if (malpracticeCount > 0) {
        feedbackText += `\n🚫 Malpractice flagged ${malpracticeCount} time(s) (-${malpracticeCount * 5} pts)`;
        finalScore = Math.max(0, finalScore - malpracticeCount * 5);
      }

      setFeedback(feedbackText);
      setScore(finalScore);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    score === null ? "" : score >= 70 ? "text-green-400" : score >= 40 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6">🤖 AI Mock Interview</h2>

      {/* Start / Next button */}
      <button
        onClick={startInterview}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-5 py-2 rounded-lg font-semibold mb-6 transition"
      >
        {loading ? "Loading..." : interviewStarted ? "🔄 Next Question" : "▶ Start Interview"}
      </button>

      {!supported && (
        <p className="text-yellow-400 text-sm mb-4">
          ⚠️ Speech recognition is not supported in this browser. Please use Google Chrome.
        </p>
      )}

      <div className={`flex gap-6 ${interviewStarted ? "flex-row items-start" : "flex-col"}`}>
        {/* ── Left panel ── */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Question card */}
          {question && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Question</p>
              <p className="text-lg leading-relaxed">{question}</p>
              {keywords.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {keywords.map((kw) => (
                    <span key={kw} className="bg-blue-900/50 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Speech controls */}
          {interviewStarted && (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={start}
                disabled={listening || !supported}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-40 px-4 py-2 rounded-lg transition"
              >
                🎤 {listening ? "Listening..." : "Start Speaking"}
              </button>
              <button
                onClick={stop}
                disabled={!listening}
                className="bg-red-600 hover:bg-red-500 disabled:opacity-40 px-4 py-2 rounded-lg transition"
              >
                ⏹ Stop
              </button>
              {listening && (
                <span className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Recording…
                </span>
              )}
            </div>
          )}

          {/* Answer textarea */}
          {interviewStarted && (
            <textarea
              value={transcript}
              onChange={(e) => setExternal(e.target.value)}
              placeholder="Your answer appears here as you speak, or type directly…"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition"
              rows={6}
            />
          )}

          {/* Submit */}
          {interviewStarted && transcript.trim() && (
            <button
              onClick={submitAnswer}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-5 py-2 rounded-lg font-semibold w-fit transition"
            >
              {loading ? "Evaluating…" : "📤 Submit Answer"}
            </button>
          )}

          {/* Feedback */}
          {feedback && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-purple-400 uppercase tracking-wider">Feedback</p>
                {score !== null && (
                  <span className={`text-2xl font-bold ${scoreColor}`}>{score}/100</span>
                )}
              </div>
              <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">{feedback}</pre>
            </div>
          )}
        </div>

        {/* ── Right panel: camera ── */}
        {interviewStarted && (
          <div className="flex flex-col gap-3 items-center shrink-0">
            {/* FaceTracker unmounts when interviewStarted becomes false,
                which calls stopCamera() automatically */}
            <FaceTracker
              onPostureChange={setPostureChanges}
              onMalpractice={handleMalpractice}
            />

            {malpracticeLogs.length > 0 && (
              <div className="w-80 bg-red-950/40 border border-red-800 rounded-lg p-3 text-xs text-red-300">
                <p className="font-semibold mb-1">🚫 Flags ({malpracticeCount})</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {malpracticeLogs.slice(-5).map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}