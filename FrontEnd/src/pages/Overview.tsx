import { TrendingUp, Brain, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Overview() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <div className="absolute inset-y-0 right-0 w-1/2">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              style={{ color: "rgba(255,255,255,0.1)" }}
            >
              {[...Array(10)].map((_, i) => (
                <line key={i} x1="0" y1={i * 10} x2="100" y2={i * 10} />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={i} x1={i * 10} y1="0" x2={i * 10} y2="100" />
              ))}
            </svg>
          </div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-3xl">
              <h1 className="text-6xl font-bold mb-6 text-white">
                Your Path to{" "}
                <span className="text-theme text-transparent bg-clip-text">
                  Tech Excellence
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Discover personalized learning roadmaps powered by industry
                insights and real-world data. Track your progress and achieve
                your goals.
              </p>
              {!isAuthenticated && (
                <div className="flex gap-4">
                  <Link
                    to="/auth"
                    className="px-6 py-3 rounded-lg bg-theme text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/auth"
                    className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              Everything you need to{" "}
              <span className="text-theme text-transparent bg-clip-text">
                succeed
              </span>
            </h2>

            <div className="space-y-24">
              <div className="flex items-center gap-12">
                <div className="flex-1">
                  <Target className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Personalized Learning Paths
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    AI-powered roadmaps tailored to your goals and experience
                    level. Track your progress and stay motivated.
                  </p>
                  <Link
                    to="/generate"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Generate Your Path <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20" />
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
                    alt="Learning Path"
                    className="relative rounded-2xl shadow-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-12 flex-row-reverse">
                <div className="flex-1">
                  <Brain className="w-12 h-12 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Skill Analysis</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Get detailed insights about required skills, market demand,
                    and salary expectations for each career path.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center text-purple-500 hover:text-purple-600 font-medium"
                  >
                    Explore Skills <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20" />
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
                    alt="Skill Analysis"
                    className="relative rounded-2xl shadow-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="flex-1">
                  <TrendingUp className="w-12 h-12 text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Market Insights</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Stay updated with real-time job market trends and make
                    informed decisions about your career path.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center text-emerald-500 hover:text-emerald-600 font-medium"
                  >
                    View Trends <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20" />
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                    alt="Market Insights"
                    className="relative rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
