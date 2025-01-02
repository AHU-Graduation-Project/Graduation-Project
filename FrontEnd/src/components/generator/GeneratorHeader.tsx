import { Sparkles, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface GeneratorHeaderProps {
  isGenerating: boolean;
}

export default function GeneratorHeader({ isGenerating }: GeneratorHeaderProps) {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  const examples = [
    "I want to learn frontend development with React and TypeScript",
    "Create a roadmap for becoming a DevOps engineer starting from basics",
    "Show me how to become a mobile developer focusing on React Native",
    "I'm a beginner, help me learn web development from scratch"
  ];

  return (
    <div className="text-center mb-12">
      <div className="relative flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-theme text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-theme text-transparent bg-clip-text">
            {t("generate.title")}
          </h1>
          <div className="relative">
            {/* <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-theme" />
            
            </button>
             */}
            {/* {showTooltip && (
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-80 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                <h3 className="font-medium mb-2 text-theme">Example Prompts:</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 text-left">
                  {examples.map((example, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-theme">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                  Be specific about your goals, experience level, and preferred technologies!
                </div>
              </div>
            )} */}
          </div>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-4">
          Enter your learning goals and let AI create a personalized roadmap for
          you
        </p>

        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span className="px-2 py-1 rounded-md bg-theme/10 text-theme">
            Pro Tip:
          </span>
          <span className="ml-2">
            Tell AI exactly what you want to learn and your experience level
          </span>
        </div>
      </div>
    </div>
  );
}