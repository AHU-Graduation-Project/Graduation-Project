import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface EditNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
  onSave: (nodeData: any) => void;
}

export default function EditNodeModal({
  isOpen,
  onClose,
  node,
  onSave,
}: EditNodeModalProps) {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    marketDemand: "",
    averageSalary: "",
    requiredSkills: "",
  });

  // Synchronize formData when the modal is opened or `node` changes
  useEffect(() => {
    if (isOpen && node) {
      setFormData({
        label: node?.data?.label || "",
        description: node?.data?.description || "",
        marketDemand: node?.data?.marketDemand || "",
        averageSalary: node?.data?.averageSalary || "",
        requiredSkills: node?.data?.requiredSkills?.join(", ") || "",
      });
    }
  }, [isOpen, node]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...node,
      data: {
        ...node.data,
        label: formData.label,
        description: formData.description,
        marketDemand: formData.marketDemand,
        averageSalary: formData.averageSalary,
        requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim()),
      },
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Edit Node</h2>
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
              onChange={(e) => handleChange("label", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              rows={3}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
