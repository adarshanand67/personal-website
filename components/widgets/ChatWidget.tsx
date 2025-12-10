"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Terminal, Loader2, MinusCircle } from "lucide-react";
import { useTheme } from "next-themes";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Greetings. I am Adarsh's AI assistant. Ask me anything about his skills, projects, or experience." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        // Mock response for now - typically you'd hit an API endpoint here
        setTimeout(() => {
            const responses = [
                "That's an interesting question. Accessing database...",
                "Adarsh is proficient in Next.js, React, and Python.",
                "He is currently working at Trellix as an SDE.",
                "Check out the 'Projects' section for more details.",
                "I am running on a deterministic loop. Please upgrade my API access to allow creative thinking."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-24 right-4 z-40 font-mono">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 bg-black/80 dark:bg-black/80 text-green-500 border border-green-500/50 rounded-full shadow-lg hover:bg-green-500/10 hover:shadow-green-500/20 transition-all duration-300 group"
                >
                    <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute right-0 top-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="w-[350px] h-[500px] bg-white/90 dark:bg-black/90 backdrop-blur-md border border-green-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-green-500/20 bg-green-500/5 cursor-move">
                        <div className="flex items-center gap-2">
                            <Terminal size={16} className="text-green-500" />
                            <span className="text-sm font-bold text-green-700 dark:text-green-400">adarsh_ai_bot.exe</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-green-500/10 rounded text-green-600 dark:text-green-400 transition-colors"
                            >
                                <MinusCircle size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent"
                    >
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                            ? 'bg-green-500/10 border border-green-500/20 text-green-900 dark:text-green-100 rounded-tr-none'
                                            : 'bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                                        }`}
                                >
                                    {msg.role === 'assistant' && <span className="text-green-500 font-bold mr-2 text-xs">$</span>}
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-lg rounded-tl-none flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin text-green-500" />
                                    <span className="text-xs text-gray-500">Processing...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-green-500/20 bg-gray-50/50 dark:bg-black/50">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a command..."
                                className="flex-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500 dark:focus:border-green-500 transition-colors dark:text-white"
                                autoFocus
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
