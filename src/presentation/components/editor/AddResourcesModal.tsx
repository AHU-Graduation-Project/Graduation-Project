import { useState } from 'react';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { UpdateResources } from '../../../infrastructure/api/updateResources';
import { cn } from '../../../infrastructure/utils/cn';
import ThemeIcon from '../UI/ThemeIcon';
import { IconType, IconComponents } from '../../../domain/enums/IconType';
import { Link } from 'react-router-dom';

interface Resource {
  title: string;
  icon: IconType;
  link: string;
}

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resources: Resource[]) => void;
  initialResources?: Resource[];
  roadmapId: number;  // Add this line
}

// Update the link validation function
const isValidlink = (link: string) => {
  try {
    new URL(link);
    return true;
  } catch {
    return false;
  }
};

// Add this helper function before the component
const sliceLink = (link: string) => {
  return link.length > 20 ? `${link.slice(0, 20)}...` : link;
};

export default function AddResourceModal({
  isOpen,
  onClose,
  onSave,
  initialResources = [],
  roadmapId,  // Add this line
}: AddResourceModalProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [newResource, setNewResource] = useState<Resource>({
    title: '',
    icon: IconType.BOOK,
    link: '',
  });
  const [linkError, setlinkError] = useState<string>('');
  const [selectedIconIndex, setSelectedIconIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const updateResourcesApi = UpdateResources();

  if (!isOpen) return null;

  const handleIconSelect = (iconType: IconType, index: number) => {
    setNewResource({ ...newResource, icon: iconType });
    setSelectedIconIndex(index);
  };

  const validatelink = (link: string) => {
    if (!link) {
      setlinkError('link is required');
      return false;
    }
    if (!isValidlink(link)) {
      setlinkError('Please enter a valid link');
      return false;
    }
    return true;
  };

  const handleAddResource = () => {
    if (!validatelink(newResource.link)) {
      return;
    }
    
    if (newResource.title && newResource.link) {
      setResources([...resources, newResource]);
      setNewResource({ title: '', icon: IconType.BOOK, link: '' });
      setlinkError('');
    }
  };

  const handleRemoveResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateResourcesApi.execute(resources, roadmapId);
      onSave(resources);
      onClose();
    } catch (error) { 
      console.error('Failed to save resources:', error);
      // You might want to add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">Manage Resources</h2>
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Add New Resource Form */}
          <div className="grid grid-cols-1 gap-4 mb-6">
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
              <div className="flex space-x-2">
                {Object.entries(IconComponents)
                  .filter(([key]) => [
                    IconType.BOOK,
                    IconType.VIDEO,
                    IconType.LINK,
                    IconType.YOUTUBE,
                    IconType.COURSE,
                    IconType.ARTICLE,
                    IconType.GITHUB
                  ].includes(key as IconType))
                  .map(([iconType, IconComponent], index) => (
                    <button
                      key={iconType}
                      onClick={() => handleIconSelect(iconType as IconType, index)}
                      className={`p-2 border rounded-md shadow-sm transition-all duration-200 
                        ${
                          selectedIconIndex === index
                            ? 'border-theme scale-110'
                            : 'border-gray-300 dark:border-gray-600 hover:border-theme hover:scale-105'
                        }`}
                    >
                      {selectedIconIndex === index ? (
                        <ThemeIcon icon={IconComponent} />
                      ) : (
                        <IconComponent
                          className={`w-6 h-6 ${'text-gray-700 dark:text-gray-400'}`}
                        />
                      )}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">link</label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="link"
                    value={newResource.link}
                    onChange={(e) => {
                      setNewResource({ ...newResource, link: e.target.value });
                      validatelink(e.target.value);
                    }}
                    onBlur={(e) => validatelink(e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border",
                      (linkError || !newResource.link)
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                        : "border-slate-200 dark:border-slate-700"
                    )}
                    placeholder="https://example.com"
                  />
                  <button
                    aria-label="Add resource"
                    onClick={handleAddResource}
                    disabled={!newResource.title || !newResource.link}
                    className={cn(
                      'px-4 rounded-lg transition-colors flex items-center gap-2',
                      newResource.title && newResource.link
                        ? 'bg-theme text-white hover:opacity-90'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed',
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {linkError && (
                  <span className="text-sm text-red-500">{linkError}</span>
                )}
              </div>
            </div>
          </div>
                
          {/* Resource List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {resources.map((resource, index) => {
              const Icon = IconComponents[resource.icon];
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 group hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <a href={resource.link} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <ThemeIcon icon={Icon} />
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {sliceLink(resource.link)}
                      </p>
                    </div>
                  </a>
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
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
