import { useState } from "react";
import { BookOpen, Code, MessageSquare, ChevronRight, FileText } from "lucide-react";

interface Material {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export default function StudyMaterials() {
  const [activeTab, setActiveTab] = useState<"aptitude" | "interview" | "coding">("aptitude");

  const materials = {
    aptitude: [
      {
        id: "1",
        title: "Quantitative Aptitude",
        description: "Number systems, percentages, profit & loss, time & work",
        questionsCount: 150,
        difficulty: "Medium" as const,
      },
      {
        id: "2",
        title: "Logical Reasoning",
        description: "Puzzles, series, coding-decoding, blood relations",
        questionsCount: 120,
        difficulty: "Easy" as const,
      },
      {
        id: "3",
        title: "Data Interpretation",
        description: "Charts, graphs, tables, and data analysis",
        questionsCount: 80,
        difficulty: "Hard" as const,
      },
    ],
    interview: [
      {
        id: "4",
        title: "HR Interview Questions",
        description: "Common HR questions and best practices",
        questionsCount: 50,
        difficulty: "Easy" as const,
      },
      {
        id: "5",
        title: "Technical Interview - DSA",
        description: "Data structures and algorithms interview questions",
        questionsCount: 200,
        difficulty: "Hard" as const,
      },
      {
        id: "6",
        title: "Behavioral Questions",
        description: "STAR method and situational questions",
        questionsCount: 75,
        difficulty: "Medium" as const,
      },
    ],
    coding: [
      {
        id: "7",
        title: "Arrays & Strings",
        description: "Essential array and string manipulation problems",
        questionsCount: 100,
        difficulty: "Easy" as const,
      },
      {
        id: "8",
        title: "Dynamic Programming",
        description: "DP patterns and optimization problems",
        questionsCount: 90,
        difficulty: "Hard" as const,
      },
      {
        id: "9",
        title: "Trees & Graphs",
        description: "Tree traversals, graph algorithms, BFS, DFS",
        questionsCount: 110,
        difficulty: "Medium" as const,
      },
    ],
  };

  const tabs = [
    { key: "aptitude" as const, label: "Aptitude", icon: BookOpen },
    { key: "interview" as const, label: "Interview", icon: MessageSquare },
    { key: "coding" as const, label: "Coding", icon: Code },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-amber-100 text-amber-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Study Materials</h1>
          <p className="text-slate-600">Practice questions for aptitude, interviews, and coding</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 border border-slate-200 flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials[activeTab].map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    material.difficulty
                  )}`}
                >
                  {material.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {material.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4">{material.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-600">
                  {material.questionsCount} Questions
                </span>
                <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
