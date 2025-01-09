import { Link } from "react-router-dom";
import { useAuthStore } from "../../../application/state/authStore";

export default function HeroSection() {
  const { isAuthenticated } = useAuthStore();

  return (
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
              insights and real-world data. Track your progress and achieve your
              goals.
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
  );
}
