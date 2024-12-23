import { X, TrendingUp, DollarSign, BookOpen, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

interface NodeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
}

export default function NodeDetailsModal({ isOpen, onClose, node }: NodeDetailsModalProps) {
  const { t } = useTranslation();
  
  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
        <div className="absolute -top-2 -right-2">
          <button
            onClick={onClose}
            className="p-2 bg-slate-800 dark:bg-slate-700 rounded-full text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            {node.label}
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">{t('roadmap.details.description')}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{node.description}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">{t('roadmap.details.marketDemand')}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{node.marketDemand}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-emerald-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">{t('roadmap.details.salary')}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{node.averageSalary}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">{t('roadmap.details.skills')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {node.requiredSkills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}