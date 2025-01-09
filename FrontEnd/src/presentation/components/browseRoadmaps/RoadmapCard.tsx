import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeIcon from '../UI/ThemeIcon';
import { useThemeStore } from '../../../store/themeStore';
import { cn } from '../../../infrastructure/utils/cn';

interface RoadmapCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function RoadmapCard({ id, title, description, icon }: RoadmapCardProps) {
  const { currentTheme } = useThemeStore();

  return (
    <Link
      to={`/roadmap/${id}`}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-300 opacity-0 group-hover:opacity-100" style={{
        backgroundImage: `linear-gradient(to right, ${currentTheme.colors.from}, ${currentTheme.colors.to})`
      }} />
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            "p-3 rounded-lg transition-all duration-300",
            "bg-slate-100 dark:bg-slate-700",
            "group-hover:scale-110"
          )}>
            <ThemeIcon icon={icon} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold group-hover:text-theme transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-medium">
          <span className="text-theme">Learn more</span>
          <svg 
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}