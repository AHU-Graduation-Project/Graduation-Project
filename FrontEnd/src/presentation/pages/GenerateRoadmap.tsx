import { useState, useCallback, useRef } from "react";
import { Sparkles, Save, StopCircle } from "lucide-react";
import ReactFlow, {
  Background as FlowBackground,
  Controls as FlowControls,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "../../infrastructure/utils/cn";
import { generateRoadmap } from "../../infrastructure/utils/palm";
import { CustomNodeGenerator } from "../components/generator/CustomNodeGenerator";
import RoadmapToolbar from "../components/generator/RoadmapToolbar";
import EditNodeModal from "../components/Modal/EditNodeModal";
import { useAuthStore } from "../../application/state/authStore";
import SaveRoadmapModal from "../components/Modal/SaveRoadmapModal";
import { useNavigate } from "react-router-dom";
import GeneratorHeader from "../components/generator/GeneratorHeader";
import PromptInput from "../components/generator/PromptInput";
import AdvancedOptions from "../components/generator/AdvancedOptions";
import GeneratorNodeDetail from "../components/Modal/GeneratorNodeDetailModal";
import { motion, AnimatePresence } from "framer-motion";

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
  const [sources, setSources] = useState<any[]>([]);

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

  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
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
    setSources([]); // Clear previous sources
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
      setSources(result.sources || []);
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

      {isGenerating && (
        <motion.div
          className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="text-center space-y-4">
            <motion.div
              className="w-16 h-16 border-4 border-theme border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="text-lg font-medium text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Generating your personalized learning roadmap...
            </motion.p>
            <motion.p
              className="text-sm text-slate-500 dark:text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              This may take a few moments
            </motion.p>
          </div>
        </motion.div>
      )}

      {/*  roadmap flow */}
      <AnimatePresence>
        {!isGenerating && nodes.length > 0 && !wasStopped && (
          <motion.div
            className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

      {/* Add Sources Section */}
      {sources.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-theme">
            Learning Resources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-theme transition-all"
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-theme">
                  {source.type === "course" && (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  )}
                  {source.type === "book" && (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {source.type === "documentation" && (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {source.type === "article" && (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate group-hover:text-theme transition-colors">
                    {source.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {source.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
