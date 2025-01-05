import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Message } from "../types/chat";

interface ChatActionsProps {
  message: Message;
}

export default function ChatActions({ message }: ChatActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    // Extract code blocks from the message
    const codeBlocks = message.content.match(/```[\s\S]*?```/g);
    if (codeBlocks) {
      // Clean the code blocks (remove ``` markers and language identifier)
      const cleanCode = codeBlocks
        .map((block) => block.replace(/```\w*\n?|\`\`\`/g, ""))
        .join("\n\n");
      await navigator.clipboard.writeText(cleanCode);
    } else {
      await navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    </div>
  );
}
