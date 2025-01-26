import { useNavigate } from "react-router-dom";
import ThemeIcon from "../UI/ThemeIcon";
import { LucideIcon } from "lucide-react";
import AnimationWrapper from "../UI/Animation/Animation";
import { IconComponents } from '../../../domain/enums/IconType';

interface Roadmap {
  id: string;
  image: string;
  icon: LucideIcon;
  title: string;
}

function SelectedRoadmapCard({
  roadmap,
  progress,
  onRemove,
}: {
  roadmap: Roadmap;
  progress: number;
  onRemove: () => void;
}) {
  const navigate = useNavigate();
  const IconComponent = IconComponents[roadmap.icon];

  return (
    <AnimationWrapper animationType={5}>
      <div className="group overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover_shawdow_effect border-rad transition-all  w-full">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${roadmap.image})` }}
        />
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <ThemeIcon icon={IconComponent} className="w-6 h-6" />
              <h3 className="text-xl font-bold group-hover:text-theme transition-colors duration-300">
                {roadmap.title}
              </h3>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={() => navigate(`/roadmap/${roadmap.slug}`)}
              className="text-theme hover:opacity-80 font-medium"
            >
              Continue Learning
            </button>
            <button
              onClick={onRemove}
              className="text-theme hover:opacity-80 font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}

export default SelectedRoadmapCard;
