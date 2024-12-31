import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { roadmaps } from "../data/roadmaps";
import { useAuthStore } from "../store/authStore";
import NodeDetailsModal from "./NodeDetailsModal";
import RoadmapInfo from "./RoadmapInfo";
import ChatPanel from "./ChatPanel";
import RoadmapTopBar from "./RoadmapTopBar";
import { cn } from "../utils/cn";
import { AlertCircle, MessageCircle } from "lucide-react";

const CustomNode = ({ data, id }: NodeProps) => {
  const { user, updateProgress } = useAuthStore();
  const { id: roadmapId } = useParams();
  const isCompleted = user?.progress[roadmapId || ""]?.includes(id);
  const isFirstNode = id === "1";
  const shouldBeActive = isCompleted || isFirstNode || data.isUnlocked;

  const handleCompleteNode = () => {
    if (roadmapId) {
      updateProgress(roadmapId, id, !isCompleted); // Update progress

      // Check if all nodes in the roadmap are completed
      const completedNodes = user?.progress[roadmapId] || [];
      const allNodesCompleted = initialNodes.every((node) =>
        completedNodes.includes(node.id)
      );

      if (allNodesCompleted) {
        updateProgress(roadmapId, null, true); // Mark roadmap as completed
      }
    }
  };

  return (
    <div
      className={cn(
        "px-4 py-2 shadow-lg rounded-lg border-2",
        "transition-all duration-300",
        shouldBeActive
          ? "border-white/10 bg-theme"
          : "border-slate-700/50 bg-slate-800/50 cursor-not-allowed"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={cn(
          "transition-colors duration-300",
          shouldBeActive ? "!bg-white" : "!bg-slate-600"
        )}
      />
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
              onClick={handleCompleteNode}
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
      <Handle
        type="source"
        position={Position.Bottom}
        className={cn(
          "transition-colors duration-300",
          shouldBeActive ? "!bg-white" : "!bg-slate-600"
        )}
      />
    </div>
  );
};

export { CustomNode };

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 400, y: 100 },
    data: {
      label: "Start Your Journey",
      description:
        "Begin your development journey here. Learn the basics of programming and computer science.",
      marketDemand:
        "Entry-level positions are abundant with 25% growth expected.",
      averageSalary: "$65,000 - $85,000",
      requiredSkills: [
        "Problem Solving",
        "Logical Thinking",
        "Basic Mathematics",
      ],
      isUnlocked: true,
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 200 },
    data: {
      label: "Learn HTML & CSS",
      description:
        "Master the fundamentals of web development with HTML and CSS.",
      marketDemand:
        "High demand with 15% annual growth in web development roles.",
      averageSalary: "$70,000 - $90,000",
      requiredSkills: ["HTML5", "CSS3", "Responsive Design"],
      isUnlocked: false,
      requiredNodes: ["1"],
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 550, y: 200 },
    data: {
      label: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript programming.",
      marketDemand: "Very high demand with 30% growth in JavaScript roles.",
      averageSalary: "$80,000 - $120,000",
      requiredSkills: ["ES6+", "DOM Manipulation", "Async Programming"],
      isUnlocked: false,
      requiredNodes: ["1"],
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "CSS Frameworks",
      description: "Master modern CSS frameworks and design systems.",
      marketDemand: "Strong demand with focus on responsive design.",
      averageSalary: "$85,000 - $110,000",
      requiredSkills: ["Tailwind CSS", "Bootstrap", "Sass"],
      isUnlocked: false,
      requiredNodes: ["2"],
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4" },
];

export default function RoadmapFlow() {
  const { id } = useParams();
  const roadmap = roadmaps.find((r) => r.id === id);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  // Update node unlock status based on completed nodes
  const nodes = initialNodes.map((node) => {
    const nodeData = { ...node.data };
    const completedNodes = user?.progress[id || ""] || [];

    // Check if all required nodes are completed
    if (nodeData.requiredNodes) {
      nodeData.isUnlocked = nodeData.requiredNodes.every((requiredId) =>
        completedNodes.includes(requiredId)
      );
    }

    return {
      ...node,
      data: {
        ...nodeData,
        onShowDetails: (nodeData: any) => setSelectedNode(nodeData),
        t,
      },
    };
  });

  const completedNodes = user?.progress[id || ""]?.length || 0;
  const totalNodes = nodes.length;
  const progress = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className="relative h-screen pt-20">
      {/* Top Bar */}
      <RoadmapTopBar
        roadmap={roadmap}
        progress={progress}
        completedNodes={completedNodes}
        totalNodes={totalNodes}
        nodes={nodes}
        edges={initialEdges}
      />

      {/* Main Flow Area */}
      <div className="h-[calc(100vh-5rem)]">
        <ReactFlow
          nodes={nodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50 dark:bg-slate-900"
        >
          <Background className="bg-slate-50 dark:bg-slate-900" />
          <Controls className="!bg-white/10 !rounded-lg" />
        </ReactFlow>
      </div>

      {/* Interactive Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all",
            "bg-theme text-white",
            "hover:scale-110",
            showInfo && "ring-4 ring-purple-500/20"
          )}
        >
          <AlertCircle className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowChat(!showChat)}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all",
            "bg-theme text-white",
            "hover:scale-110",
            showChat && "ring-4 ring-purple-500/20"
          )}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Modals and Panels */}
      <NodeDetailsModal
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        node={selectedNode}
      />
      <RoadmapInfo
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        roadmap={roadmap}
      />
      <ChatPanel
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        roadmap={roadmap}
        userProgress={user?.progress[id || ""]}
      />
    </div>
  );
}
