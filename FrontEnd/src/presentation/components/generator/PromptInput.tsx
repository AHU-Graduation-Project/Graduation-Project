import { cn } from '../../../infrastructure/utils/cn';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  isGenerating: boolean;
  error?: string;
}

export default function PromptInput({ value, onChange, isGenerating, error }: PromptInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(true);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-theme rounded-lg blur opacity-20 animate-pulse" />
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="I want to learn..."
            disabled={isGenerating}
            className={cn(
              "w-full h-32 px-4 py-3 rounded-lg transition-all resize-none",
              "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
              "focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              error && "border-red-500 focus:ring-red-500",
              isGenerating && "opacity-50"
            )}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="w-full flex items-center justify-between p-3 bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Lightbulb className="w-5 h-5" />
            <span className="font-medium">Suggestions for better results</span>
          </div>
          {showSuggestions ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showSuggestions && (
          <div className="p-3 text-sm text-slate-600 dark:text-slate-400">
            <ul className="list-disc list-inside space-y-1">
              <li>Specify your current skill level</li>
              <li>Mention specific technologies you want to learn</li>
              <li>Include any time constraints or learning preferences</li>
              <li>Add any specific areas you want to focus on</li>
            </ul>
          </div>
        )}
      </div> */}
    </div>
  );
}