import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Brain, Rocket } from "lucide-react";
import ThemeIcon from "../UI/ThemeIcon";
import useTokenStore from "../../../application/state/tokenStore";

export default function HeroSection() {
  const { userRole } = useTokenStore();

  return (
    <div className="relative min-h-screen">
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-20 lg:pt-32">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme/10 mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-theme"></span>
            </span>
            <span className="text-theme font-medium">
              AI-Powered Learning Paths
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            Master Your Tech Journey with{" "}
            <span className="text-theme">DevPath</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Personalized learning roadmaps powered by AI. Track your progress,
            master new skills, and accelerate your tech career.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/roadmaps"
              className="group relative px-8 py-4 bg-theme text-white  rounded-xl font-medium shadow-xl hover:shadow-theme transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            {!userRole() && (
              <Link
                to="/auth"
                className="px-8 py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-xl font-medium border border-gray-200 dark:border-white/10 transition-colors duration-300"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Code2,
              title: "Interactive Roadmaps",
              description:
                "Follow structured learning paths tailored to your goals",
            },
            {
              icon: Brain,
              title: "AI Assistance",
              description: "Get personalized guidance and recommendations",
            },
            {
              icon: Rocket,
              title: "Track Progress",
              description: "Monitor your journey and celebrate achievements",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="group relative p-5 bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 hover:border-theme/50 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] hover:shadow-lg hover:shadow-theme/5 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] text-center"
            >
              <ThemeIcon
                icon={feature.icon}
                className="relative z-10 w-8 h-8  mb-4"
              />
              <h3 className="relative z-10 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="relative z-10 text-sm text-gray-600 dark:text-gray-400 max-w-[200px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
