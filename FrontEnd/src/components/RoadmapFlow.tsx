import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { roadmaps } from '../data/roadmaps';
import { useAuthStore } from '../store/authStore';
import NodeDetailsModal from './NodeDetailsModal';
import RoadmapInfo from './RoadmapInfo';
import ChatPanel from './ChatPanel';
import RoadmapTopBar from './RoadmapTopBar';
import { cn } from '../utils/cn';
import { AlertCircle, MessageCircle } from 'lucide-react';
import { useRoadmapNodes } from '../hooks/useRoadmapNodes';

const CustomNode = ({ data, id }: NodeProps) => {
  const { user, updateProgress } = useAuthStore();
  const { id: roadmapId } = useParams();
  const isCompleted = user?.progress[roadmapId || '']?.includes(id);
  const shouldBeActive = isCompleted || data.isUnlocked;

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
        <div className={cn(
          "font-medium transition-colors duration-300",
          shouldBeActive ? "text-white" : "text-slate-400"
        )}>
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
            {data.t('roadmap.viewDetails')}
          </button>
          {user && shouldBeActive && (
            <button
              onClick={() => updateProgress(roadmapId || '', id, !isCompleted)}
              className={cn(
                "px-2 py-1 text-xs rounded-md text-white transition-colors",
                isCompleted ? "bg-green-500/20 hover:bg-green-500/30" : "bg-white/10 hover:bg-white/20"
              )}
            >
              {isCompleted ? data.t('roadmap.completed') : data.t('roadmap.markComplete')}
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

export default function RoadmapFlow() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { t } = useTranslation();

  // Get roadmap data from either built-in roadmaps or custom roadmaps
  const builtInRoadmap = roadmaps.find(r => r.id === id);
  const customRoadmap = user?.customRoadmaps[id || ''];
  
  const roadmap = builtInRoadmap || {
    id,
    title: customRoadmap?.title || '',
    description: customRoadmap?.description || '',
    icon: AlertCircle // Default icon for custom roadmaps
  };

  // Use either custom nodes/edges or built-in ones
  const initialNodes = customRoadmap?.nodes || [];
  const initialEdges = customRoadmap?.edges || [];
  const completedNodeIds = user?.progress[id || ''] || [];
  
  // Use the custom hook to process nodes and determine which should be unlocked
  const nodes = useRoadmapNodes(initialNodes, initialEdges, completedNodeIds).map(node => ({
    ...node,
    data: {
      ...node.data,
      onShowDetails: (nodeData: any) => setSelectedNode(nodeData),
      t,
    },
  }));

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const completedNodes = completedNodeIds.length;
  const totalNodes = nodes.length;
  const progress = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

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
        userProgress={completedNodeIds}
      />
    </div>
  );
}