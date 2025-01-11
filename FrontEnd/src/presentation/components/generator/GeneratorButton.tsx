import React from "react";
import { cn } from "../../../infrastructure/utils/cn"; // Ensure to import your 'cn' function if it's a utility
import { Sparkles, StopCircle } from "lucide-react"; // Ensure to import your icons
import AnimationWrapper from "../UI/Animation/Animation";
interface GenerateButtonProps {
  isGenerating: boolean;
  prompt: string;
  stopGeneration: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  isGenerating,
  prompt,
  stopGeneration,
}) => {
  return (
    <AnimationWrapper animationType={5}>
      {" "}
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
          <Sparkles className={cn("w-5 h-5", isGenerating && "animate-spin")} />
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
    </AnimationWrapper>
  );
};

export default GenerateButton;
