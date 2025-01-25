import AnimationWrapper from "../UI/Animation/Animation";
import RoadmapCard from "./RoadmapCard";
import SelectedRoadmapCard from "./SelectedRoadmapCard";
import { useAuthStore } from "../../../application/state/authStore";

const RoadmapSection = ({ title, roadmaps, type }) => {
  const { user, selectRoadmap } = useAuthStore();
  if ( !roadmaps.length) return null;

  return (
    <div className="mb-12">
      <AnimationWrapper animationType={5}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-theme">{title}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {roadmaps.length} roadmap{roadmaps.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            type === 'enrolled' ? (
              <SelectedRoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                progress={Math.round(((user?.progress[roadmap.id]?.length || 0) / 9) * 100)}
                onRemove={selectRoadmap}
              />
            ) : (
              <RoadmapCard key={roadmap.id} {...roadmap} />
            )
          ))}
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default RoadmapSection;
