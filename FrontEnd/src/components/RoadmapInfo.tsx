import { X, Briefcase, TrendingUp, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface RoadmapInfoProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: any;
}

export default function RoadmapInfo({ isOpen, onClose, roadmap }: RoadmapInfoProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, selectRoadmap } = useAuthStore();
  const isSelected = user?.selectedRoadmaps.includes(roadmap?.id);
  const isRtl = document.documentElement.dir === 'rtl';

  if (!isOpen || !roadmap) return null;

  const handleAddToRoadmap = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    selectRoadmap(roadmap.id);
  };

  const marketStats = [
    {
      label: 'Market Growth',
      value: '+25%',
      description: 'Annual growth in job opportunities',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'Average Salary',
      value: '$95,000',
      description: 'Based on current market data',
      icon: Briefcase,
      color: 'text-blue-500',
    },
    {
      label: 'Time to Master',
      value: '6-12 months',
      description: 'With dedicated learning',
      icon: Target,
      color: 'text-purple-500',
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 h-full w-full md:w-96 bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-700 ease-in-out z-50",
        isOpen
          ? "translate-x-0"
          : isRtl
            ? "-translate-x-full"
            : "translate-x-full",
        isRtl ? "left-0" : "right-0"
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
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-slate-600 dark:text-slate-300">
              {roadmap.description}
            </p>
          </div>

          <div className="space-y-4">
            {marketStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg bg-slate-100 dark:bg-slate-800", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-medium">{stat.label}</h3>
                      <span className="text-lg font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isSelected && (
            <button
              onClick={handleAddToRoadmap}
              className="w-full px-4 py-2 rounded-lg bg-theme text-white hover:bg-blue-600 transition-colors"
            >
              Add to My Roadmaps
            </button>
          )}
        </div>
      </div>
    </div>
  );
}