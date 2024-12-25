import { NodeProps, Handle, Position } from "reactflow";
import { cn } from "../utils/cn";
import "reactflow/dist/style.css";

interface NodeData {
  label: string;
  type: "topic" | "subtopic";
  description: string;
  marketDemand: string;
  averageSalary: string;
  requiredSkills: string[];
  onShowDetails: (data: any) => void;
  t: (key: string) => string;
}

export function CustomNodeGenerator({ data, id }: NodeProps<NodeData>) {
  const isFirstNode = id === "1";
  const shouldBeActive = true;

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
          : "border-slate-700/50 bg-slate-800/50",
        data.type === "subtopic" && "bg-opacity-80"
      )}
    >
      {/* Top Handle */}
      {showHandles.top && (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className="!bg-white"
        />
      )}

      {/* Bottom Handle */}
      {showHandles.bottom && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className="!bg-white"
        />
      )}

      {/* Left Handle */}
      {showHandles.left && (
        <Handle
          type={data.type === "subtopic" ? "target" : "source"}
          position={Position.Left}
          id="left"
          className="!bg-white"
        />
      )}

      {/* Right Handle */}
      {showHandles.right && (
        <Handle
          type={data.type === "subtopic" ? "target" : "source"}
          position={Position.Right}
          id="right"
          className="!bg-white"
        />
      )}

      <div className="flex flex-col items-center gap-2">
        <div className="font-medium text-white">
          {data.label}
        </div>
        <button
          onClick={() => data.onShowDetails(data)}
          className="px-2 py-1 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          {data.t("roadmap.viewDetails")}
        </button>
      </div>
    </div>
  );
}