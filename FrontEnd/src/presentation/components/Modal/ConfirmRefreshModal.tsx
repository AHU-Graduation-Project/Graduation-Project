import { X } from 'lucide-react';

interface ConfirmRefreshModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onSaveAndRefresh: () => void;
}

export default function ConfirmRefreshModal({
  isOpen,
  onClose,
  onRefresh,
  onSaveAndRefresh,
}: ConfirmRefreshModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Unsaved Changes</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You have unsaved changes. What would you like to do?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onRefresh}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Refresh Anyway
            </button>
            <button
              onClick={onSaveAndRefresh}
              className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
            >
              Save & Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}