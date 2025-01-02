import { Edit, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RoadmapToolbarProps {
  onEditNode: () => void;
  onShowDetails: () => void;
  isNodeSelected: boolean;
}

export default function RoadmapToolbar({ 
  onEditNode, 
  onShowDetails,
  isNodeSelected 
}: RoadmapToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <button
        onClick={onEditNode}
        disabled={!isNodeSelected}
        className={cn(
          "p-2 rounded-lg transition-colors flex items-center gap-2",
          isNodeSelected
            ? "bg-theme text-white hover:opacity-90"
            : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        )}
      >
        <Edit className="w-4 h-4" />
        <span>Edit</span>
      </button>

      <button
        onClick={onShowDetails}
        disabled={!isNodeSelected}
        className={cn(
          "p-2 rounded-lg transition-colors flex items-center gap-2",
          isNodeSelected
            ? "bg-theme text-white hover:opacity-90"
            : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        )}
      >
        <Info className="w-4 h-4" />
        <span>Details</span>
      </button>
    </div>
  );
}