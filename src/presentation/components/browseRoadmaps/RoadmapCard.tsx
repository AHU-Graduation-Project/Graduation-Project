import { IconComponents, IconType } from "../../../domain/enums/IconType";
import { Link } from "react-router-dom";
import ThemeIcon from "../UI/ThemeIcon";
import { useThemeStore } from "../../../store/themeStore";
import { cn } from "../../../infrastructure/utils/cn";
import AnimationWrapper from "../UI/Animation/Animation";

const stripMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/#{1,6}\s/g, '')       // Remove headers
    .replace(/`{1,3}.*?`{1,3}/g, '') // Remove code blocks
    .replace(/\n/g, ' ')            // Replace newlines with spaces
    .trim();
};

interface RoadmapCardProps {
  id: string;
  title: string;
  slug:string,
  description: string;
  icon: IconType;
}

export default function RoadmapCard({
  id,
  slug,
  title,
  description,
  icon,
}: RoadmapCardProps) {
  const { currentTheme } = useThemeStore();
  const IconComponent = IconComponents[icon];

  return (
    <AnimationWrapper
      animationType={1}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800 hover:shadow-xl transition-all duration-300",
        "h-[200px] w-full" // Changed height from 200px to 160px
      )}
    >
      <Link to={`/roadmap/${slug}`} className="block w-full h-full">
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{
            backgroundImage: `linear-gradient(to right, ${currentTheme.colors.from}, ${currentTheme.colors.to})`,
          }}
        />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={cn(
                "p-3 rounded-lg transition-all duration-300",
                "bg-slate-100 dark:bg-slate-700",
                "group-hover:scale-110"
              )}
            >
              <ThemeIcon icon={IconComponent} className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold group-hover:text-theme transition-colors duration-300">
              {title}
            </h3>
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 truncate overflow-hidden text-ellipsis">
            {stripMarkdown(description)}
          </p>

          <div className="flex items-center text-sm font-medium">
            <span className="text-theme">Learn more</span>
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </AnimationWrapper>
  );
}
