import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: any;
  userProgress: string[];
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatPanel({ isOpen, onClose, roadmap, userProgress }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Welcome to the ${roadmap?.title} roadmap! How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen || !roadmap) return null;

  const isRtl = document.documentElement.dir === 'rtl';

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Simulate bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: `Thanks for your question about ${roadmap.title}. I'm here to help you with your learning journey.`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
            AI Assistant
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] p-3 rounded-lg",
              message.type === "user"
                ? "ml-auto bg-theme text-white"
                : "bg-slate-100 dark:bg-slate-700"
            )}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              "p-2 rounded-lg transition-colors hover:bg-theme",
              input.trim()
                ? "bg-theme text-white "
                : "bg-slate-200 dark:bg-slate-700 text-slate-400"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}