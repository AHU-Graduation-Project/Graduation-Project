import { useState, useCallback } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import ReactFlow, {
  Background as FlowBackground,
  Controls as FlowControls,
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "../utils/cn";
import { generateRoadmap } from "../utils/palm";
import { CustomNodeGenerator } from "../components/CustomNodeGenerator";
import NodeDetailsModal from "../components/NodeDetailsModal";
import { useTranslation } from "react-i18next";
import Slider from "../components/customrange";
const nodeTypes = {
  custom: CustomNodeGenerator,
};

interface AdvancedOptions {
  minTopics: number;
  minSubtopics: number;
}

export default function GenerateRoadmap() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
    minTopics: 15,
    minSubtopics: 2,
  });

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

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
      const result = await generateRoadmap(prompt, advancedOptions);

      const processedNodes = result.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onShowDetails: (data: any) => setSelectedNode(data),
          t,
        },
      }));

      setNodes(processedNodes);
      setEdges(result.edges);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          {t("generate.title")}
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          {t("generate.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
        <div className="space-y-4">
          {/* Main Input */}
          <div className="relative">
            <div className="absolute inset-0 bg-theme rounded-lg blur opacity-20 animate-pulse"></div>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t("generate.placeholder")}
                className={cn(
                  "w-full h-32 px-4 py-3 rounded-lg transition-all resize-none",
                  "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                  "focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none",
                  error && "border-red-500 focus:ring-red-500"
                )}
              />
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-theme transition-colors"
            >
              Advanced Options
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Advanced Options Panel */}
          {showAdvanced && (
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Minimum Main Topics
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={advancedOptions.minTopics}
                      onChange={(e) =>
                        handleOptionChange(
                          "minTopics",
                          parseInt(e.target.value)
                        )
                      }
                      className="flex-1 appearance-none h-2 rounded-lg [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-slate-200 [&::-webkit-slider-runnable-track]:dark:bg-slate-700 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-slate-200 [&::-moz-range-track]:dark:bg-slate-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-theme [&::-webkit-slider-thumb]:mt-[-4px] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-theme [&::-moz-range-thumb]:border-0"
                    />
                    <span className="w-12 text-center">
                      {advancedOptions.minTopics}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Minimum Subtopics per Topic
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={advancedOptions.minSubtopics}
                      onChange={(e) =>
                        handleOptionChange(
                          "minSubtopics",
                          parseInt(e.target.value)
                        )
                      }
                      className="flex-1 appearance-none h-2 rounded-lg [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-slate-200 [&::-webkit-slider-runnable-track]:dark:bg-slate-700 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-slate-200 [&::-moz-range-track]:dark:bg-slate-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-theme [&::-webkit-slider-thumb]:mt-[-4px] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-theme [&::-moz-range-thumb]:border-0"
                      style={{
                        background: `linear-gradient(to right, red 0%, red 50%, gray 50%, gray 100%)`,
                      }}
                    />
                    <span className="w-12 text-center">
                      {advancedOptions.minSubtopics}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
              "text-white font-medium transition-all",
              "bg-theme hover:opacity-90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "group relative overflow-hidden"
            )}
          >
            <Sparkles
              className={cn("w-5 h-5", isGenerating && "animate-spin")}
            />
            <span>
              {isGenerating ? t("generate.generating") : t("generate.button")}
            </span>
          </button>
        </div>
      </form>

      {/* Loading State */}
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

      {/* Roadmap Display */}
      {!isGenerating && nodes.length > 0 && (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            className="bg-slate-50 dark:bg-slate-900"
          >
            <FlowBackground className="bg-slate-50 dark:bg-slate-900" />
            <FlowControls className="!bg-white/10 !rounded-lg" />
          </ReactFlow>
        </div>
      )}

      <NodeDetailsModal
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        node={selectedNode}
      />
    </div>
  );
}
