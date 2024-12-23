import { NodeProps, Handle, Position } from "reactflow";
import { cn } from "../utils/cn";
import { useParams } from "react-router-dom";
import "reactflow/dist/style.css";
import { useAuthStore } from "../store/authStore";

interface NodeData {
  label: string;
  type: "topic" | "subtopic";
  description: string;
  marketDemand: string;
  averageSalary: string;
  requiredSkills: string[];
  isUnlocked: boolean;
  requiredNodes?: string[];
  onShowDetails: (data: any) => void;
  t: (key: string) => string;
}

export function CustomNode({ data, id }: NodeProps<NodeData>) {
  const { user, updateProgress } = useAuthStore();
  const { id: roadmapId } = useParams();
  const isCompleted = user?.progress[roadmapId || ""]?.includes(id);
  const isFirstNode = id === "1";
  const shouldBeActive = isCompleted || isFirstNode || data.isUnlocked;

  // Determine which handles to show based on node type
  const showHandles = {
    top: data.type === "topic",
    bottom: data.type === "topic",
    left: data.type === "subtopic" || data.type === "topic",
    right: data.type === "subtopic" || data.type === "topic",
  };

  return (
    <div
      className={cn(
        "px-4 py-2 shadow-lg rounded-lg border-2",
        "transition-all duration-300",
        shouldBeActive
          ? "border-white/10 bg-theme"
          : "border-slate-700/50 bg-slate-800/50 cursor-not-allowed",
        data.type === "subtopic" && "bg-opacity-80"
      )}
    >
      {/* Top Handle */}
      {showHandles.top && (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className={cn(
            "transition-colors duration-300",
            shouldBeActive ? "!bg-white" : "!bg-slate-600"
          )}
        />
      )}

      {/* Bottom Handle */}
      {showHandles.bottom && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className={cn(
            "transition-colors duration-300",
            shouldBeActive ? "!bg-white" : "!bg-slate-600"
          )}
        />
      )}

      {/* Left Handle */}
      {showHandles.left && (
        <Handle
          type={data.type === "subtopic" ? "target" : "source"}
          position={Position.Left}
          id="left"
          className={cn(
            "transition-colors duration-300",
            shouldBeActive ? "!bg-white" : "!bg-slate-600"
          )}
        />
      )}

      {/* Right Handle */}
      {showHandles.right && (
        <Handle
          type={data.type === "subtopic" ? "target" : "source"}
          position={Position.Right}
          id="right"
          className={cn(
            "transition-colors duration-300",
            shouldBeActive ? "!bg-white" : "!bg-slate-600"
          )}
        />
      )}

      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "font-medium transition-colors duration-300",
            shouldBeActive ? "text-white" : "text-slate-400"
          )}
        >
          {data.label}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => data.onShowDetails(data)}
            className={cn(
              "px-2 py-1 text-xs rounded-md transition-colors",
              shouldBeActive
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-slate-700/50 text-slate-400"
            )}
          >
            {data.t("roadmap.viewDetails")}
          </button>
          {user && shouldBeActive && (
            <button
              onClick={() => updateProgress(roadmapId || "", id, !isCompleted)}
              className={cn(
                "px-2 py-1 text-xs rounded-md text-white transition-colors",
                isCompleted
                  ? "bg-green-500/20 hover:bg-green-500/30"
                  : "bg-white/10 hover:bg-white/20"
              )}
            >
              {isCompleted
                ? data.t("roadmap.completed")
                : data.t("roadmap.markComplete")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
