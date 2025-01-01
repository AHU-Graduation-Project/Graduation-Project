import { Edit, Plus, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface RoadmapToolbarProps {
  onAddNode: () => void;
  onEditNode: () => void;
  onDeleteNode: () => void;
  isNodeSelected: boolean;
}

export default function RoadmapToolbar({ 
  onEditNode, 
  isNodeSelected ,
}: RoadmapToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      {/*for future works */}

      {/* <button
        onClick={onAddNode}
        className="p-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Node</span>
      </button> */}

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

      {/* for future works */}

      {/* <button
        onClick={onDeleteNode}
        disabled={!isNodeSelected}
        className={cn(
          "p-2 rounded-lg transition-colors flex items-center gap-2",
          isNodeSelected 
            ? "bg-red-500 text-white hover:opacity-90" 
            : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        )}
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button> */}
    </div>
  );
}