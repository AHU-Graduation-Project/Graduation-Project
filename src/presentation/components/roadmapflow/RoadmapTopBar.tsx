import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../../infrastructure/utils/cn';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../../application/state/authStore';
import html2canvas from 'html2canvas';
import ThemeIcon from '../UI/ThemeIcon';
import { Image as ImageIcon, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import useTokenStore from '../../../application/state/tokenStore';
import { FollowRoadmap } from '../../../infrastructure/api/FollowRoadmap';

interface RoadmapTopBarProps {
  setRoadmap: React.Dispatch<React.SetStateAction<any>>;
  roadmap: any;
  completedNodes: number;
  totalNodes: number;
  onFollowChange: (isFollowed: boolean) => void;
}

export default function RoadmapTopBar({
  setRoadmap,
  roadmap,
  completedNodes,
  totalNodes,
  onFollowChange,
}: RoadmapTopBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { selectRoadmap } = useAuthStore();
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [flowImage, setFlowImage] = useState<string | null>(null);
  const { userRole } = useTokenStore();
  const followRoadmap = FollowRoadmap();
  const [loading, setLoading] = useState(false);
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
    } catch (error) {
      console.error('Failed to follow roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const { slug } = useParams();

  const captureFlow = useCallback(async () => {
    const flowElement = document.querySelector('.react-flow');
    if (flowElement) {
      try {
        const canvas = await html2canvas(flowElement as HTMLElement, {
          backgroundColor: null,
          scale: 2,
        });

        const image = canvas.toDataURL('image/png');
        setFlowImage(image);

        const link = document.createElement('a');
        link.href = image;
        link.download = `${roadmap.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.png`;
        link.click();
      } catch (error) {
        console.error('Error capturing flow:', error);
      }
    }
  }, [roadmap.title]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!roadmap) return null;

  // Calculate progress here instead
  const progress = Math.round((completedNodes / totalNodes) * 100) || 0;

  return (
    <div
      className={cn(
        'fixed top-20 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-theme text-transparent bg-clip-text mb-2">
              {roadmap.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!roadmap.isFollowed && (
              <button
                onClick={handleAddToRoadmap}
                className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors text-sm md:text-base flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin mr-2" />
                ) : (
                  'Add to My Roadmaps'
                )}
              </button>
            )}
            <button
              onClick={captureFlow}
              className="px-4 py-2 rounded-lg bg-theme text-white flex items-center gap-2 hover:opacity-90 transition-colors text-sm md:text-base"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-400">
                Overall Progress
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-theme transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {roadmap.isEditable && (
            <div className="flex items-center gap-3 text-sm md:text-base">
              <button
                onClick={() => navigate(`/editor/${slug}`)}
                className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
              >
                edit roadmap
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-white dark:bg-slate-800 p-1 rounded-b-lg border border-t-0 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {isVisible ? (
            <ThemeIcon icon={ChevronUp} className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
