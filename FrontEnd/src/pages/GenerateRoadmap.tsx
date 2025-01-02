import { useState, useCallback, useRef } from "react";
import { Sparkles, Save, StopCircle } from "lucide-react";
import ReactFlow, {
  Background as FlowBackground,
  Controls as FlowControls,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "../utils/cn";
import { generateRoadmap } from "../utils/palm";
import { CustomNodeGenerator } from "../components/generator/CustomNodeGenerator";
import RoadmapToolbar from "../components/generator/RoadmapToolbar";
import EditNodeModal from "../components/generator/EditNodeModal";
import { useAuthStore } from "../store/authStore";
import SaveRoadmapModal from "../components/SaveRoadmapModal";
import { useNavigate } from "react-router-dom";
import GeneratorHeader from "../components/generator/GeneratorHeader";
import PromptInput from "../components/generator/PromptInput";
import AdvancedOptions from "../components/generator/AdvancedOptions";
import GeneratorNodeDetail from "../components/generator/GeneratorNodeDetail";

const nodeTypes = {
  custom: CustomNodeGenerator,
};

interface AdvancedOptions {
  minTopics: number;
  minSubtopics: number;
  isOpen: boolean;
  onToggle: () => void;
  onOptionChange: (option: "minTopics" | "minSubtopics", value: number) => void;
}

export default function GenerateRoadmap() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNodeDetails, setShowNodeDetails] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const { user, saveGeneratedRoadmap } = useAuthStore();
  const navigate = useNavigate();

  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
    minTopics: 15,
    minSubtopics: 2,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

const onNodesChange = useCallback(
  (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  []
);  const onEdgesChange = useCallback(() => {}, []);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
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

    try {
      abortControllerRef.current = new AbortController();
      const result = await generateRoadmap(
        prompt,
        advancedOptions,
        abortControllerRef.current.signal
      );

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
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Generation was stopped");
      } else {
        console.error("Error:", err);
        setError("Failed to generate roadmap. Please try again.");
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
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

  const handleOptionChange = (key: keyof AdvancedOptions, value: number) => {
    setAdvancedOptions((prev) => ({
      ...prev,
      [key]: Math.max(
        key === "minTopics" ? 5 : 1,
        Math.min(key === "minTopics" ? 30 : 5, value)
      ),
    }));
  };

  const handleNodeClick = (event, node) => {
    setNodes((nds) =>
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

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
                "text-white font-medium transition-all",
                "bg-theme hover:opacity-90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "group relative overflow-hidden"
              )}
            >
              <Sparkles
                className={cn("w-5 h-5", isGenerating && "animate-spin")}
              />
              <span>{isGenerating ? "Generating..." : "Generate Roadmap"}</span>
            </button>

            {isGenerating && (
              <button
                type="button"
                onClick={stopGeneration}
                className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <StopCircle className="w-5 h-5" />
                <span>Stop</span>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Save Button */}
      {nodes.length > 0 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-6 py-3 rounded-lg bg-theme text-white hover:opacity-90 transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Roadmap</span>
          </button>
        </div>
      )}

      {isGenerating && (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-theme border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              Generating your personalized learning roadmap...
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              This may take a few moments
            </p>
          </div>
        </div>
      )}

      {/*  roadmap flow */}
      {!isGenerating && nodes.length > 0 && (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
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
            />
          </ReactFlow>
        </div>
      )}

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
    </div>
  );
}
