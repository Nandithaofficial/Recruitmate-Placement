import { useState } from "react";
import { Users, Bot, UserPlus, Clock, MessageSquare } from "lucide-react";

export default function GroupDiscussion() {
  const [mode, setMode] = useState<"friends" | "ai">("friends");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Group Discussion</h1>
          <p className="text-slate-600">
            Practice group discussions with friends or AI participants
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setMode("friends")}
            className={`p-8 rounded-2xl border-2 transition-all text-left ${
              mode === "friends"
                ? "border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">With Friends</h2>
            <p className="text-slate-600">
              Invite your friends to join a group discussion session. Collaborate and practice
              together.
            </p>
          </button>

          <button
            onClick={() => setMode("ai")}
            className={`p-8 rounded-2xl border-2 transition-all text-left ${
              mode === "ai"
                ? "border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">With AI</h2>
            <p className="text-slate-600">
              Practice with AI-powered participants. Perfect for solo practice anytime, anywhere.
            </p>
          </button>
        </div>

        {/* Friends Mode */}
        {mode === "friends" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h3 className="text-xl font-semibold mb-6">Create New GD Session</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Impact of AI on Job Market"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration (minutes)
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>15</option>
                      <option>20</option>
                      <option>30</option>
                      <option>45</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Max Participants
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>4</option>
                      <option>6</option>
                      <option>8</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Invite Friends (Email)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="friend@example.com"
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Add
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["john@example.com", "sarah@example.com"].map((email) => (
                      <span
                        key={email}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {email}
                        <button className="hover:text-blue-900">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Create & Invite
              </button>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  {
                    topic: "Remote Work Culture",
                    participants: 4,
                    duration: "20 min",
                    status: "Waiting",
                  },
                  {
                    topic: "Sustainable Technology",
                    participants: 6,
                    duration: "30 min",
                    status: "In Progress",
                  },
                ].map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{session.topic}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {session.participants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === "In Progress"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Mode */}
        {mode === "ai" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h3 className="text-xl font-semibold mb-6">Start AI-Powered GD</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Topic Category
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Current Affairs</option>
                    <option>Technology & Innovation</option>
                    <option>Social Issues</option>
                    <option>Business & Economy</option>
                    <option>Environment & Sustainability</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Or Enter Custom Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Future of Electric Vehicles"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Number of AI Participants
                  </label>
                  <div className="flex gap-3">
                    {[3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-all"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    AI Difficulty Level
                  </label>
                  <div className="flex gap-3">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <button
                        key={level}
                        className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-all"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Bot className="w-5 h-5" />
                Start AI Discussion
              </button>
            </div>

            {/* Past AI Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold mb-4">Recent AI Sessions</h3>
              <div className="space-y-3">
                {[
                  {
                    topic: "Artificial Intelligence Ethics",
                    score: 87,
                    date: "2026-03-19",
                  },
                  {
                    topic: "Climate Change Solutions",
                    score: 92,
                    date: "2026-03-17",
                  },
                  {
                    topic: "Cryptocurrency Regulation",
                    score: 78,
                    date: "2026-03-14",
                  },
                ].map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-medium text-slate-900">{session.topic}</h4>
                      <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                        <MessageSquare className="w-4 h-4" />
                        {session.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-purple-600">{session.score}%</p>
                      <p className="text-xs text-slate-600">Performance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
