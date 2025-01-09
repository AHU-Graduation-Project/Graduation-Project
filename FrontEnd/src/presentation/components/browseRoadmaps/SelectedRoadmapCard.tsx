import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeIcon from "../UI/ThemeIcon";
import ConfirmationModal from "../Modal/ConformationModel";
interface Roadmap {
  id: string;
  image: string;
  icon: string;
  title: string;
}

function SelectedRoadmapCard({ roadmap, progress, onRemove }: { roadmap: Roadmap; progress: number; onRemove: (id: string) => void }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRemove = () => {
    onRemove(roadmap.id);
    setModalOpen(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
      <div className="absolute inset-0 bg-cover bg-center opacity-10"
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

export default SelectedRoadmapCard;