import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import SearchBar from '../UI/SearchBar';
import AnimationWrapper from '../UI/Animation/Animation';
import AddRoadmapModal from './AddRoadmapModal';
import useTokenStore from '../../../application/state/tokenStore';
import { GetRoadmaplist } from '../../../infrastructure/api/GetRoadmaplist';
import RoadmapSkeleton from './RoadmapSkeleton';
import RoadmapSection from './RoadmapSection';

interface Roadmap {
  id: number;
  title: string;
  description: string;
}

interface RoadmapData {
  roadmaps: Roadmap[];
  userRoadmaps: Roadmap[];
  createdRoadmaps: Roadmap[];
}

interface GetRoadmapListResponse {
  data: {
    official: {
      roadmaps: Roadmap[];
      count: string;
    };
    userRoadmaps: Roadmap[];
    createdRoadmaps: Roadmap[];
  };
}

export default function BrowseRoadmapsComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [hasSearched, setHasSearched] = useState<boolean>(!!searchParams.get('search'));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(9); // Changed default value to 10
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userRole } = useTokenStore();
  const [roadmapData, setRoadmapData] = useState<RoadmapData>({
    roadmaps: [],
    userRoadmaps: [],
    createdRoadmaps: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPosts, setTotalPosts] = useState<number>(0); // Add state for total posts
  const getRoadmaplist = GetRoadmaplist();

  const fetchRoadmaps = async () => {
    setIsLoading(true);
    try {
      const response: GetRoadmapListResponse = await getRoadmaplist.execute(
        currentPage,
        postsPerPage,
        searchQuery // Pass search query to API
      );
      setRoadmapData({
        roadmaps: response.data.official.roadmaps || [],
        userRoadmaps: response.data.userRoadmaps || [],
        createdRoadmaps: response.data.createdRoadmaps || [],
      });
      setTotalPosts(parseInt(response.data.official.count, 10));
    } catch (error) {
      console.error('Failed to fetch roadmaps:', error);
      setRoadmapData({ roadmaps: [], userRoadmaps: [], createdRoadmaps: [] });
      setTotalPosts(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search') || '');
      setHasSearched(true);
      fetchRoadmaps();
    }
  }, []);

  useEffect(() => {
    fetchRoadmaps();
  }, [currentPage, postsPerPage]); // Remove searchQuery from dependency array

  const handleSearch = () => {
    setCurrentPage(1);
    setHasSearched(true);
    setSearchParams(searchQuery ? { search: searchQuery } : {});
    fetchRoadmaps();
  };

  const filterRoadmaps = () => {
    if (!roadmapData) return { created: [], enrolled: [], other: [] };

    const createdIds = new Set(
      (roadmapData.createdRoadmaps || []).map((r) => r.id),
    );
    const userIds = new Set((roadmapData.userRoadmaps || []).map((r) => r.id));

    const filteredUserRoadmaps = (roadmapData.userRoadmaps || []).filter(
      (r) => !createdIds.has(r.id),
    );
    const filteredOtherRoadmaps = (roadmapData.roadmaps || []).filter(
      (r) => !createdIds.has(r.id) && !userIds.has(r.id),
    );

    return {
      created: roadmapData.createdRoadmaps || [],
      enrolled: filteredUserRoadmaps,
      other: filteredOtherRoadmaps,
    };
  };

  const filteredSections = filterRoadmaps();

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-80px)]">
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
                onSubmit={handleSearch}
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
          </div>
        </AnimationWrapper>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(postsPerPage)
            .fill(0)
            .map((_, index) => (
              <RoadmapSkeleton key={index} />
            ))}
        </div>
      ) : hasSearched && searchQuery && !filteredSections.created.length && 
         !filteredSections.enrolled.length && 
         !filteredSections.other.length ? (
        <AnimationWrapper animationType={5}>
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-800 rounded-lg min-h-[400px]">
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
              No roadmaps found matching "{searchQuery}"
            </p>
          </div>
        </AnimationWrapper>
      ) : !filteredSections.created.length && 
         !filteredSections.enrolled.length && 
         !filteredSections.other.length ? (
        <AnimationWrapper animationType={5}>
          <div className="flex flex-col items-center justify-center p-8  rounded-lg min-h-[400px]">
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
              No roadmaps available yet. Check back later!
            </p>
          </div>
        </AnimationWrapper>
      ) : (
        <>
          <RoadmapSection
            title="Created Roadmaps"
            roadmaps={filteredSections.created}
            type="created"
          />
          <RoadmapSection
            title="Enrolled Roadmaps"
            roadmaps={filteredSections.enrolled}
            type="enrolled"
          />
          <RoadmapSection
            title="offical Roadmaps"
            roadmaps={filteredSections.other}
            type="other"
          />
        </>
      )}

      <Pagination
        totalPosts={totalPosts} // Use totalPosts state
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <AddRoadmapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
