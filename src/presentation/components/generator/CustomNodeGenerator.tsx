import { NodeProps, Handle, Position, NodeToolbar } from "reactflow";
import { cn } from "../../../infrastructure/utils/cn";
import { MoreHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "reactflow/dist/style.css";

interface NodeData {
  label: string;
  type: "topic" | "subtopic";
  description: string;
  isAchieved: boolean;
  prerequisites?: string[];
  onShowDetails: (data: any) => void;
  isAnalysisNeeded: boolean;
  shouldBeActive?: boolean;
  isSkill?: boolean;
}

export function CustomNodeGenerator({ data }: NodeProps<NodeData>) {
  const [showToolbar, setShowToolbar] = useState(false);
  const toolbarContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const toolbarClicked = toolbarContainerRef.current?.contains(
      event.target as Node
    );
    const buttonClicked = buttonRef.current?.contains(event.target as Node);

    if (!toolbarClicked && !buttonClicked) {
      setTimeout(() => setShowToolbar(false), 0);
    }
  };

  useEffect(() => {
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

    if (action === "details") {
      data.onShowDetails(data);
    }
  };

  const truncateLabel = (label: string) => {
    return label.length > 15 ? `${label.substring(0, 15)}...` : label;
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
          "px-6 py-3 text-center border-2 shadow-lg rounded-xl relative hover:scale-105 transition-transform",
          "min-w-[200px]",
          data.type === "topic"
            ? "rounded-2xl font-bold tracking-wide shadow-xl border-theme"
            : "text-sm font-medium tracking-normal shadow-md scale-90 border-dashed border-theme",
          data.type === "topic" ? "bg-theme" : "bg-theme-shadow",
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
                ? "text-white"
                : "text-theme/90 dark:text-white/90"
            )}
          >
            {truncateLabel(data.label)}
          </h3>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          id="left-target"
          className="border-none bg-transparent"
        />
        <Handle
          type="source"
          position={Position.Left}
          id="left-source"
          className="border-none bg-transparent"
        />
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          className="border-none bg-transparent"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right-source"
          className="border-none bg-transparent"
        />
        <Handle
          type="target"
          position={Position.Top}
          id="top-target"
          className="border-none bg-transparent"
        />
        <Handle
          type="source"
          position={Position.Top}
          id="top-source"
          className="border-none bg-transparent"
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom-target"
          className="border-none bg-transparent"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom-source"
          className="border-none bg-transparent"
        />
      </div>
    </>
  );
}
