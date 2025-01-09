interface GeneratorResourcesProps {
  sources: any[];
}

export default function GeneratorResources({ sources }: GeneratorResourcesProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-theme">Learning Resources</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-theme transition-all"
          >
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-theme">
              {/* Resource type icons */}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-1 truncate group-hover:text-theme transition-colors">
                {source.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {source.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}