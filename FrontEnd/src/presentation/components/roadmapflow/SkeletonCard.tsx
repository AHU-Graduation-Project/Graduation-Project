const SkeletonCard = () => {
  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg min-h-[265px] flex flex-col animate-pulse">
      {/* Platform Badge Skeleton */}
      <div className="absolute top-3 left-3 w-16 h-5 bg-slate-200 dark:bg-slate-700 rounded-full z-10" />

      {/* Image Container Skeleton */}
      <div className="relative h-40">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex flex-grow flex-col justify-between">
        {/* Title Skeleton - Two lines */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        </div>

        {/* Rating and Price Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="w-8 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
          <div className="w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  );
};

// Updated loading state for CoursesSidebar
const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export { SkeletonCard, LoadingState };
