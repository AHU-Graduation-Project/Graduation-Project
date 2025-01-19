import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Background as FlowBackground,
  Controls as FlowControls,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { generateRoadmap } from "../../../infrastructure/utils/palm";
import { CustomNodeGenerator } from "./CustomNodeGenerator";
import RoadmapToolbar from "./RoadmapToolbar";
import EditNodeModal from "../Modal/EditNodeModal";
import { useAuthStore } from "../../../application/state/authStore";
import SaveRoadmapModal from "../Modal/SaveRoadmapModal";
import { useNavigate } from "react-router-dom";
import GeneratorHeader from "./GeneratorHeader";
import PromptInput from "./PromptInput";
import AdvancedOptions from "./AdvancedOptions";
import GeneratorNodeDetail from "../Modal/GeneratorNodeDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import GeneratorReferences from './GeneratorReferences';
import GenerateButton from "./GeneratorButton";
import GeneratingIndicator from "./GeneratingIndicator";

const nodeTypes = {
  custom: CustomNodeGenerator,
};

interface AdvancedOptions {
  isOpen: boolean;
  onToggle: () => void;
  onOptionChange: (option: string, value: number) => void;
}
interface AdvancedOptionsProps {
  minTopics: number;
  minSubtopics: number;
}

interface NodeData {
  isSelected: boolean;
  [key: string]: any; // For other possible data properties
}

interface FlowNode {
  id: string;
  data: NodeData;
  [key: string]: any; // For other possible node properties
}

export default function GenerateRoadmapComponent() {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNodeDetails, setShowNodeDetails] = useState(false);
  const [references, setReferences] = useState<any[]>([]);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const { user, saveGeneratedRoadmap } = useAuthStore();
  const navigate = useNavigate();

  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsProps>({
    minTopics: 15,
    minSubtopics: 2,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(() => {}, []);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
      setWasStopped(true); // Set the stopped flag
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter what you want to learn");
      return;
    }

    setIsGenerating(true);
    setError("");
    setNodes([]);
    setEdges([]);
    setReferences([]); 
    setWasStopped(false);

    // Initialize AbortController
    abortControllerRef.current = new AbortController();

    try {
      const result = await generateRoadmap(
        prompt,
        {
          minTopics: advancedOptions.minTopics,
          minSubtopics: advancedOptions.minSubtopics,
        },
        abortControllerRef.current.signal
      );

      if (!result || !result.nodes || !result.edges) {
        throw new Error("Invalid response structure from AI");
      }

      const processedNodes = result.nodes.map((node) => ({
        ...node,
        draggable: true,
        data: {
          ...node.data,
          onShowDetails: (data: any) => {
            setSelectedNode(data);
            setShowNodeDetails(true);
          },
        },
      }));

      setNodes(processedNodes);
      setEdges(result.edges);
      setReferences(result.references || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Generation was stopped");
        } else {
          console.error("Error:", err);
          setError(
            err.message || "Failed to generate roadmap. Please try again."
          );
        }
      } else {
        console.error("Unknown error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsGenerating(false);
      if (abortControllerRef.current) {
        abortControllerRef.current = null;
      }
    }
  };

  const handleSaveRoadmap = (title: string, description: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    saveGeneratedRoadmap(title, description, nodes, edges);
    navigate("/profile");
  };

  const handleOptionChange = (
    key: keyof AdvancedOptionsProps,
    value: number
  ) => {
    setAdvancedOptions((prev) => ({
      ...prev,
      [key]: Math.max(
        key === "minTopics" ? 5 : 1,
        Math.min(key === "minTopics" ? 30 : 5, value)
      ),
    }));
  };

  const handleNodeClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: FlowNode
  ) => {
    setNodes((nds: FlowNode[]) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isSelected: n.id === node.id,
        },
      }))
    );
    setSelectedNode(node);
  };

  const handleCloseDetails = () => {
    setSelectedNode(null);
    setShowNodeDetails(false);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isSelected: false,
        },
      }))
    );
  };

  const handleEditNode = () => {
    if (selectedNode) {
      setShowEditModal(true);
    }
  };

  const handleSaveEditNode = (nodeData: any) => {
    setNodes((nds: any[]) =>
      nds.map((node: any) => (node.id === nodeData.id ? nodeData : node))
    );
    setSelectedNode(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <GeneratorHeader isGenerating={isGenerating} />

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
        <div className="space-y-6">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            isGenerating={isGenerating}
            error={error}
          />

          <AdvancedOptions
            isOpen={showAdvanced}
            onToggle={() => setShowAdvanced(!showAdvanced)}
            options={advancedOptions}
            onOptionChange={handleOptionChange}
          />

          <GenerateButton
            isGenerating={isGenerating}
            prompt={prompt}
            stopGeneration={stopGeneration}
          />
        </div>
      </form>

      {isGenerating && <GeneratingIndicator />}

      {/*  roadmap flow */}

      <AnimatePresence>
        {!isGenerating && nodes.length > 0 && !wasStopped && (
          <motion.div
            className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
              nodeTypes={nodeTypes}
              fitView
              className="bg-slate-50 dark:bg-slate-900"
            >
              <FlowBackground className="bg-slate-50 dark:bg-slate-900" />
              <FlowControls className="!bg-white/10 !rounded-lg" />
              <RoadmapToolbar
                isNodeSelected={!!selectedNode}
                onEditNode={handleEditNode}
                onShowDetails={() => {
                  if (selectedNode) {
                    setSelectedNode(selectedNode.data);
                    setShowNodeDetails(true);
                  }
                }}
                setShowSaveModal={setShowSaveModal}
              />
            </ReactFlow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Details Modal */}
      <GeneratorNodeDetail
        isOpen={showNodeDetails}
        onClose={handleCloseDetails}
        node={selectedNode}
      />
      {/* Edit Node Modal */}
      <EditNodeModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        node={selectedNode}
        onSave={handleSaveEditNode}
      />

      <SaveRoadmapModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveRoadmap}
      />

      {/* references Section */}
      {references.length > 0 && <GeneratorReferences references={references} />}
    </div>
  );
}
