import { Save, Download } from 'lucide-react';
import ReactFlow, { Background, Controls } from 'reactflow';
import { cn } from '../utils/cn';
import { CustomNode } from './RoadmapFlow';

const nodeTypes = {
  custom: CustomNode,
};

interface GeneratePreviewProps {
  nodes: any[];
  edges: any[];
  onSave: () => void;
  onDownload: () => void;
}

export default function GeneratePreview({ nodes, edges, onSave, onDownload }: GeneratePreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Roadmap
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-theme hover:bg-white/20 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
      
      <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50 dark:bg-slate-900"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className="p-4 rounded-lg bg-theme/10 border border-theme/20">
        <h3 className="font-medium mb-2 text-theme">Tips for Your Learning Journey</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>Start with the fundamentals before moving to advanced topics</li>
          <li>Complete each node before moving to its dependencies</li>
          <li>Use the chat assistant for guidance on specific topics</li>
          <li>Track your progress regularly to stay motivated</li>
        </ul>
      </div>
    </div>
  );
}