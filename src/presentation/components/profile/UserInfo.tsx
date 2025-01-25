import { Star, Clock, Trophy } from "lucide-react";
import { useAuthStore } from "../../../application/state/authStore";
import RoadmapSection from "../browseRoadmaps/RoadmapSection";
import { useState, useEffect } from "react";
import { GetRoadmaplist } from "../../../infrastructure/api/GetRoadmaplist";
import RoadmapSkeleton from "../browseRoadmaps/RoadmapSkeleton";

interface Roadmap {
  id: number;
  title: string;
  description: string;
}
interface RoadmapData {
  userRoadmaps: Roadmap[];
}

interface GetRoadmapListResponse {
  data: {
    userRoadmaps: Roadmap[];
  };
}

const UserInfo = () => {
  const { user } = useAuthStore(); // Ensure `user` exists
  const [roadmapData, setRoadmapData] = useState<RoadmapData>({
    userRoadmaps: [],
  });
  const getRoadmaplist = GetRoadmaplist();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filterRoadmaps = () => {
    if (!roadmapData) return { created: [] };

    const createdIds = new Set(
      (roadmapData.userRoadmaps || []).map((r) => r.id)
    );

    const filteredUserRoadmaps = roadmapData.userRoadmaps || [];

    return {
      created: roadmapData.userRoadmaps || [],
    };
  };

  const filteredSections = filterRoadmaps();

  const stats = [
    {
      icon: Star,
      label: "Selected Paths",
      value: user?.selectedRoadmaps?.length || 0,
      color: "text-yellow-500",
    },
    {
      icon: Clock,
      label: "User Skills",
      value: user?.selectedSkills?.length || 0,
      color: "text-blue-500",
    },
  ];

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setIsLoading(true);
      try {
        const response: GetRoadmapListResponse = await getRoadmaplist.execute();
        setRoadmapData({
          userRoadmaps: response.data.userRoadmaps || [],
        });
      } catch (error) {
        console.error("Failed to fetch roadmaps:", error);
        setRoadmapData({ userRoadmaps: [] });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12">
      <h1 className="text-4xl font-bold mb-4 text-theme">
        Welcome, {user?.first_name} {user?.last_name}
      </h1>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 flex items-center gap-4"
          >
            <div
              className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700 ${stat.color}`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(1)
              .fill(0)
              .map((_, index) => (
                <RoadmapSkeleton key={index} />
              ))}
          </div>
        ) : (
          <RoadmapSection
            title="Created Roadmaps"
            roadmaps={filteredSections.created}
            type="created"
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
