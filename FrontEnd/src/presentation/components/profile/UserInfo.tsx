import { Star, Clock, Trophy } from "lucide-react";
import { useAuthStore } from "../../../application/state/authStore";
import UserRoadmaps from "./UserRoadmaps";

const UserInfo = () => {
  const { user } = useAuthStore(); // Ensure `user` exists

  // if (!user) {
  //   console.warn(
  //     "User data is not available. Ensure the store is correctly initialized."
  //   );
  //   return null;
  // }

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
    {
      icon: Trophy,
      label: "Completed Tasks",
      value: Object.values(user?.progress || {}).flat().length,
      color: "text-green-500",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12">
      <h1 className="text-4xl font-bold mb-4 text-theme">
        Welcome, {user?.first_name} {user?.last_name}
      </h1>
      {/* Stats Section */}
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
      <div className="mt-6">
        {user?.selectedRoadmaps?.length > 0 ? (
          <UserRoadmaps />
        ) : (
          <p className="text-slate-600 dark:text-slate-400">
            You don't have any roadmaps yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
