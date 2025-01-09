import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

interface FlowAreaProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  nodeTypes: NodeTypes;
}

export default function FlowArea({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  nodeTypes,
}: FlowAreaProps) {
  return (
    <div className="h-[calc(100vh-5rem)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 20 }}
        className="bg-slate-50 dark:bg-slate-900"
      >
        <Background className="bg-slate-50 dark:bg-slate-900" />
        <Controls className="!bg-white/10 !rounded-lg" />
      </ReactFlow>
    </div>
  );
}
