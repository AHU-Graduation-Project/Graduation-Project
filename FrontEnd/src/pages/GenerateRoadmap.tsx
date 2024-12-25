import { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import ReactFlow, { Background as FlowBackground, Controls as FlowControls } from 'reactflow';
import 'reactflow/dist/style.css';
import { cn } from '../utils/cn';
import { generateRoadmap } from '../utils/palm';
import { CustomNodeGenerator } from '../components/CustomNodeGenerator';
import NodeDetailsModal from '../components/NodeDetailsModal';
import { useTranslation } from 'react-i18next';

const nodeTypes = {
  custom: CustomNodeGenerator,
};

export default function GenerateRoadmap() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState('');

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setNodes([]);
    setEdges([]);

    try {
      const result = await generateRoadmap(prompt);
      
      // Process nodes to match CustomNode requirements
      const processedNodes = result.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onShowDetails: (data: any) => setSelectedNode(data),
          t,
        }
      }));

      setNodes(processedNodes);
      setEdges(result.edges);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate roadmap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          {t('generate.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          {t('generate.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-theme rounded-lg blur opacity-20 animate-pulse"></div>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('generate.placeholder')}
              className="w-full h-32 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>
        
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
        
        <button
          type="submit"
          disabled={isGenerating || !prompt}
          className={cn(
            "mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all",
            "bg-theme",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "group relative overflow-hidden",
          )}
        >
          <div className="absolute inset-0 bg-theme opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className={cn("w-5 h-5", isGenerating && "animate-spin")} />
          <span>{isGenerating ? t('generate.generating') : t('generate.button')}</span>
        </button>
      </form>

      {/* Loading State */}
      {isGenerating && (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <div className="text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-theme border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              Generating your roadmap...
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