import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp, Award, Target, Zap, Calendar } from "lucide-react";

export default function ProgressDashboard() {
  const [data, setData] = useState<any>(null);

  // fallback data (so UI always renders)
  const fallbackData = {
    weeklyProgress: [
      { day: "Mon", score: 65, time: 45 },
      { day: "Tue", score: 72, time: 60 },
      { day: "Wed", score: 68, time: 55 },
      { day: "Thu", score: 85, time: 75 },
      { day: "Fri", score: 78, time: 65 },
      { day: "Sat", score: 92, time: 90 },
      { day: "Sun", score: 88, time: 80 },
    ],
    skillsData: [
      { subject: "DSA", score: 85 },
      { subject: "Aptitude", score: 78 },
      { subject: "Communication", score: 92 },
      { subject: "Technical", score: 88 },
      { subject: "Coding", score: 80 },
      { subject: "Problem Solving", score: 86 },
    ],
    moduleActivity: [
      { name: "Resume", sessions: 12 },
      { name: "ATS", sessions: 8 },
      { name: "Study", sessions: 25 },
      { name: "Mock Test", sessions: 15 },
      { name: "Interview", sessions: 10 },
      { name: "GD", sessions: 7 },
      { name: "Coding", sessions: 35 },
    ],
  };

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.email) {
    fetch(
      `http://localhost:5000/api/progress/${encodeURIComponent(user.email)}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => setData(fallbackData));
  } else {
    setData(fallbackData);
  }
}, []);

  const chartData =
  data && data.weeklyProgress ? data : fallbackData;

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Progress Dashboard
              </h1>
              <p className="text-slate-600">Track your weekly performance and growth</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Weekly Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
            <h2 className="text-xl font-bold mb-4">Weekly Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" />
                <Line type="monotone" dataKey="time" stroke="#a855f7" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
            <h2 className="text-xl font-bold mb-4">Skills Assessment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={chartData.skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  dataKey="score"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
          <h2 className="text-xl font-bold mb-4">Module Activity</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData.moduleActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sessions" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}