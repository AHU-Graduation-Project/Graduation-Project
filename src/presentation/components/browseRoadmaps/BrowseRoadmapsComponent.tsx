import { useState, useEffect } from "react";
import RoadmapCard from "./RoadmapCard";
import { useAuthStore } from "../../../application/state/authStore";
import Pagination from "./Pagination";
import SearchBar from "../UI/SearchBar";
import SelectedRoadmapCard from "./SelectedRoadmapCard";
import AnimationWrapper from "../UI/Animation/Animation";
import AddRoadmapModal from "./AddRoadmapModal";
import useTokenStore from "../../../application/state/tokenStore";
import { GetRoadmaplist } from "../../../infrastructure/api/GetRoadmaplist";

export default function BrowseRoadmapsComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, selectRoadmap } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userRole } = useTokenStore();
  const [roadmapData, setRoadmapData] = useState({
    roadmaps: [],
    userRoadmaps: [],
    createdRoadmaps: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const getRoadmaplist = GetRoadmaplist();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setIsLoading(true);
      try {
        const response = await getRoadmaplist.execute();
        console.log(response);
        setRoadmapData(response.data || { roadmaps: [], userRoadmaps: [], createdRoadmaps: [] });
      } catch (error) {
        console.error("Failed to fetch roadmaps:", error);
        setRoadmapData({ roadmaps: [], userRoadmaps: [], createdRoadmaps: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const filteredRoadmaps = (roadmapData.roadmaps || []).filter((roadmap) =>
    [roadmap.title, roadmap.description].some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filteredRoadmaps.slice(firstPostIndex, lastPostIndex);

  const RoadmapSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
      <div className="mt-4 h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
    </div>
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimationWrapper animationType={5}>
        {" "}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
            Development Roadmaps
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/80">
            Choose your path and start your journey in software development
          </p>
        </div>
      </AnimationWrapper>

      <div className="max-w-2xl mx-auto mb-12">
        <AnimationWrapper animationType={5}>
          <div className="flex flex-col sm:flex-row">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roadmaps..."
              className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md flex-grow"
            />
            {userRole() == 2 && (
              <button
                onClick={() => setIsModalOpen(true)}
                //w-[230px] max-h-[50px]
                className="bg-theme py-2 mt-2 sm:mt-0  text-sm sm:ml-2 text-white px-1 sm:px-3 sm:py-1 rounded-md  "
              >
                Create Roadmap
              </button>
            )}
          </div>
        </AnimationWrapper>
      </div>

      {!isLoading && Array.isArray(roadmapData.userRoadmaps) && 
        roadmapData.userRoadmaps.length > 0 && (
          <div className="mb-12">
            <AnimationWrapper animationType={5}>
              <h2 className="text-2xl font-bold mb-6 text-theme">
                Your Roadmaps
              </h2>
            </AnimationWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapData.userRoadmaps.map((roadmap) => (
                <SelectedRoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  progress={Math.round(
                    ((user?.progress[roadmap.id]?.length || 0) / 9) * 100
                  )}
                  onRemove={selectRoadmap}
                />
              ))}
            </div>
          </div>
      )}

      <AnimationWrapper animationType={5}>
        <h2 className="text-2xl font-bold mb-6 text-theme">Other Roadmaps</h2>
      </AnimationWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(9).fill(0).map((_, index) => (
            <RoadmapSkeleton key={index} />
          ))
        ) : currentPost.length > 0 ? (
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
      <AddRoadmapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="pt-6 z-40">
        <Pagination
          totalPosts={filteredRoadmaps.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
