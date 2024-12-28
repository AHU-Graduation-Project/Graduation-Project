import { useState, useRef, useEffect } from "react";
import { X, Send, Bookmark } from "lucide-react";
import { cn } from "../utils/cn";
import { Message } from "../types/chat";
import { useStreamingResponse } from "../hooks/useStreamingResponse";
import { useChatContext } from "../hooks/useChatContext";
import ChatMessage from "./ChatMessage";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: any;
  userProgress: string[];
}

export default function ChatPanel({
  isOpen,
  onClose,
  roadmap,
  userProgress,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: `Welcome to the ${roadmap?.title} roadmap! I'm your AI learning assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const { isStreaming, streamResponse } = useStreamingResponse();
  const { getSystemPrompt } = useChatContext(roadmap, userProgress);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  if (!isOpen || !roadmap) return null;

  const isRtl = document.documentElement.dir === "rtl";

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");

    await streamResponse(
      getSystemPrompt(input),
      (token) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessage.id
              ? { ...msg, content: msg.content + token }
              : msg
          )
        );
      },
      () => {
        // Streaming complete
      },
      (error) => {
        console.error("Error:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessage.id
              ? {
                  ...msg,
                  content:
                    "I apologize, but I encountered an error. Please try asking your question again.",
                }
              : msg
          )
        );
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 h-full w-full md:w-1/3 bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-700 ease-in-out z-50",
        isOpen
          ? "translate-x-0"
          : isRtl
          ? "-translate-x-full"
          : "translate-x-full",
        isRtl ? "left-0" : "right-0"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-theme text-transparent bg-clip-text">
            {showSaved ? "Saved Messages" : "AI Learning Assistant"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isTyping={
              isStreaming &&
              index === messages.length - 1 &&
              message.type === "bot"
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!showSaved && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className={cn(
                "p-2 rounded-lg transition-colors hover:bg-theme",
                input.trim() && !isStreaming
                  ? "bg-theme text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-400"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
