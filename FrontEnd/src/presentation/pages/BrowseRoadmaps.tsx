import { useState, useEffect } from "react";
import RoadmapCard from "../components/browseRoadmaps/RoadmapCard";
import { roadmaps } from "../../data/roadmaps";
import { useAuthStore } from "../../application/state/authStore";
import P from "../components/browseRoadmaps/P";
import SearchBar from "../components/UI/SearchBar";
import SelectedRoadmapCard from "../components/browseRoadmaps/SelectedRoadmapCard";

export default function BrowseRoadmaps() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, selectRoadmap } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    [roadmap.title, roadmap.description].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filteredRoadmaps.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          Development Roadmaps
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          Choose your path and start your journey in software development
        </p>
      </div>
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={"Search roadmaps..."}
        />
      </div>

      {Array.isArray(user?.selectedRoadmaps) &&
        user.selectedRoadmaps.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-theme">
              Your Roadmaps
            </h2>
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
