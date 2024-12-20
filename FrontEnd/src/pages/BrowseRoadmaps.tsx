import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoadmapCard from "../components/RoadmapCard";
import ThemeIcon from "../components/ThemeIcon";
import { roadmaps } from "../data/roadmaps";
import { useAuthStore } from "../store/authStore";

export default function BrowseRoadmaps() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, selectRoadmap } = useAuthStore();

  if (!user) return null;

  const filteredRoadmaps = roadmaps.filter(
    (roadmap) =>
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          {t("roadmaps.title")}
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          {t("roadmaps.subtitle")}
        </p>
      </div>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
                      <ThemeIcon icon={roadmap.icon} className="w-6 h-6" />
                      {/* <h3 className="text-xl font-bold text-theme">
                        {roadmap.title}
                      </h3> */}
                      <h3 className="text-xl font-bold group-hover:text-theme transition-colors duration-300">
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
                  <div className="flex flex-row justify-between">
                    <button
                      onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                      className="text-theme hover:opacity-80 font-medium"
                    >
                      {t("profile.continueLearn")}
                    </button>
                    <button
                      onClick={() => selectRoadmap(roadmap.id)}
                      className="text-theme hover:opacity-80 font-medium"
                    >
                      {"Remove"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-theme">
        {t("Other Roadmaps")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} {...roadmap} />
        ))}
        {filteredRoadmaps.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No roadmaps found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
