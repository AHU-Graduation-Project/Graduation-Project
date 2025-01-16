import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Connection,
  addEdge,
  NodeChange,
  applyNodeChanges,
  MiniMap,
  ReactFlowInstance,
  EdgeTypes,
  useKeyPress,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNodeEditor from './CustomNodeEditor';
import EditRoadmapDialog from './EditRoadmapDialog';
import EditNodeDialog from './EditNodeDialog';
import styles from './RoadmapEditor.module.css';
import EditorSideBar from './EditorSideBar';
import CustomEdge from './CustomEdge';
import EditEdgesSideBar from './EditEdgesSideBar';
import { useRef } from 'react';
import { useNodesState, useEdgesState, NodePositionChange } from 'reactflow';
import 'reactflow/dist/style.css';
import EditNodesSideBar from './EditNodesSideBar';
import HelperLinesRenderer from './HelperLines';
import { getEnhancedHelperLines } from '../../../infrastructure/utils/helperLines';

const nodeTypes = {
  custom: CustomNodeEditor,
};

export type RoadmapData = {
  title: string;
  description: string;
  resources: Array<{
    label: string;
    description: string;
    icon: string;
    url: string;
  }>;
};

export type NodeData = {
  label: string;
  description: string;
  type: 'topic' | 'subTopic';
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: {
      label: 'Start',
      description: 'Beginning of the roadmap',
      type: 'subTopic',
    },
  },
];

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const RoadmapEditor = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [roadmapData, setRoadmapData] = useState<RoadmapData>({
    title: 'My Roadmap',
    description: 'A learning path',
    resources: [],
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isEditNodeDialogOpen, setIsEditNodeDialogOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [helperLines, setHelperLines] = useState<{
    horizontal?: number;
    vertical?: number;
    spacingGuides: Array<{
      start: number;
      end: number;
      position: number;
      distance: number;
      isVertical: boolean;
    }>;
    centerGuides: {
      horizontal?: number;
      vertical?: number;
    };
  }>({
    spacingGuides: [],
    centerGuides: {},
  });
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  const deleteKeyPressed = useKeyPress('Delete');

  useEffect(() => {
    if (deleteKeyPressed) {
      if (selectedNode) {
        handleDeleteNode(selectedNode.id);
      }
      if (selectedEdge) {
        handleDeleteEdge(selectedEdge.id);
      }
    }
  }, [deleteKeyPressed, selectedNode, selectedEdge]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rightSidebarRef.current &&
        !rightSidebarRef.current.contains(event.target as HTMLElement) &&
        isRightSidebarOpen
      ) {
        setIsRightSidebarOpen(false);
        setSelectedNode(null);
        setSelectedEdge(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRightSidebarOpen]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const positionChange = changes.find(
        (change): change is NodePositionChange =>
          change.type === 'position' && change.position !== undefined,
      );

      if (positionChange) {
        const { horizontal, vertical, spacingGuides, centerGuides } =
          getEnhancedHelperLines(positionChange, nodes, 20);
        setHelperLines({ horizontal, vertical, spacingGuides, centerGuides });
      } else {
        setHelperLines({ spacingGuides: [], centerGuides: {} });
      }

      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [nodes, setNodes],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, type: 'smoothstep', animated: false }, eds),
      );
    },
    [setEdges],
  );

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    setIsRightSidebarOpen(true);
  };

  const handleEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    setIsRightSidebarOpen(true);
  };

 const handleUpdateNodeFromSidebar = (data: {
   label: string;
   description: string;
   type: 'topic' | 'subTopic';
 }) => {
   if (selectedNode) {
     setNodes((prevNodes) =>
       prevNodes.map((node) =>
         node.id === selectedNode.id
           ? { ...node, data: { ...node.data, ...data } }
           : node,
       ),
     );
     // Update the selected node's reference to match the state
     setSelectedNode((prev) =>
       prev ? { ...prev, data: { ...prev.data, ...data } } : null,
     );
   }
 };

 const handleUpdateEdgeFromSidebar = (
   edgeId: string,
   updates: Partial<Edge>,
 ) => {
   setEdges((prevEdges) =>
     prevEdges.map((edge) =>
       edge.id === edgeId
         ? {
             ...edge,
             ...updates,
             style: {
               ...edge.style,
               ...updates.style,
             },
           }
         : edge,
     ),
   );
   // Update the selected edge to reflect changes in real time
   setSelectedEdge((prev) =>
     prev?.id === edgeId ? { ...prev, ...updates } : prev,
   );
 };

  const handleDeleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    setIsRightSidebarOpen(false);
    setSelectedEdge(null);
  };

  const handleEditNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setIsEditNodeDialogOpen(true);
    }
  };

  const handleUpdateNode = (nodeId: string, data: NodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node,
      ),
    );
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    );
    setIsRightSidebarOpen(false);
    setSelectedNode(null);
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type: 'custom',
        position,
        data: { label: `New ${type}`, description: '', type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes.length, setNodes],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem('roadmap-flow', JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem('roadmap-flow') || '{}');
      if (flow.nodes && flow.edges) {
        setNodes(flow.nodes);
        setEdges(flow.edges);
      }
    };
    restoreFlow();
  }, [setNodes, setEdges]);


  return (
    <div className={styles.editorContainer}>
      <EditorSideBar
        nodes={nodes}
        styles={styles}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleEditNode={handleEditNode}
        onSave={onSave}
        onRestore={onRestore}
        onDragStart={(e, type) => {
          e.dataTransfer.setData('application/reactflow', type);
        }}
      />

      <div className={styles.flowContainer}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onInit={setReactFlowInstance}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
          <HelperLinesRenderer
            horizontal={helperLines.horizontal}
            vertical={helperLines.vertical}
            spacingGuides={helperLines.spacingGuides}
            centerGuides={helperLines.centerGuides}
          />
        </ReactFlow>
      </div>

      <div
        ref={rightSidebarRef}
        className={`${styles.rightSidebar} ${
          isRightSidebarOpen ? styles.open : ''
        }`}
      >
        {selectedNode && (
         <EditNodesSideBar 
            styles={styles}
            selectedNode={selectedNode}
            handleUpdateNodeFromSidebar={handleUpdateNodeFromSidebar}
            handleDeleteNode={handleDeleteNode}/>

        )}

        {selectedEdge && (
         <EditEdgesSideBar
            styles={styles}
            selectedEdge={selectedEdge}
            handleUpdateEdgeFromSidebar={handleUpdateEdgeFromSidebar}
            handleDeleteEdge={handleDeleteEdge}
          />
        )}
      </div>

      <EditRoadmapDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        roadmapData={roadmapData}
        onSave={setRoadmapData}
      />

      <EditNodeDialog
        isOpen={isEditNodeDialogOpen}
        onClose={() => {
          setIsEditNodeDialogOpen(false);
          setSelectedNode(null);
        }}
        node={selectedNode}
        onSave={(data) => {
          if (selectedNode) {
            handleUpdateNode(selectedNode.id, {
              ...data,
              type: selectedNode.data.type,
            });
          }
          setIsEditNodeDialogOpen(false);
          setSelectedNode(null);
        }}
        onDelete={() => {
          if (selectedNode) {
            handleDeleteNode(selectedNode.id);
          }
          setIsEditNodeDialogOpen(false);
          setSelectedNode(null);
        }}
      />
    </div>
  );
};

export default RoadmapEditor;