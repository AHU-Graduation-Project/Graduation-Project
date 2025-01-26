import AnimationWrapper from '../UI/Animation/Animation';
import RoadmapCard from './RoadmapCard';
import SelectedRoadmapCard from './SelectedRoadmapCard';
import { useAuthStore } from '../../../application/state/authStore';
import { useState } from 'react';
import ConfirmationModal from '../Modal/ConformationModel';
import { FollowRoadmap } from '../../../infrastructure/api/FollowRoadmap';

const RoadmapSection = ({ title, roadmaps, type }) => {
  const { user, selectRoadmap } = useAuthStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRoadmapSlug, setSelectedRoadmapSlug] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const followRoadmap = FollowRoadmap();

  const handleRemove = async () => {
    setLoading(true);
    try {
      await followRoadmap.execute(selectedRoadmapSlug);
      window.location.reload();
    } catch (error) {
      console.error('Failed to follow roadmap:', error);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  if (!roadmaps.length) return null;

  return (
    <div className="mb-12">
      <AnimationWrapper animationType={5}>
        <div className="flex justify-center items-center  items-center mb-6">
          <h2 className="text-2xl font-bold text-theme">{title}</h2>
        
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) =>
            type === 'enrolled' ? (
              <SelectedRoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                progress={Math.round(
                  ((user?.progress[roadmap.id]?.length || 0) / 9) * 100,
                )}
                onRemove={() => {
                  setSelectedRoadmapSlug(roadmap.slug);
                  setModalOpen(true);
                }}
              />
            ) : (
              <RoadmapCard key={roadmap.id} {...roadmap} />
            ),
          )}
        </div>
      </AnimationWrapper>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleRemove}
        isLoading={isLoading}
        title="Delete Roadmap"
        message="Are you sure you want to remove this roadmap?"
      />
    </div>
  );
};

export default RoadmapSection;
