import { Star, Clock, Trophy } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const UserInfo = () => {
  const { user, completedRoadmaps } = useAuthStore(); // Access completedRoadmaps correctly

  if (!user) return null;

  const stats = [
    {
      icon: Star,
      label: "Selected Paths",
      value: user.selectedRoadmaps.length,
      color: "text-yellow-500",
    },
    {
      icon: Clock,
      label: "Completed Roadmaps",
      value: completedRoadmaps.length, // Ensure this pulls from the store
      color: "text-blue-500",
    },
    {
      icon: Trophy,
      label: "Completed Tasks",
      value: Object.values(user.progress).flat().length,
      color: "text-green-500",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12">
      <h1 className="text-4xl font-bold mb-4 text-theme">
        Welcome, {user.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-theme">
          Completed Roadmaps
        </h2>
        {completedRoadmaps.length > 0 ? (
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
            {completedRoadmaps.map((roadmapId) => (
              <li key={roadmapId} className="text-lg">
                {roadmapId}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-600 dark:text-slate-400">
            No completed roadmaps yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
