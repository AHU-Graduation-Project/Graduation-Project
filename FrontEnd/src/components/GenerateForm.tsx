import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

interface GenerateFormProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

export default function GenerateForm({ onSubmit, isGenerating }: GenerateFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const suggestions = [
    "I want to become a full-stack developer",
    "Help me learn mobile app development",
    "Guide me to become a DevOps engineer",
    "Create a roadmap for machine learning",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-theme rounded-lg blur opacity-20 animate-pulse"></div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your learning goals..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
            className="px-3 py-1.5 text-sm rounded-full bg-theme/10 text-theme hover:bg-theme/20 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={isGenerating || !prompt.trim()}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all",
          "bg-theme",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "group relative overflow-hidden",
        )}
      >
        <div className="absolute inset-0 bg-theme opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className={cn("w-5 h-5", isGenerating && "animate-spin")} />
        <span>{isGenerating ? 'Generating...' : 'Generate Roadmap'}</span>
      </button>
    </form>
  );
}