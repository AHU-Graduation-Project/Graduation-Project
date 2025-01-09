import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../Modal/ConformationModel";
import ThemeIcon from "../UI/ThemeIcon";
import { roadmaps } from "../../../data/roadmaps";

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
      className="group relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
    >
      <div className="absolute inset-0 bg-cover bg-center opacity-10" />
      <div className="relative p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <ThemeIcon icon={roadmap.icon} className="w-5 h-5" />
            <h3 className="text-md font-semibold group-hover:text-theme transition-colors duration-300">
              {roadmap.title}
            </h3>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-theme transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => navigate(`/roadmap/${roadmap.id}`)}
            className="text-theme hover:opacity-80 text-sm font-medium"
          >
            Continue
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="text-theme hover:opacity-80 text-sm font-medium"
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

const UserRoadmaps = () => {
  const { user, selectRoadmap } = useAuthStore();

  if (!user?.selectedRoadmaps?.length) {
    return null;
  }
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-theme">Your Roadmaps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {user.selectedRoadmaps.map((roadmapId) => {
          const roadmap = roadmaps.find((r) => r.id === roadmapId);
          if (!roadmap) return null;

          const progress = Math.round(
            ((user.progress[roadmapId]?.length || 0) / 9) * 100
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
  );
};

export default UserRoadmaps;
