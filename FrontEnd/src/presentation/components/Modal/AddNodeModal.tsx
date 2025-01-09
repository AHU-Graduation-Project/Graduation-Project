import { useState } from 'react';
import { X } from 'lucide-react';

interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (nodeData: any) => void;
}

export default function AddNodeModal({ isOpen, onClose, onAdd }: AddNodeModalProps) {
  const [formData, setFormData] = useState({
    label: '',
    type: 'topic',
    description: '',
    marketDemand: '',
    averageSalary: '',
    requiredSkills: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      type: 'custom',
      position: { x: 400, y: 0 }, // Initial position, will be adjusted
      data: {
        ...formData,
        requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()),
        isAchieved: true,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Add New Node</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            >
              <option value="topic">Main Topic</option>
              <option value="subtopic">Subtopic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Market Demand</label>
            <input
              type="text"
              value={formData.marketDemand}
              onChange={(e) => setFormData(prev => ({ ...prev, marketDemand: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Average Salary</label>
            <input
              type="text"
              value={formData.averageSalary}
              onChange={(e) => setFormData(prev => ({ ...prev, averageSalary: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Required Skills (comma-separated)</label>
            <input
              type="text"
              value={formData.requiredSkills}
              onChange={(e) => setFormData(prev => ({ ...prev, requiredSkills: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
            >
              Add Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}