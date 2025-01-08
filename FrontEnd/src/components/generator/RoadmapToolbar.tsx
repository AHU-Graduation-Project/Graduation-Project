import { Edit, Info, Save, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "../../utils/cn";

interface RoadmapToolbarProps {
  onEditNode: () => void;
  onShowDetails: () => void;
  isNodeSelected: boolean;
  setShowSaveModal: (value: boolean) => void;
}

export default function RoadmapToolbar({
  onEditNode,
  onShowDetails,
  isNodeSelected,
  setShowSaveModal,
}: RoadmapToolbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Old Toolbar (Mobile) */}
      <div className="absolute top-4 left-4 z-10 gap-2 hidden lg:flex">
        <button
          onClick={() => setShowSaveModal(true)}
          className="px-6 py-3 rounded-lg bg-theme text-white hover:opacity-90 transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Roadmap</span>
        </button>

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

      {/* Current Toolbar (Desktop) */}
      <div className="absolute top-4 left-4 z-10 flex flex-col items-center gap-3 lg:hidden">
        {/* Main Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-4 rounded-full bg-theme text-white hover:opacity-90 transition-all shadow-lg"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Collapsible Circular Buttons */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Save Button */}
              <button
                onClick={() => setShowSaveModal(true)}
                className="p-4 rounded-full bg-theme text-white hover:scale-110 transition-all shadow-lg"
              >
                <Save className="w-5 h-5" />
              </button>

              {/* Edit Button */}
              <button
                onClick={onEditNode}
                disabled={!isNodeSelected}
                className={cn(
                  "p-4 rounded-full transition-all shadow-lg",
                  isNodeSelected
                    ? "bg-theme text-white hover:scale-110"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                )}
              >
                <Edit className="w-5 h-5" />
              </button>

              {/* Info Button */}
              <button
                onClick={onShowDetails}
                disabled={!isNodeSelected}
                className={cn(
                  "p-4 rounded-full transition-all shadow-lg",
                  isNodeSelected
                    ? "bg-theme text-white hover:scale-110"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                )}
              >
                <Info className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
