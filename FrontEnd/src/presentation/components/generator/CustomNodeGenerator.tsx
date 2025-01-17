import { NodeProps, Handle, Position, NodeToolbar } from "reactflow";
import { cn } from "../../../infrastructure/utils/cn";
import { MoreHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "reactflow/dist/style.css";


interface NodeData {
  label: string;
  type: "topic" | "subtopic";
  description: string;
  marketDemand: string;
  averageSalary: string;
  requiredSkills: string[];
  isAchieved: boolean;
  prerequisites?: string[];
  onShowDetails: (data: any) => void;
  jobs?: number;
  isSelected?: boolean;
}

export function CustomNodeGenerator({ data}: NodeProps<NodeData>) {
  const [showToolbar, setShowToolbar] = useState(false);
  const toolbarContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const toolbarClicked = toolbarContainerRef.current?.contains(
        event.target as Node
      );
      const buttonClicked = buttonRef.current?.contains(event.target as Node);

      if (!toolbarClicked && !buttonClicked) {
        setTimeout(() => setShowToolbar(false), 0);
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
    e.preventDefault();
    e.stopPropagation();
    setShowToolbar(false);

    if (action === "details") {
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
          </div>
        </NodeToolbar>
      </div>

      <div
        className={cn(
          "px-6 py-3 shadow-lg rounded-xl border-2 relative hover:scale-105 transition-transform bg-theme",
          "min-w-[200px]",
          data.type === "topic"
            ? "rounded-2xl text-lg font-bold tracking-wide shadow-xl"
            : "rounded-md text-sm font-medium tracking-normal shadow-md",
          data.isSelected &&
            "ring-2 ring-theme ring-offset-2 dark:ring-offset-slate-900",
          data.type === "topic" ? "" : ""
        )}
      >
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
              data.type === "topic"
                ? " dark:text-white"
                : "text-theme/90 dark:text-white/90"
            )}
          >
            {data.label.length > 10
              ? `${data.label.slice(0, 10)}...`
              : data.label}
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
