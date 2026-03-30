import { useState } from "react";
import { BrainCircuit, Building2, GraduationCap, Play, Clock, Target } from "lucide-react";

export default function AIMockTest() {
  const [testType, setTestType] = useState<"course" | "company">("course");
  const [selectedOption, setSelectedOption] = useState("");
  const [duration, setDuration] = useState("30");

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

  const handleStartTest = () => {
    alert(`Starting ${duration}-minute AI Mock Test for ${selectedOption}`);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Mock Test</h1>
          <p className="text-slate-600">
            Take AI-powered mock tests tailored to your course or target company
          </p>
        </div>

        {/* Test Configuration */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          {/* Test Type Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Select Test Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setTestType("course");
                  setSelectedOption("");
                }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  testType === "course"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <GraduationCap className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                <h3 className="font-semibold text-slate-900">Course Based</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Based on your academic background
                </p>
              </button>

              <button
                onClick={() => {
                  setTestType("company");
                  setSelectedOption("");
                }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  testType === "company"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Building2 className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                <h3 className="font-semibold text-slate-900">Company Specific</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Tailored to specific companies
                </p>
              </button>
            </div>
          </div>

          {/* Selection Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {testType === "course" ? "Select Your Course" : "Select Target Company"}
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {testType === "course" ? "Choose a course" : "Choose a company"}
              </option>
              {(testType === "course" ? courses : companies).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Test Duration (minutes)
            </label>
            <div className="flex gap-3">
              {["15", "30", "45", "60"].map((time) => (
                <button
                  key={time}
                  onClick={() => setDuration(time)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    duration === time
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {time} min
                </button>
              ))}
            </div>
          </div>

          {/* Test Info */}
          {selectedOption && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Test Overview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">AI Generated</p>
                    <p className="font-medium text-slate-900">Dynamic Questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Duration</p>
                    <p className="font-medium text-slate-900">{duration} Minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Focus Area</p>
                    <p className="font-medium text-slate-900">{selectedOption}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStartTest}
            disabled={!selectedOption}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Mock Test
          </button>
        </div>

        {/* Recent Tests */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Recent Test Results</h2>
          <div className="space-y-3">
            {[
              { name: "Google - Technical Round", score: 85, date: "2026-03-18" },
              { name: "Computer Science - DSA", score: 78, date: "2026-03-15" },
              { name: "Microsoft - Coding Test", score: 92, date: "2026-03-12" },
            ].map((test, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-slate-900">{test.name}</h4>
                  <p className="text-sm text-slate-600">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{test.score}%</p>
                  <p className="text-xs text-slate-600">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
