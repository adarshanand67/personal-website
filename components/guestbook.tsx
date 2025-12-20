"use client";

import { useState, useRef, useEffect } from "react";
import { Send, TerminalSquare } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

export function Guestbook() {
    const { guestbookEntries, addGuestbookEntry } = useStore();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            addGuestbookEntry({
                name: name.trim(),
                message: message.trim(),
                timestamp: new Date().toISOString()
            });
            setMessage("");
            setIsSubmitting(false);
        }, 800);
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
        });
    };

    return (
        <div className="section max-w-4xl mx-auto px-4 py-16 font-mono">
            <div className="border border-green-900/50 bg-black/80 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] backdrop-blur-sm">

                {/* Header */}
                <div className="bg-green-900/20 px-4 py-2 border-b border-green-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-500">
                        <TerminalSquare size={16} />
                        <span className="text-sm font-bold tracking-wider">/var/log/guestbook.log</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                </div>

                {/* Log Content */}
                <div className="p-6 max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-green-900/50 scrollbar-track-transparent">
                    {guestbookEntries.length === 0 ? (
                        <div className="text-gray-500 italic text-sm text-center py-8">
                            &lt; No entries found in system log... /&gt;
                        </div>
                    ) : (
                        guestbookEntries.map((entry, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-sm animate-fade-in">
                                <span className="text-gray-500 shrink-0">
                                    [{formatDate(entry.timestamp)}]
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-green-400 font-bold">
                                        {entry.name}<span className="text-gray-500">@guest:~$</span>
                                    </span>
                                    <span className="text-gray-300 break-words">
                                        {entry.message}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-green-900/50 bg-green-950/10 p-4">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex items-center gap-2 bg-black/40 border border-green-900/30 rounded px-3 py-2 sm:w-1/3 focus-within:border-green-500/50 transition-colors">
                                <span className="text-green-500 text-xs font-bold">USER:</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter alias..."
                                    className="bg-transparent border-none outline-none text-green-100 text-sm w-full placeholder-green-900"
                                    maxLength={20}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="flex-1 flex items-center gap-2 bg-black/40 border border-green-900/30 rounded px-3 py-2 focus-within:border-green-500/50 transition-colors">
                                <span className="text-green-500 text-xs font-bold">&gt;</span>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder='echo "Write a message..."'
                                    className="bg-transparent border-none outline-none text-green-100 text-sm w-full placeholder-green-900"
                                    maxLength={140}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !message.trim() || !name.trim()}
                                    className="text-green-500 hover:text-green-400 disabled:opacity-30 disabled:hover:text-green-500 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
