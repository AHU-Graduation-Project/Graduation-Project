import { ChevronDown, ChevronUp } from 'lucide-react';
import Slider from './customrange';

interface AdvancedOptionsProps {
  isOpen: boolean;
  onToggle: () => void;
  options: {
    minTopics: number;
    minSubtopics: number;
  };
  onOptionChange: (option: string, value: number) => void;
}

export default function AdvancedOptions({ 
  isOpen, 
  onToggle, 
  options, 
  onOptionChange 
}: AdvancedOptionsProps) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-theme transition-colors mx-auto"
      >
        Advanced Options
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Minimum Main Topics
              </label>
              <div className="flex items-center gap-2">
                <Slider
                  advancedOptions={options}
                  handleOptionChange={onOptionChange}
                  option="minTopics"
                  max={30}
                  min={5}
                />
                <span className="w-12 text-center">
                  {options.minTopics}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Minimum Subtopics per Topic
              </label>
              <div className="flex items-center gap-2">
                <Slider
                  advancedOptions={options}
                  handleOptionChange={onOptionChange}
                  option="minSubtopics"
                  max={5}
                  min={1}
                />
                <span className="w-12 text-center">
                  {options.minSubtopics}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}