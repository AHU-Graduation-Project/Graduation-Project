import { useState, useRef, useEffect } from 'react';
import { IconType, IconComponents } from '../../../domain/enums/IconType';
import { useNavigate } from 'react-router-dom';
import Markdown from '../UI/Markdown';
import ThemeIcon from '../UI/ThemeIcon';
import { checkSlug } from '../../../infrastructure/api/checkSlug';
import Spinner from '../UI/Spinner';
import { EditRoadmap } from '../../../infrastructure/api/editRoadmap';

interface RoadmapData {
  id: string;
  title: string;
  route: string;
  description: string;
  icon: string;
  visibility: string;
  is_official: boolean;
  created_at: string;
  updated_at: string;
  creator: number;
}

interface EditRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: RoadmapData) => void;
  roadmapData: RoadmapData;
}

const EditRoadmapModal = ({
  isOpen,
  onClose,
  roadmapData,
}: EditRoadmapModalProps) => {
  console.log(roadmapData);
  const [title, setTitle] = useState(roadmapData.title);
  const [route, setRoute] = useState(roadmapData.slug);
  const [description, setDescription] = useState(roadmapData.description);
  const [selectedIcon, setSelectedIcon] = useState<IconType>(roadmapData.icon);
  const [routeError, setRouteError] = useState('');
  const [isRouteAvailable, setIsRouteAvailable] = useState(false);
  const [isCheckingRoute, setIsCheckingRoute] = useState(false);
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const editRoadmap = EditRoadmap();

  const icons = Object.entries(IconComponents);
  const baseUrl = 'http://devpath/#/roadmaps/';

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!route) {
      setRouteError('');
      setIsCheckingRoute(false);
      return;
    }

    setIsCheckingRoute(true);
    setIsRouteAvailable(false);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await checkSlug(route);
        if (response.success) {
          setIsRouteAvailable(true);

          setRouteError('');
        } else {
          setRouteError(response.message);
          setIsRouteAvailable(false);
        }
      } catch (error) {
        setRouteError('Error checking route availability');
        setIsRouteAvailable(false);
      } finally {
        setIsCheckingRoute(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [route]);

  // Set default icon when component mounts
  useEffect(() => {
    if (isOpen && !selectedIcon) {
      setSelectedIcon(IconType.EDIT);
      setSelectedIconIndex(0);
    }
  }, [isOpen]);

  const handleIconSelect = (iconType: IconType, index: number) => {
    setSelectedIcon(iconType);
    setSelectedIconIndex(index);
  };

  if (!isOpen) return null;

  const handleEdit = async () => {
    if (!title || !route || !selectedIcon) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await editRoadmap.execute(roadmapData.id, {
        title,
        description,
        slug: route,
        icon: selectedIcon,
        is_official: roadmapData.is_official,
        visibility: roadmapData.visibility as 'public' | 'private' | 'hidden'
      });

  

      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to edit roadmap'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-theme dark:text-white">
          Edit Roadmap
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            className="mt-1 border block p-1 w-full rounded-md bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Route
          </label>
          <div
            className={`flex p-1 border items-center rounded-md bg-transparent  dark:bg-slate-800  dark:text-white shadow-sm  ${
              isRouteAvailable
                ? 'border-green-500'
                : 'border-gray-300 dark:border-gray-600'
            } `}
          >
            <span className="text-gray-700 dark:text-gray-400 text-sm">
              {baseUrl}
            </span>
            <input
              type="text"
              className="p-1 flex-1 text-sm block bg-transparent  text-gray-700 dark:text-gray-200 focus:outline-none"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>
          {isCheckingRoute && (
            <p className="mt-1 text-sm text-gray-500">
              Checking route availability...
            </p>
          )}
          {routeError && (
            <div className="mt-2 p-3 rounded-md bg-red-50 text-red-900 border border-red-200">
              {routeError}
            </div>
          )}
        </div>

        <div className="mb-4 ">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <Markdown description={description} setDescription={setDescription} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon
          </label>
          <div className="flex space-x-2">
            {icons.map(([iconType, IconComponent], index) => (
              <button
                key={iconType}
                onClick={() => handleIconSelect(iconType as IconType, index)}
                className={`p-2 border rounded-md shadow-sm transition-all duration-200 
                  ${
                    selectedIconIndex === index
                      ? 'border-theme  scale-110'
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

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-900 border border-red-200">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-theme text-white hover:bg-theme disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            onClick={handleEdit}
            disabled={
              !title ||
              !route ||
              !description ||
              !selectedIcon ||
              !!routeError ||
              isCheckingRoute ||
              isLoading
            }
          >
            {isLoading ? (
              <>
                <Spinner className="text-white" />
                <span>Updating...</span>
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoadmapModal;
