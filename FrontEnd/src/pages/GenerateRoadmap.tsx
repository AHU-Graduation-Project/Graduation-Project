import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { cn } from '../utils/cn';

export default function GenerateRoadmap() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setShowRoadmap(true);
  };

  const initialNodes = [
    {
      id: '1',
      type: 'custom',
      position: { x: 400, y: 0 },
      data: { label: 'Start Here' },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 400, y: 100 },
      data: { label: 'Learn Fundamentals' },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 400, y: 200 },
      data: { label: 'Build Projects' },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 400, y: 300 },
      data: { label: 'Master Advanced Topics' },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          Generate Custom Roadmap
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          Enter your learning goals and let AI create a personalized roadmap for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-theme rounded-lg blur opacity-20 animate-pulse"></div>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="I want to learn..."
              className="w-full h-32 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isGenerating || !prompt}
          className={cn(
            "mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all",
            "bg-theme ",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "group relative overflow-hidden",
          )}
        >
          <div className="absolute inset-0 bg-theme opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="w-5 h-5" />
          <span>{isGenerating ? 'Generating...' : 'Generate Roadmap'}</span>
        </button>
      </form>

      {showRoadmap && (
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            fitView
            className="bg-slate-50 dark:bg-slate-900"
          >
          </ReactFlow>
        </div>
      )}
    </div>
  );
}