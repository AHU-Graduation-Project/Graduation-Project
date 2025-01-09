import { Brain, Target, TrendingUp, ArrowRight } from "lucide-react";
import Feature from "./Feature";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Target className="text-blue-500" />,
      title: "Personalized Learning Paths",
      description:
        "AI-powered roadmaps tailored to your goals and experience level. Track your progress and stay motivated.",
      imageUrl:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      linkText: "Generate Your Path",
      linkUrl: "/generate",
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      icon: <Brain className="text-purple-500" />,
      title: "Skill Analysis",
      description:
        "Get detailed insights about required skills, market demand, and salary expectations for each career path.",
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      linkText: "Explore Skills",
      linkUrl: "/",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="text-emerald-500" />,
      title: "Market Insights",
      description:
        "Stay updated with real-time job market trends and make informed decisions about your career path.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      linkText: "View Trends",
      linkUrl: "/",
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
  ];

  return (
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
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
