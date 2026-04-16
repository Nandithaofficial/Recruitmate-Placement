import { useState, useEffect } from "react";
import { BrainCircuit, Building2, GraduationCap, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIMockTest() {
  const [testType, setTestType] = useState<"course" | "company">("course");
  const [selectedOption, setSelectedOption] = useState("");
  const [duration, setDuration] = useState("30");
  const [results, setResults] = useState<any[]>([]);

  const navigate = useNavigate(); // ✅ correct placement

  const courses = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Electrical Engineering",
  ];

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
  ];

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mocktest/results");
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Results fetch error", error);
      setResults([]);
    }
  };

  const handleStartTest = async () => {
  if (!selectedOption) return;

  try {
    const res = await fetch("http://localhost:5000/api/mocktest/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        testType,
        option: selectedOption,
        duration: Number(duration),
      }),
    });

    const data = await res.json();

    console.log("START TEST RESPONSE:", data);

    // ✅ FIX: check both possible formats
    const id = data?.testId || data?.test?._id || data?._id;

    if (!id) {
      alert("No testId received");
      return;
    }

    navigate(`/dashboard/mock-test/${id}`);

  } catch (error) {
    console.error("Start test error:", error);
    alert("Failed to start test");
  }
};
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            AI Mock Test
          </h1>
          <p className="text-slate-600">
            Take AI-powered mock tests tailored to your course or target company
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">

          {/* Test Type */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Select Test Type</h2>

            <div className="grid grid-cols-2 gap-4">

              <button
                onClick={() => {
                  setTestType("course");
                  setSelectedOption("");
                }}
                className={`p-6 rounded-xl border-2 ${
                  testType === "course"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                Course Based
              </button>

              <button
                onClick={() => {
                  setTestType("company");
                  setSelectedOption("");
                }}
                className={`p-6 rounded-xl border-2 ${
                  testType === "company"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                Company Based
              </button>

            </div>
          </div>

          {/* Dropdown */}
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6"
          >
            <option value="">Select option</option>

            {(testType === "course" ? courses : companies).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Duration */}
          <div className="flex gap-3 mb-6">
            {["15", "30", "45", "60"].map((time) => (
              <button
                key={time}
                onClick={() => setDuration(time)}
                className={`flex-1 p-3 rounded-lg ${
                  duration === time
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {time} min
              </button>
            ))}
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartTest}
            disabled={!selectedOption}
            className="w-full bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Mock Test
          </button>
        </div>

        {/* Results */}
        <div className="mt-8 bg-white p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">
            Recent Test Results
          </h2>

          {results.map((test, idx) => (
            <div
              key={idx}
              className="flex justify-between p-3 bg-slate-50 rounded mb-2"
            >
              <div>
                <p className="font-medium">{test.option}</p>
                <p className="text-sm text-gray-500">
                  {new Date(test.date).toLocaleDateString()}
                </p>
              </div>

              <div className="text-blue-600 font-bold">
                {Math.round(test.score || 0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}