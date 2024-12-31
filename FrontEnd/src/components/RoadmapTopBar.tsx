import { useState, useEffect, useCallback } from 'react';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';

interface RoadmapTopBarProps {
  roadmap: {
    id: string;
    title: string;
    description: string;
  };
  progress: number;
  completedNodes: number;
  totalNodes: number;
}
import { cn } from '../utils/cn';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import html2canvas from 'html2canvas';
import ThemeIcon from './ThemeIcon';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1E40AF',
  },
  flowImage: {
    width: '100%',
    height: 500,
    marginTop: 20,
  },
  legend: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
  },
  legendTitle: {
    fontSize: 12,
    marginBottom: 5,
    color: '#475569',
  },
});

const RoadmapPDF = ({ roadmap, flowImage }: { roadmap: any; flowImage: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{roadmap.title} Learning Path</Text>
      {flowImage && <Image src={flowImage} style={styles.flowImage} />}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Learning Path Legend</Text>
        <Text>• Completed nodes are marked in green</Text>
        <Text>• Locked nodes are grayed out</Text>
        <Text>• Active nodes show the full gradient</Text>
      </View>
    </Page>
  </Document>
);


export default function RoadmapTopBar({ 
  roadmap, 
  progress, 
  completedNodes, 
  totalNodes,
}: RoadmapTopBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [flowImage, setFlowImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, selectRoadmap } = useAuthStore();
  const isSelected = user?.selectedRoadmaps.includes(roadmap?.id);

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
      } catch (error) {
        console.error('Error capturing flow:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleAddToRoadmap = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    selectRoadmap(roadmap.id);
  };

  if (!roadmap) return null;

  return (
    <div className={cn(
      "fixed top-20 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-transform duration-300",
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-theme text-transparent bg-clip-text mb-2">
              {roadmap.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              {roadmap.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isSelected && (
              <button
                onClick={handleAddToRoadmap}
                className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors text-sm md:text-base"
              >
                Add to My Roadmaps
              </button>
            )}
            <PDFDownloadLink
              document={<RoadmapPDF roadmap={roadmap} flowImage={flowImage!} />}
              fileName={`${roadmap.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.pdf`}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 text-sm md:text-base",
                "bg-theme text-white hover:opacity-90 transition-colors"
              )}
            >
              {({ loading }) => (
                <button
                  onClick={captureFlow}
                  disabled={loading}
                  className="flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">
                    {loading ? 'Preparing PDF...' : 'Download PDF'}
                  </span>
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-400">Overall Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-theme transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm md:text-base">
            <div className="px-3 py-1.5 rounded-lg bg-theme/10 text-theme">
              <span className="font-bold">{completedNodes}</span>
              <span className="ml-1">completed</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-theme/10 text-theme">
              <span className="font-bold">{totalNodes}</span>
              <span className="ml-1">total</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-white dark:bg-slate-800 p-1 rounded-b-lg border border-t-0 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {isVisible ? (
            <ThemeIcon icon={ChevronUp} className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5 " />
          )}
        </button>
      </div>
    </div>
  );
}