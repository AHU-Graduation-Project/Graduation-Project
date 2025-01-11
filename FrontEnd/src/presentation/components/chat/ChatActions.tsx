import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { Message } from "../../../domain/entities/chat";
import { cn } from "../../../infrastructure/utils/cn";

interface ChatActionsProps {
  message: Message;
}

export default function ChatActions({ message }: ChatActionsProps) {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<"like" | "dislike" | null>(null);

  const copyToClipboard = async () => {
    try {
      const codeBlocks = message.content;
      if (codeBlocks) {
        await navigator.clipboard.writeText(codeBlocks);
      } else {
        await navigator.clipboard.writeText(message.content);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = message.content;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleRate = (newRating: "like" | "dislike") => {
    setRating(rating === newRating ? null : newRating);
  };

  if (message.type !== "bot") return null;

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={copyToClipboard}
        className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
        title="Copy to clipboard"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <div className="flex gap-1 ml-2">
        <button
          onClick={() => handleRate("like")}
          className={cn(
            "p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center",
            rating === "like" && "text-green-500"
          )}
          title="Like response"
          aria-label="Like response"
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleRate("dislike")}
          className={cn(
            "p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center",
            rating === "dislike" && "text-red-500"
          )}
          title="Dislike response"
          aria-label="Dislike response"
        >
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
