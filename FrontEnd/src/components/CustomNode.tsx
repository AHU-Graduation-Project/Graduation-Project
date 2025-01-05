import { NodeProps, Handle, Position, NodeToolbar } from "reactflow";
import { cn } from "../utils/cn";
import { useParams } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "reactflow/dist/style.css";
import { useAuthStore } from "../store/authStore";

interface NodeData {
  label: string;
  type: "topic" | "subtopic";
  description: string;
  marketDemand: string;
  averageSalary: string;
  requiredSkills: string[];
  isAchieved: boolean;
  requiredNodes?: string[];
  onShowDetails: (data: any) => void;
  jobs?: number;
}

export function CustomNode({ data, id }: NodeProps<NodeData>) {
  const { user, updateProgress } = useAuthStore();
  const { id: roadmapId } = useParams();
  const isCompleted = user?.progress[roadmapId || ""]?.includes(id);
  const isFirstNode = id === "1";
  const shouldBeActive = isCompleted || isFirstNode || data.isAchieved;
  const [showToolbar, setShowToolbar] = useState(false);
  const toolbarContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

 useEffect(() => {
   const handleClickOutside = (event: MouseEvent | TouchEvent) => {
     const toolbarClicked = toolbarContainerRef.current?.contains(
       event.target as Node
     );
     const buttonClicked = buttonRef.current?.contains(event.target as Node);

     // Close only if the click is outside both the toolbar and button
     if (!toolbarClicked && !buttonClicked) {
       setTimeout(() => setShowToolbar(false), 0); // Delay to let click events on dropdown propagate
     }
   };

   document.addEventListener("mousedown", handleClickOutside);
   document.addEventListener("touchstart", handleClickOutside);

   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
     document.removeEventListener("touchstart", handleClickOutside);
   };
 }, []);


  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowToolbar(false);

    switch (action) {
      case "details":
        data.onShowDetails(data);
        break;
      case "complete":
        if (user && shouldBeActive) {
          updateProgress(roadmapId || "", id, !isCompleted);
        }
        break;
      case "jobs":
        window.open(
          `https://www.linkedin.com/jobs/search/?keywords=${data.label}`,
          "_blank"
        );
        break;
      case "courses":
        
  // data.onShowDetails(data);
  // setShowCourses(true);
    break;

        
    }
  };

  const handleNodeClick = () => {
    if (shouldBeActive) {
      data.onShowDetails(data);
    }
  };

  const showHandles = {
    top: data.type === "topic",
    bottom: data.type === "topic",
    left: data.type === "subtopic" || data.type === "topic",
    right: data.type === "subtopic" || data.type === "topic",
  };

  return (
    <>
      <div ref={toolbarContainerRef}>
        <NodeToolbar
          isVisible={showToolbar}
          position="bottom"
          align="end"
          className="bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700 p-2 fixed top-[-40px]"
        >
          <div className="flex flex-col min-w-[160px]">
            <button
              onClick={(e) => handleAction("details", e)}
              className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors text-sm rounded-lg"
            >
              View Details
            </button>
            {user && shouldBeActive && (
              <button
                onClick={(e) => handleAction("complete", e)}
                className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors text-sm rounded-lg"
              >
                {isCompleted ? "Mark Incomplete" : "Mark Complete"}
              </button>
            )}
            <button
              onClick={(e) => handleAction("jobs", e)}
              className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors text-sm rounded-lg"
            >
              View Jobs ({data.jobs || 0})
            </button>
            <button
              onClick={(e) => handleAction("courses", e)}
              className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors text-sm rounded-lg"
            >
              View Courses
            </button>
          </div>
        </NodeToolbar>
      </div>

      <div
        onClick={handleNodeClick}
        className={cn(
          "px-6 py-3 shadow-lg rounded-xl border-2 relative hover:scale-105 transition-transform",
          "min-w-[200px]",
          data.type === "topic"
            ? "rounded-2xl text-lg font-bold tracking-wide shadow-xl border-theme"
            : " text-sm font-medium tracking-normal shadow-md scale-90 border-dashed",
          !shouldBeActive && "opacity-50 bg-slate-800/50",
          shouldBeActive &&
            (isCompleted
              ? data.type === "topic"
                ? "bg-theme  "
                : "bg-transparent bg-theme-shadow bg-theme-blur "
              : data.type === "topic"
              ? "bg-theme-shadow"
              : ""),
          !shouldBeActive && "cursor-not-allowed"
        )}
      >
        {data.jobs && (
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-theme flex items-center justify-center text-white text-xs font-medium shadow-lg">
            {data.jobs}
          </div>
        )}

        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowToolbar(!showToolbar);
          }}
          className="absolute -top-3 -right-3 p-1.5 rounded-full bg-theme text-white hover:opacity-90 transition-colors shadow-lg z-10"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        <div className="text-center mt-1">
          <h3
            className={cn(
              "font-medium transition-colors",
              data.type === "topic" ? "text-lg" : "text-lg",
              shouldBeActive
                ? isCompleted
                  ? "text-white"
                  : data.type === "topic"
                  ? "text-theme dark:text-white"
                  : "text-theme/90 dark:text-white/90"
                : "text-slate-400"
            )}
          >
            {data.label}
          </h3>
        </div>

        {showHandles.top && (
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="border-none bg-transparent"
          />
        )}
        {showHandles.bottom && (
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="border-none bg-transparent"
          />
        )}
        {showHandles.left && (
          <Handle
            type={data.type === "subtopic" ? "target" : "source"}
            position={Position.Left}
            id="left"
            className="border-none bg-transparent"
          />
        )}
        {showHandles.right && (
          <Handle
            type={data.type === "subtopic" ? "target" : "source"}
            position={Position.Right}
            id="right"
            className="border-none bg-transparent"
          />
        )}
      </div>
    </>
  );
}