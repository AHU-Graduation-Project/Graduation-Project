import { useState, useCallback, useEffect } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import EditRoadmapDialog from "./EditRoadmapDialog";
import EditNodeDialog from "./EditNodeDialog";
import styles from "./RoadmapEditor.module.css";
import EditorSideBar from "./EditorSideBar";

import { useRef } from "react";
import { useNodesState, useEdgesState, NodePositionChange } from "reactflow";
import "reactflow/dist/style.css";

import  HelperLinesRenderer  from './HelperLines';
import { getHelperLines } from "../../../infrastructure/utils/helperLines";

const nodeTypes = {
  custom: CustomNode,
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
  type: "topic" | "sideTopic";
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 100 },
    data: {
      label: "Start",
      description: "Beginning of the roadmap",
      type: "sideTopic",
    },
  },
];

const RoadmapEditor = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [roadmapData, setRoadmapData] = useState<RoadmapData>({
    title: "My Roadmap",
    description: "A learning path",
    resources: [],
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isEditNodeDialogOpen, setIsEditNodeDialogOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [helperLines, setHelperLines] = useState<{
    horizontal?: number;
    vertical?: number;
  }>({});
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rightSidebarRef.current &&
        !rightSidebarRef.current.contains(event.target as HTMLElement) &&
        isRightSidebarOpen
      ) {
        setIsRightSidebarOpen(false);
        setSelectedNode(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRightSidebarOpen]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const positionChange = changes.find(
        (change): change is NodePositionChange =>
          change.type === "position" && change.position !== undefined
      );

      if (positionChange) {
        const { horizontal, vertical } = getHelperLines(positionChange, nodes);
        setHelperLines({ horizontal, vertical });
      } else {
        setHelperLines({});
      }

      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [nodes, setNodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
    },
    [setEdges]
  );

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsRightSidebarOpen(true);
  };

  const handleUpdateNodeFromSidebar = (data: {
    label: string;
    description: string;
    type: "topic" | "sideTopic";
  }) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
      );
    }
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
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    setIsRightSidebarOpen(false);
    setSelectedNode(null);
  };

  useEffect(() => {
    const handleEditNodeEvent = (event: CustomEvent) => {
      handleEditNode(event.detail);
    };

    const handleDeleteNodeEvent = (event: CustomEvent) => {
      handleDeleteNode(event.detail);
    };

    window.addEventListener("editNode", handleEditNodeEvent as EventListener);
    window.addEventListener(
      "deleteNode",
      handleDeleteNodeEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        "editNode",
        handleEditNodeEvent as EventListener
      );
      window.removeEventListener(
        "deleteNode",
        handleDeleteNodeEvent as EventListener
      );
    };
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type: "custom",
        position,
        data: { label: `New ${type}`, description: "", type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes.length, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("roadmap-flow", JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("roadmap-flow") || "{}");
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
          e.dataTransfer.setData("application/reactflow", type);
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
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
          <HelperLinesRenderer
            horizontal={helperLines.horizontal}
            vertical={helperLines.vertical}
          />
        </ReactFlow>
      </div>

      <div
        ref={rightSidebarRef}
        className={`${styles.rightSidebar} ${
          isRightSidebarOpen ? styles.open : ""
        }`}
      >
        {selectedNode && (
          <div className={styles.rightSidebarContent}>
            <h3 className={styles.rightSidebarTitle}>Node Details</h3>
            <div className={styles.rightSidebarField}>
              <label className={styles.rightSidebarLabel}>Label</label>
              <input
                className={styles.rightSidebarInput}
                value={selectedNode.data.label}
                onChange={(e) =>
                  handleUpdateNodeFromSidebar({
                    ...selectedNode.data,
                    label: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.rightSidebarField}>
              <label className={styles.rightSidebarLabel}>Type</label>
              <select
                className={styles.rightSidebarInput}
                value={selectedNode.data.type}
                onChange={(e) =>
                  handleUpdateNodeFromSidebar({
                    ...selectedNode.data,
                    type: e.target.value as "topic" | "sideTopic",
                  })
                }
              >
                <option value="topic">Topic</option>
                <option value="sideTopic">Side Topic</option>
              </select>
            </div>
            <div className={styles.rightSidebarField}>
              <label className={styles.rightSidebarLabel}>Description</label>
              <textarea
                className={styles.rightSidebarInput}
                value={selectedNode.data.description}
                onChange={(e) =>
                  handleUpdateNodeFromSidebar({
                    ...selectedNode.data,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              className={styles.rightSidebarButton}
              onClick={() => handleDeleteNode(selectedNode.id)}
            >
              Delete Node
            </button>
          </div>
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