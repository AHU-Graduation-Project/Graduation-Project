import { X } from "lucide-react";
import { BookOpen } from "lucide-react";
interface NodeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
}

export default function GeneratorNodeDetail({
  isOpen,
  onClose,
  node,
}: NodeDetailProps) {
  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Node Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-theme text-transparent bg-clip-text">
            {node.label}
          </h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">{"Description"}</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {node.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
