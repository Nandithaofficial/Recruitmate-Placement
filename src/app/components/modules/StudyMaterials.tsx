import { useState, useEffect } from "react";
import { BookOpen, Code, MessageSquare, FileText } from "lucide-react";

interface Material {
  _id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: string[];
  fileUrl?: string;
}

export default function StudyMaterials() {
  const [activeTab, setActiveTab] = useState<"aptitude" | "interview" | "coding">("aptitude");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, [activeTab]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/study-material/${activeTab}`);
      const data = await res.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Study Materials
          </h1>
          <p className="text-slate-600">
            Practice questions for aptitude, interviews, and coding
          </p>
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-slate-500">
            Loading materials...
          </div>
        )}

        {/* Materials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all"
            >
              {/* Top */}
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

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {material.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4">
                {material.description}
              </p>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-600">
                  {material.questions?.length || 0} Questions
                </span>

                {material.fileUrl && (
                  <a
                    href={material.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Data */}
        {!loading && materials.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No materials uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}