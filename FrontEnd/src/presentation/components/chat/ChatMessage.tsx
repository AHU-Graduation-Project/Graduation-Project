import { cn } from "../../../infrastructure/utils/cn";
import ReactMarkdown from "react-markdown";
import { Message } from "../../../domain/entities/chat";
import ChatActions from "./ChatActions";
import CodeBlock from "./CodeBlock";


interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const renderContent = () => {
    if (message.type === "user") {
      return <p className="text-sm">{message.content}</p>;
    }

    return (
      <div className="prose dark:prose-invert prose-sm max-w-none">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const value = String(children).replace(/\n$/, "");

              return !inline ? (
                <div className="not-prose">
                  <CodeBlock language={language} value={value} />
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            p: ({ children }) => <div className="mb-4">{children}</div>,
          }}
        >
          {message.content}
        </ReactMarkdown>
        {isTyping && (
          <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
        )}
        <ChatActions message={message} />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "max-w-[80%] p-3 rounded-lg",
        message.type === "user"
          ? "ml-auto bg-theme text-white"
          : "bg-slate-100 dark:bg-slate-700"
      )}
    >
      {renderContent()}
      <span className="text-xs opacity-70 mt-1 block">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
}
