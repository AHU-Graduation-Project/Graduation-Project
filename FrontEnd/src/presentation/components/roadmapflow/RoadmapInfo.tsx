import { X, BookOpen, Video, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../infrastructure/utils/cn";
import { useAuthStore } from "../../../application/state/authStore";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";


interface RoadmapInfoProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: any;
}

export default function RoadmapInfo({
  isOpen,
  onClose,
  roadmap,
}: RoadmapInfoProps) {
  const navigate = useNavigate();
  const { user, selectRoadmap } = useAuthStore();
  const isSelected = user?.selectedRoadmaps.includes(roadmap?.id);
  const isRtl = document.documentElement.dir === "rtl";

  if (!isOpen || !roadmap) return null;


  const resources = [
    {
      label: "Documentation",
      description: "Official documentation and guides",
      icon: BookOpen,
      color: "text-blue-500",
      url: "https://developer.mozilla.org/",
    },
    {
      label: "Video Tutorials",
      description: "Curated video courses and tutorials",
      icon: Video,
      color: "text-green-500",
      url: "https://www.youtube.com/",
    },
    {
      label: "Online Resources",
      description: "Articles, blogs, and community resources",
      icon: Globe,
      color: "text-purple-500",
      url: "https://dev.to/",

    },
  ];

  const handleAddToRoadmap = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    selectRoadmap(roadmap.id);
  };

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
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <ReactMarkdown>{roadmap.description}</ReactMarkdown>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-theme">
              Learning Resources
            </h3>
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg bg-slate-100 dark:bg-slate-800",

                      resource.color
                    )}
                  >
                    <resource.icon className="w-5 h-5" />

                  </div>
                  <div>
                    <h4 className="font-medium">{resource.label}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {!isSelected && (
            <button
              onClick={handleAddToRoadmap}
              className="w-full px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
            >
              Add to My Roadmaps
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
