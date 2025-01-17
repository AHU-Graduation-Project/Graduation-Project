import { useState } from 'react';
import { X, Plus, Trash2, BookOpen, Video, Globe } from 'lucide-react';
import { cn } from '../../../infrastructure/utils/cn';

const iconOptions = {
  Book: BookOpen,
  Video: Video,
  Link: Globe,
} as const;

type IconType = keyof typeof iconOptions;

interface Resource {
  title: string;
  icon: IconType;
  url: string;
}

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resources: Resource[]) => void;
  initialResources?: Resource[];
  
}

export default function AddResourceModal({
  isOpen,
  onClose,
  onSave,
  initialResources = [],
}: AddResourceModalProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [newResource, setNewResource] = useState<Resource>({
    title: '',
    icon: 'Book',
    url: '',
  });

  if (!isOpen) return null;

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      setResources([...resources, newResource]);
      setNewResource({ title: '', icon: 'Book', url: '' });
    }
  };

  const handleRemoveResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(resources);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Manage Resources</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Add New Resource Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource({ ...newResource, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                placeholder="Resource title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <select
                value={newResource.icon}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    icon: e.target.value as IconType,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                {Object.keys(iconOptions).map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) =>
                    setNewResource({ ...newResource, url: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  placeholder="https://example.com"
                />
                <button
                  onClick={handleAddResource}
                  disabled={!newResource.title || !newResource.url}
                  className={cn(
                    'px-4 rounded-lg transition-colors flex items-center gap-2',
                    newResource.title && newResource.url
                      ? 'bg-theme text-white hover:opacity-90'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed',
                  )}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Resource List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {resources.map((resource, index) => {
              const Icon = iconOptions[resource.icon];
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 group hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Icon className="w-5 h-5 text-theme" />
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {resource.url}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveResource(index)}
                    className="p-2 rounded-lg text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            {resources.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                No resources added yet
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
