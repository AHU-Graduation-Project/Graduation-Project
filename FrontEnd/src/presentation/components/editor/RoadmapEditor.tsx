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
import ConfirmRefreshModal from '../Modal/ConfirmRefreshModal';

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
  const isDragging = useRef(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showRefreshConfirm, setShowRefreshConfirm] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

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
  const [undoStack, setUndoStack] = useState<
    {
      nodes: Node[];
      edges: Edge[];
    }[]
  >([]);

  const [redoStack, setRedoStack] = useState<
    {
      nodes: Node[];
      edges: Edge[];
    }[]
  >([]);

  // Save state to history for all changes
  const saveToHistory = useCallback(
    (newState: { nodes: Node[]; edges: Edge[] }) => {
      setUndoStack((prev) => [...prev, newState]);
      setRedoStack([]); // Clear redo stack when new changes are made
    },
    [],
  );

  useEffect(() => {
    setUndoStack([
      {
        nodes,
        edges,
      },
    ]);
  }, []); // Run once on mount

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        if (undoStack.length > 1) {
          const currentState = undoStack[undoStack.length - 1];
          const previousState = undoStack[undoStack.length - 2];

          // Restore previous state
          setNodes(previousState.nodes);
          setEdges(previousState.edges);

          // Update stacks
          setUndoStack((prev) => prev.slice(0, -1));
          setRedoStack((prev) => [currentState, ...prev]);
        } else if (undoStack.length === 1) {
          // Handle the case where there's only one state in the undo stack
          const currentState = undoStack[0];

          // Clear the canvas
          setNodes([]);
          setEdges([]);

          // Move current state to redo stack
          setUndoStack([]);
          setRedoStack((prev) => [currentState, ...prev]);
        }
      } else if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        if (redoStack.length > 0) {
          const nextState = redoStack[0];

          // Restore next state
          setNodes(nextState.nodes);
          setEdges(nextState.edges);

          // Update stacks
          setRedoStack((prev) => prev.slice(1));
          setUndoStack((prev) => [...prev, nextState]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack, setEdges, setNodes]);

  // Update all state-changing functions to use saveToHistory

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const positionChange = changes.find(
        (change): change is NodePositionChange =>
          change.type === 'position' && change.position !== undefined,
      );

      if (positionChange) {
        isDragging.current = true;
        const { horizontal, vertical, spacingGuides, centerGuides } =
          getEnhancedHelperLines(positionChange, nodes, 20);
        setHelperLines({ horizontal, vertical, spacingGuides, centerGuides });
      } else {
        setHelperLines({ spacingGuides: [], centerGuides: {} });
      }

      const newNodes = applyNodeChanges(changes, nodes);
      setNodes(newNodes);

      // Only save to history if it's  a position change (e.g., selection)
    },
    [nodes, edges, saveToHistory, setNodes],
  );

  const onNodeDragStop = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      // Save the final position to history
      saveToHistory({
        nodes,
        edges,
      });
    }
  }, [nodes, edges, selectedNode, selectedEdge]);

  const handleDeleteNode = (nodeId: string) => {
    const newNodes = nodes.filter((node) => node.id !== nodeId);
    const newEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId,
    );
    setNodes(newNodes);
    setEdges(newEdges);
    setIsRightSidebarOpen(false);
    setSelectedNode(null);

    saveToHistory({
      nodes: newNodes,
      edges: newEdges,
    });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(
        { ...params, type: 'smoothstep', animated: false },
        edges,
      );
      setEdges(newEdges);
      saveToHistory({
        nodes,
        edges: newEdges,
      });
    },
    [edges, nodes, selectedNode, selectedEdge],
  );

  const handleUpdateNodeFromSidebar = (data: {
    label: string;
    description: string;
    type: 'topic' | 'subTopic';
  }) => {
    if (selectedNode) {
      const newNodes = nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...data } }
          : node,
      );
      const newSelectedNode = {
        ...selectedNode,
        data: { ...selectedNode.data, ...data },
      };

      setNodes(newNodes);
      setSelectedNode(newSelectedNode);

      saveToHistory({
        nodes: newNodes,
        edges,
      });
    }
  };

  const handleUpdateEdgeFromSidebar = (
    edgeId: string,
    updates: Partial<Edge>,
  ) => {
    const newEdges = edges.map((edge) =>
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
    );
    const newSelectedEdge =
      selectedEdge?.id === edgeId
        ? { ...selectedEdge, ...updates }
        : selectedEdge;

    setEdges(newEdges);
    setSelectedEdge(newSelectedEdge);

    saveToHistory({
      nodes,
      edges: newEdges,
    });
  };
  const handleSaveAndRefresh = () => {
    onSave();
    setHasUnsavedChanges(false);
    setShowRefreshConfirm(false);
    window.location.reload();
  };
  const handleRefreshAnyway = () => {
    setHasUnsavedChanges(false);
    setShowRefreshConfirm(false);
    window.location.reload();
  };
  // Add event listener for beforeunload to prevent accidental refresh
  // useEffect(() => {
  //     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //       if (hasUnsavedChanges) {

  //         e.preventDefault();

  //         // Prevent the default alert from showing
  //         e.returnValue = '';
  //         // Show custom modal instead
  //         // setShowRefreshConfirm(true);
  //       }
  //       e.preventDefault();
  //     };

  //     window.addEventListener('beforeunload', handleBeforeUnload);
  //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  //   }, [hasUnsavedChanges]);

  const handlePublish = () => {
    // Here you would typically make an API call to publish the roadmap
    setIsPublished(true);
  };

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
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem('roadmap-flow', JSON.stringify(flow));
      setHasUnsavedChanges(false);
    }
  }, [reactFlowInstance]);

  const handleDeleteEdge = (edgeId: string) => {
    const newEdges = edges.filter((edge) => edge.id !== edgeId);
    setEdges(newEdges);
    saveToHistory({
      nodes,
      edges: newEdges,
    });
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
    const newNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node,
    );
    setNodes(newNodes);
  };

  // Update onDrop to include operation type
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
        id: `${Date.now()}`, // Use timestamp for unique ID
        type: 'custom',
        position,
        data: { label: `New ${type}`, description: '', type },
      };

      const newNodes = nodes.concat(newNode);
      setNodes(newNodes);

      // Save state immediately after adding new node
      saveToHistory({
        nodes: newNodes,
        edges,
      });
    },
    [
      reactFlowInstance,
      nodes,
      edges,
      selectedNode,
      selectedEdge,
      isRightSidebarOpen,
    ],
  );
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges]);
  return (
    <div className={styles.editorContainer}>
      <EditorSideBar
        nodes={nodes}
        styles={styles}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleEditNode={handleEditNode}
        isPublished={isPublished}
        onPublish={handlePublish}
        onSave={onSave}
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
          onNodeDragStop={onNodeDragStop}
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
            handleDeleteNode={handleDeleteNode}
            allNodes={nodes}
          />
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
      <ConfirmRefreshModal
        isOpen={showRefreshConfirm}
        onClose={() => setShowRefreshConfirm(false)}
        onRefresh={handleRefreshAnyway}
        onSaveAndRefresh={handleSaveAndRefresh}
      />
    </div>
  );
};

export default RoadmapEditor;
