const RoadmapSkeleton = () => (
  <div className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800">
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-slate-700" />
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-gray-200 dark:bg-slate-700 animate-pulse">
          <div className="w-6 h-6" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/5 animate-pulse" />
      </div>

      <div className="flex items-center mt-6">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
        <div className="w-4 h-4 ml-1 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default RoadmapSkeleton;
