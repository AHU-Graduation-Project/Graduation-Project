import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SearchBar from "../UI/SearchBar";
import AnimationWrapper from "../UI/Animation/Animation";
import AddRoadmapModal from "./AddRoadmapModal";
import useTokenStore from "../../../application/state/tokenStore";
import { GetRoadmaplist } from "../../../infrastructure/api/GetRoadmaplist";
import RoadmapSkeleton from "./RoadmapSkeleton";
import SectionToggle from "./SectionToggle";
import RoadmapSection from "./RoadmapSection";

export default function BrowseRoadmapsComponent() {
  const [searchQuery, setSearchQuery] = useState("");
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
  const [visibleSections, setVisibleSections] = useState({
    created: true,
    enrolled: true,
    other: true
  });
  const [areSwitchesVisible, setAreSwitchesVisible] = useState(true);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filterRoadmaps = () => {
    const createdIds = new Set(roadmapData.createdRoadmaps.map(r => r.id));
    const userIds = new Set(roadmapData.userRoadmaps.map(r => r.id));
    
    const filteredUserRoadmaps = roadmapData.userRoadmaps.filter(r => !createdIds.has(r.id));
    const filteredOtherRoadmaps = roadmapData.roadmaps.filter(r => 
      !createdIds.has(r.id) && !userIds.has(r.id)
    );

    return {
      created: roadmapData.createdRoadmaps,
      enrolled: filteredUserRoadmaps,
      other: filteredOtherRoadmaps
    };
  };

  const filteredSections = filterRoadmaps();

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimationWrapper animationType={5}>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
            Development Roadmaps
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/80">
            Choose your path and start your journey in software development
          </p>
        </div>
      </AnimationWrapper>

      <div className="max-w-2xl mx-auto mb-4">
        <AnimationWrapper animationType={5}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roadmaps..."
                className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md flex-grow"
              />
              {userRole() == 2 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-theme py-2 mt-2 sm:mt-0 text-sm text-white px-4 rounded-md whitespace-nowrap"
                >
                  Create Roadmap
                </button>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setAreSwitchesVisible(!areSwitchesVisible)}
                className="text-theme flex items-center"
              >
                {areSwitchesVisible ? "Hide Filters" : "Show Filters"}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${areSwitchesVisible ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div className={`flex flex-wrap gap-4 justify-center sm:justify-start bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm transition-all duration-300 ${areSwitchesVisible ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <SectionToggle
                label="Created Roadmaps"
                isEnabled={visibleSections.created}
                onChange={(checked) => setVisibleSections(prev => ({ ...prev, created: checked }))} 
              />
              <SectionToggle
                label="Enrolled Roadmaps"
                isEnabled={visibleSections.enrolled}
                onChange={(checked) => setVisibleSections(prev => ({ ...prev, enrolled: checked }))} 
              />
              <SectionToggle
                label="Other Roadmaps"
                isEnabled={visibleSections.other}
                onChange={(checked) => setVisibleSections(prev => ({ ...prev, other: checked }))} 
              />
            </div>
          </div>
        </AnimationWrapper>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9).fill(0).map((_, index) => (
            <RoadmapSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <RoadmapSection
            title="Created Roadmaps"
            roadmaps={filteredSections.created}
            type="created"
            visible={visibleSections.created}
          />
          <RoadmapSection
            title="Enrolled Roadmaps"
            roadmaps={filteredSections.enrolled}
            type="enrolled"
            visible={visibleSections.enrolled}
          />
          <RoadmapSection
            title="Other Roadmaps"
            roadmaps={filteredSections.other}
            type="other"
            visible={visibleSections.other}
          />
        </>
      )}

      <AddRoadmapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
