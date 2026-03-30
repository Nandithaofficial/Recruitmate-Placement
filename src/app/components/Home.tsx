import { Link } from "react-router";
import {
  FileText,
  Target,
  BookOpen,
  Brain,
  Video,
  Users,
  Code,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: "Resume Manager",
      description: "Upload, manage, and organize your resumes effortlessly",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "ATS Resume Scoring",
      description: "Get instant feedback on your resume's ATS compatibility",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Study Materials",
      description: "Access curated aptitude, interview, and coding questions",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Brain,
      title: "AI Mock Tests",
      description: "Practice with AI-powered tests tailored to companies",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Video,
      title: "AI Interview Sessions",
      description: "Realistic mock interviews with AI and HR features",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Group Discussions",
      description: "Practice GD with friends or AI participants",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Code,
      title: "Coding Platform",
      description: "LeetCode-style practice with 100+ problems",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Dashboard",
      description: "Track your growth with beautiful analytics",
      gradient: "from-cyan-500 to-teal-500"
    }
  ];

  const stats = [
    { value: "1000+", label: "Practice Questions" },
    { value: "50+", label: "Companies Covered" },
    { value: "AI-Powered", label: "Mock Interviews" },
    { value: "100%", label: "Free to Use" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recruitmate
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Your Complete Placement Companion</span>
          </div>

          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Ace Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Preparation
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            From resume optimization to coding practice, interview prep to progress tracking -
            everything you need to land your dream placement in one powerful platform.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 text-lg"
            >
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all text-lg"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-600">8 powerful modules designed to give you the competitive edge</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up & Set Goals</h3>
              <p className="text-blue-100">Create your account and tell us about your target companies and roles</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice & Learn</h3>
              <p className="text-blue-100">Use AI-powered tools to practice interviews, coding, and group discussions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Improve</h3>
              <p className="text-blue-100">Monitor your progress with detailed analytics and land your dream job</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Recruitmate?</h2>
            <div className="space-y-4">
              {[
                "AI-powered personalized learning paths",
                "Real-time ATS resume scoring and optimization",
                "Company-specific mock tests and interviews",
                "Interactive coding platform with 100+ problems",
                "Beautiful progress tracking with actionable insights",
                "Practice group discussions with AI or friends",
                "HR tools for conducting interviews",
                "100% free - no hidden charges"
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
              <Brain className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">AI-Powered</h3>
              <p className="text-blue-100">Smart algorithms that adapt to your learning style</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white mt-8">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Track Growth</h3>
              <p className="text-purple-100">Visualize your improvement over time</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white -mt-8">
              <Code className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Real Practice</h3>
              <p className="text-orange-100">Industry-standard coding challenges</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Collaborate</h3>
              <p className="text-green-100">Practice with friends or AI peers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEyYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already preparing smarter with PlacementPro
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Recruitmate
                </span>
              </div>
              <p className="text-gray-600 text-sm">Your complete companion for placement preparation</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Resume Manager</li>
                <li>ATS Scoring</li>
                <li>Study Materials</li>
                <li>AI Mock Tests</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Practice</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>AI Interviews</li>
                <li>Group Discussions</li>
                <li>Coding Platform</li>
                <li>Progress Tracking</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Recruitmate</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            © 2026 Recruitmate. All rights reserved. Built with ❤️ for students.
          </div>
        </div>
      </footer>
    </div>
  );
}
