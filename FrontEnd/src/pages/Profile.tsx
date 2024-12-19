import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Clock, Trophy } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { roadmaps } from "../data/roadmaps";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated, selectRoadmap } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const stats = [
    {
      icon: Star,
      label: "Selected Paths",
      value: user.selectedRoadmaps.length,
      color: "text-yellow-500",
    },
    {
      icon: Clock,
      label: "Hours Spent",
      value: "24",
      color: "text-blue-500",
    },
    {
      icon: Trophy,
      label: "Completed Tasks",
      value: Object.values(user.progress).flat().length,
      color: "text-green-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12">
          <h1 className="text-4xl font-bold mb-4 text-theme">
            {t("profile.welcome")}, {user.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 flex items-center gap-4"
              >
                <div
                  className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700 ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-theme">
            {t("profile.yourRoadmaps")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.selectedRoadmaps.map((roadmapId) => {
              const roadmap = roadmaps.find((r) => r.id === roadmapId);
              if (!roadmap) return null;

              const progress = user.progress[roadmapId] || [];
              const totalNodes = 4;
              const completedNodes = progress.length;
              const percentComplete = Math.round(
                (completedNodes / totalNodes) * 100
              );

              return (
                <div
                  key={roadmap.id}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${roadmap.image})` }}
                  />
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <roadmap.icon className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-theme">
                          {roadmap.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>{t("profile.progress")}</span>
                        <span>{percentComplete}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-theme transition-all"
                          style={{ width: `${percentComplete}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                      className="text-theme hover:opacity-80 font-medium"
                    >
                      {t("profile.continueLearn")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-theme">
            {t("profile.availableRoadmaps")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap) => {
              const isSelected = user.selectedRoadmaps.includes(roadmap.id);

              return (
                <div
                  key={roadmap.id}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${roadmap.image})` }}
                  />
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <roadmap.icon className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-theme">
                          {roadmap.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {roadmap.description}
                    </p>
                    <button
                      onClick={() => selectRoadmap(roadmap.id)}
                      className="bg-theme text-white px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    >
                      {isSelected
                        ? t("profile.removeFromRoadmaps")
                        : t("profile.addToRoadmaps")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
