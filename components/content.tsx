/**
 * @fileoverview Consolidated content components - guestbook and related UI.
 */

"use client";

import { useState } from "react";
import { Send, TerminalSquare } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

// ============================================================================
// GuestbookHeader Component
// ============================================================================

function GuestbookHeader() {
    return (
        <div className="bg-foreground/5 px-4 py-2 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground/60">
                <TerminalSquare size={16} />
                <span className="text-sm font-bold tracking-wider">/var/log/guestbook.log</span>
            </div>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/10"></div>
            </div>
        </div>
    );
}

// ============================================================================
// GuestbookList Component
// ============================================================================

interface GuestbookEntry {
    name: string;
    message: string;
    timestamp: string;
}

interface GuestbookListProps {
    entries: GuestbookEntry[];
}

function GuestbookList({ entries }: GuestbookListProps) {
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
            {entries.length === 0 ? (
                <div className="text-gray-500 italic text-sm text-center py-8">
                    &lt; No entries found in system log... /&gt;
                </div>
            ) : (
                entries.map((entry, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-sm animate-fade-in"
                    >
                        <span className="text-gray-500 shrink-0">
                            [{formatDate(entry.timestamp)}]
                        </span>
                        <div className="flex flex-col">
                            <span className="text-foreground/90 font-bold">
                                {entry.name}
                                <span className="text-foreground/30">@guest:~$</span>
                            </span>
                            <span className="text-gray-300 break-words">{entry.message}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

// ============================================================================
// GuestbookForm Component
// ============================================================================

interface GuestbookFormProps {
    name: string;
    onNameChange: (val: string) => void;
    message: string;
    onMessageChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

function GuestbookForm({
    name,
    onNameChange,
    message,
    onMessageChange,
    onSubmit,
    isSubmitting,
}: GuestbookFormProps) {
    return (
        <div className="border-t border-foreground/10 bg-foreground/5 p-4">
            <form onSubmit={onSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded px-3 py-2 sm:w-1/3 focus-within:border-foreground/30 transition-colors">
                        <span className="text-foreground/40 text-xs font-bold">USER:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Enter alias..."
                            className="bg-transparent border-none outline-none text-foreground text-sm w-full placeholder-foreground/20"
                            maxLength={20}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded px-3 py-2 focus-within:border-foreground/30 transition-colors">
                        <span className="text-foreground/40 text-xs font-bold">&gt;</span>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            placeholder='echo "Write a message..."'
                            className="bg-transparent border-none outline-none text-foreground text-sm w-full placeholder-foreground/20"
                            maxLength={140}
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !message.trim() || !name.trim()}
                            className="text-foreground/60 hover:text-foreground disabled:opacity-30 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// ============================================================================
// Guestbook Component (Main Export)
// ============================================================================

export function Guestbook() {
    const { guestbookEntries, addGuestbookEntry } = useStore();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            addGuestbookEntry({
                name: name.trim(),
                message: message.trim(),
                timestamp: new Date().toISOString(),
            });
            setMessage("");
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div className="section max-w-4xl mx-auto px-4 py-16 font-mono">
            <div className="border border-foreground/10 bg-background/80 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                <GuestbookHeader />
                <GuestbookList entries={guestbookEntries} />
                <GuestbookForm
                    name={name}
                    onNameChange={setName}
                    message={message}
                    onMessageChange={setMessage}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
