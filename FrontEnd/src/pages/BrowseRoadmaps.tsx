import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoadmapCard from "../components/RoadmapCard";
import ThemeIcon from "../components/ThemeIcon";
import { roadmaps } from "../data/roadmaps";
import { useAuthStore } from "../store/authStore";
import ConfirmationModal from "../components/ConformationModel";
import P from "../components/P";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function SelectedRoadmapCard({ roadmap, progress, onRemove }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRemove = () => {
    onRemove(roadmap.id);
    setModalOpen(false);
  };

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
            <h3 className="text-xl font-bold group-hover:text-theme transition-colors duration-300">
              {roadmap.title}
            </h3>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-theme transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => navigate(`/roadmap/${roadmap.id}`)}
            className="text-theme hover:opacity-80 font-medium"
          >
            Continue Learning
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="text-theme hover:opacity-80 font-medium"
          >
            Remove
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleRemove}
        title="Delete Roadmap"
        message="Are you sure you want to remove this roadmap?"
      />
    </div>
  );
}

export default function BrowseRoadmaps() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, selectRoadmap } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = roadmaps.slice(firstPostIndex, lastPostIndex);

  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    [roadmap.title, roadmap.description].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("search.placeholder")}
        />
      </div>

      {user?.selectedRoadmaps?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-theme">Your Roadmaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.selectedRoadmaps.map((roadmapId) => {
              const roadmap = roadmaps.find((r) => r.id === roadmapId);
              if (!roadmap) return null;

              const progress = Math.round(
                ((user?.progress[roadmapId]?.length || 0) / 9) * 100
              );

              return (
                <SelectedRoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  progress={progress}
                  onRemove={selectRoadmap}
                />
              );
            })}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-theme">Other Roadmaps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPost.length > 0 ? (
          currentPost.map((roadmap) => (
            <RoadmapCard key={roadmap.id} {...roadmap} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No roadmaps found matching your search.
            </p>
          </div>
        )}
      </div>

      <div className="pt-6">
        <P
          totalPosts={filteredRoadmaps.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
