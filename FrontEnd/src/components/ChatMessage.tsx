import { cn } from "../utils/cn";
import ReactMarkdown from "react-markdown";
import { Message } from "../types/chat";
import ChatActions from "./ChatActions";

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping }: ChatMessageProps) {


  return (
    <div
      className={cn(
        "max-w-[80%] p-3 rounded-lg",
        message.type === "user"
          ? "ml-auto bg-theme text-white"
          : "bg-slate-100 dark:bg-slate-700"
      )}
    >
      {message.type === "bot" ? (
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
          {isTyping && (
            <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
          )}
          <ChatActions message={message} />
        </div>
      ) : (
        <p className="text-sm">{message.content}</p>
      )}
      <span className="text-xs opacity-70 mt-1 block">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
}
