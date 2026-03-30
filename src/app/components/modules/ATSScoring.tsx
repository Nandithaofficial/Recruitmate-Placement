import { useState, useEffect } from "react";
import { Target, Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ATSResult {
  score: number;
  fileName: string;
  role: string;
  strengths: string[];
  improvements: string[];
  keywords: { found: string[]; missing: string[] };
}

export default function ATSScoring() {
  const [selectedResume, setSelectedResume] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [resumes, setResumes] = useState<any[]>([]);

  // ✅ Fetch resumes from backend
  useEffect(() => {
    const fetchResumes = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setResumes(data);
    };

    fetchResumes();
  }, []);

  // ✅ Analyze resume
  const handleAnalyze = async () => {
    if (!selectedResume || !role) return;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/ats/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        resumeId: selectedResume,
        role: role,
      }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            ATS Resume Scoring
          </h1>
          <p className="text-slate-600">
            Check how your resume performs in ATS systems
          </p>
        </div>

        {/* Selection Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Select Resume to Analyze
              </h2>
              <p className="text-slate-600 text-sm">
                Choose role and resume
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Role dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Role</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Data Analyst">Data Analyst</option>
            </select>

            {/* Resume dropdown */}
            <select
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Resume</option>
              {resumes.map((resume) => (
                <option key={resume._id} value={resume._id}>
                  {resume.fileName}
                </option>
              ))}
            </select>

            <button
              onClick={handleAnalyze}
              disabled={!selectedResume || !role}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Analyze Resume
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
              <h3 className="text-lg font-medium mb-4">
                ATS Compatibility Score
              </h3>
              <div className="text-6xl font-bold mb-2">
                {result.score}%
              </div>

              {/* ✅ Role shown */}
              <p className="text-blue-100 mt-2">
                Role: {result.role}
              </p>

              <p className="text-blue-100 mt-2">
                {result.score >= 80
                  ? "Excellent"
                  : result.score >= 60
                  ? "Good"
                  : "Needs Improvement"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <XCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Keyword Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-3">Found Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.found.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-red-600 mb-3">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.missing.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}