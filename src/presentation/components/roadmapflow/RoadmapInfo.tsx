import { X, Loader } from 'lucide-react';
import { cn } from '../../../infrastructure/utils/cn';
import { useAuthStore } from '../../../application/state/authStore';
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { IconComponents } from '../../../domain/enums/IconType';
import ThemeIcon from '../UI/ThemeIcon';
import useTokenStore from '../../../application/state/tokenStore';
import { FollowRoadmap } from '../../../infrastructure/api/FollowRoadmap';
import { useState } from 'react';

interface RoadmapInfoProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: any;
  onFollowChange: (isFollowed: boolean) => void;
}

export default function RoadmapInfo({
  isOpen,
  onClose,
  roadmap,
  onFollowChange,
}: RoadmapInfoProps) {
  const { userRole } = useTokenStore();
  const navigate = useNavigate();
  const { selectRoadmap } = useAuthStore();
  const followRoadmap = FollowRoadmap();
  const [loading, setLoading] = useState(false);
  const isRtl = document.documentElement.dir === 'rtl';

  if (!isOpen || !roadmap) return null;

  const handleAddToRoadmap = async () => {
    setLoading(true);
    if (!userRole()) {
      navigate('/auth');
      setLoading(false);
      return;
    }
    try {
      await followRoadmap.execute(roadmap.slug);
      onFollowChange(true);
      selectRoadmap(roadmap.id);
      onClose(); // Optional: close the info panel after adding
    } catch (error) {
      console.error('Failed to follow roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-y-0 h-full w-full overflow-auto md:w-96 bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-700 ease-in-out z-50',
        isOpen
          ? 'translate-x-0'
          : isRtl
          ? '-translate-x-full'
          : 'translate-x-full',
        isRtl ? 'left-0' : 'right-0',
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-theme text-transparent bg-clip-text">
            {roadmap.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close roadmap info"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <ReactMarkdown>{roadmap.description}</ReactMarkdown>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme">
              Learning Resources
            </h3>
            {roadmap.resources && roadmap.resources.length > 0 ? (
              roadmap.resources.map((resource: any, index: number) => {
                const Icon = IconComponents[resource.icon];
                return (
                  <a
                    key={index}
                    href={
                      resource.link.startsWith('http')
                        ? resource.link
                        : `https://${resource.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <ThemeIcon icon={Icon} />
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {resource.link.length > 30
                            ? `${resource.link.slice(0, 30)}...`
                            : resource.link}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                No resources available
              </p>
            )}
          </div>

          {/* Only show button if roadmap is not already followed */}
          {!roadmap.isFollowed && (
            <button
              onClick={handleAddToRoadmap}
              className="w-full px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" />
                  <span>Adding...</span>
                </div>
              ) : (
                'Add to My Roadmaps'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
