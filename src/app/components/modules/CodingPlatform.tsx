import { useState } from "react";
import { Code, Play, CheckCircle, Clock, Flame } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: string;
  solved: boolean;
}

export default function CodingPlatform() {
  const [activeTab, setActiveTab] = useState<"all" | "easy" | "medium" | "hard">("all");

  const problems: Problem[] = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      acceptance: "48.2%",
      solved: true,
    },
    {
      id: "2",
      title: "Reverse Linked List",
      difficulty: "Easy",
      category: "Linked List",
      acceptance: "71.5%",
      solved: true,
    },
    {
      id: "3",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      category: "Tree",
      acceptance: "62.8%",
      solved: false,
    },
    {
      id: "4",
      title: "Longest Substring Without Repeating",
      difficulty: "Medium",
      category: "String",
      acceptance: "34.1%",
      solved: false,
    },
    {
      id: "5",
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      category: "Linked List",
      acceptance: "48.9%",
      solved: false,
    },
    {
      id: "6",
      title: "Regular Expression Matching",
      difficulty: "Hard",
      category: "Dynamic Programming",
      acceptance: "28.3%",
      solved: false,
    },
  ];

  const filteredProblems =
    activeTab === "all"
      ? problems
      : problems.filter((p) => p.difficulty.toLowerCase() === activeTab);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-amber-600 bg-amber-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Coding Platform</h1>
          <p className="text-slate-600">Practice coding problems and improve your skills</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Problems Solved</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">24</p>
            <p className="text-sm text-slate-500 mt-1">Out of 2000+</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Current Streak</span>
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">7 days</p>
            <p className="text-sm text-slate-500 mt-1">Keep it up!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Easy</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-green-600">12/150</p>
            <div className="mt-2 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: "8%" }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Medium</span>
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-amber-600">8/500</p>
            <div className="mt-2 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: "1.6%" }}></div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 border border-slate-200 flex gap-2">
          {[
            { key: "all" as const, label: "All" },
            { key: "easy" as const, label: "Easy" },
            { key: "medium" as const, label: "Medium" },
            { key: "hard" as const, label: "Hard" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Acceptance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProblems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      {problem.solved ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">{problem.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{problem.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{problem.acceptance}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium flex items-center gap-2">
                        {problem.solved ? (
                          <>
                            <Play className="w-4 h-4" />
                            Solve Again
                          </>
                        ) : (
                          <>
                            <Code className="w-4 h-4" />
                            Solve
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
