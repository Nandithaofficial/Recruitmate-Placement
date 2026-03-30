import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  FileText,
  Target,
  BookOpen,
  BrainCircuit,
  Video,
  Users,
  Code,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Briefcase,
} from "lucide-react";

const menuItems = [
  { path: "/dashboard/resume-manager", icon: FileText, label: "Resume Manager" },
  { path: "/dashboard/ats-scoring", icon: Target, label: "ATS Scoring" },
  { path: "/dashboard/study-materials", icon: BookOpen, label: "Study Materials" },
  { path: "/dashboard/ai-mock-test", icon: BrainCircuit, label: "AI Mock Test" },
  { path: "/dashboard/ai-interview", icon: Video, label: "AI Interview" },
  { path: "/dashboard/group-discussion", icon: Users, label: "Group Discussion" },
  { path: "/dashboard/coding-platform", icon: Code, label: "Coding Platform" },
  { path: "/dashboard/progress", icon: TrendingUp, label: "Progress Dashboard" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Recruitmate
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg mx-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 border-b border-slate-200 bg-white">
    <h2 className="text-xl font-semibold">
      Welcome, {user?.name || "User"} 👋
    </h2>
  </div>
        <Outlet />
      </main>
    </div>
  );
}
