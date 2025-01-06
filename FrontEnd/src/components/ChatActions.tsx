import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { Message } from "../types/chat";
import { cn } from "../utils/cn";

interface ChatActionsProps {
  message: Message;
}

export default function ChatActions({ message }: ChatActionsProps) {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<"like" | "dislike" | null>(null);

  const copyToClipboard = async () => {
    const codeBlocks = message.content;
    if (codeBlocks) {
      await navigator.clipboard.writeText(codeBlocks);
    } else {
      await navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRate = (newRating: "like" | "dislike") => {
    setRating(rating === newRating ? null : newRating);
    // Here you would typically send the rating to your backend
  };

  if (message.type !== "bot") return null;

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={copyToClipboard}
        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        title="Copy to clipboard"
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
            "p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors",
            rating === "like" && "text-green-500"
          )}
          title="Like response"
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleRate("dislike")}
          className={cn(
            "p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors",
            rating === "dislike" && "text-red-500"
          )}
          title="Dislike response"
        >
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
