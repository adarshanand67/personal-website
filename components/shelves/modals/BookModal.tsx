/**
 * @fileoverview Book Modal Component - full-screen modal for displaying book details.
 */

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, BookOpen, Star, ExternalLink, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Book } from "@/types/definitions";
import { getBookGradient } from "@/lib/utils/color";
import { PillTag } from "@/components/ui/PillTag";

/**
 * Sidebar Component for the Book Modal.
 */
function BookSidebar({ item }: { item: Book }) {
    return (
        <div className="w-full md:w-[350px] bg-foreground/[0.02] p-6 md:p-8 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-foreground/10 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none" />

            {item.image ? (
                <div className="relative w-40 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-500">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : (
                <div
                    className={`relative w-40 md:w-64 aspect-[2/3] bg-gradient-to-br ${getBookGradient(item.title)} rounded-r-md rounded-l-sm flex flex-col p-6 mb-6 md:mb-8 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform hover:scale-[1.02] transition-transform duration-500`}
                >
                    <div className="absolute top-1 left-0 w-4 h-[98%] -translate-x-3 bg-black/20 dark:bg-black/40 blur-[1px] rounded-l-sm" />
                    <div className="flex-1 border-2 border-white/20 p-4 flex flex-col items-center justify-center text-center">
                        <BookOpen className="text-white/40 mb-4" size={32} />
                        <h3 className="text-white font-serif font-bold text-xl leading-tight line-clamp-4 drop-shadow-md">
                            {item.title}
                        </h3>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-white/80 font-mono uppercase tracking-widest truncate">
                            {item.author}
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
                </div>
            )}

            <div className="w-full space-y-3 relative z-10">
                {item.recommended && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground/5 text-foreground/80 rounded-xl text-[10px] font-black uppercase tracking-widest border border-foreground/10">
                        <Star size={12} fill="currentColor" />
                        <span>Must Read</span>
                    </div>
                )}
                <a
                    href={
                        item.amazonLink ||
                        `https://www.amazon.com/s?k=${encodeURIComponent(item.title + " " + item.author)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 text-foreground/60 hover:text-foreground rounded-xl text-[10px] font-black uppercase tracking-widest group transition-all hover:scale-[1.02] active:scale-[0.98] border border-foreground/10 hover:border-foreground hover:bg-foreground/5 shadow-sm"
                >
                    <ExternalLink
                        size={14}
                        className="group-hover:scale-110 transition-transform"
                    />
                    <span>Get it on Amazon</span>
                </a>
            </div>
        </div>
    );
}

/**
 * Content Component for the Book Modal.
 */
function BookContent({ item, onTagClick }: { item: any; onTagClick?: (tag: string) => void }) {
    return (
        <div className="flex-1 md:overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        {item.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium mb-6">
                        by {item.author}
                    </p>
                    {item.description && (
                        <div className="relative">
                            <Quote
                                size={18}
                                className="absolute -left-2 -top-2 text-foreground/10"
                            />
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6">
                                {item.description}
                            </p>
                        </div>
                    )}
                </div>
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag: string, idx: number) => (
                            <PillTag key={idx} label={tag} onClick={() => onTagClick?.(tag)} />
                        ))}
                    </div>
                )}
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
                {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                    <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                                <BookOpen size={16} className="text-foreground/60" />
                            </div>
                            <h3 className="text-[9px] font-black text-foreground/80 uppercase tracking-widest">
                                Key Takeaways
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {item.keyTakeaways.map((takeaway: string, idx: number) => (
                                <li
                                    key={idx}
                                    className="group flex items-start gap-4 text-sm md:text-base text-foreground/80 leading-relaxed font-normal p-3 rounded-xl transition-all hover:bg-foreground/5"
                                >
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/50 shrink-0 transition-colors" />
                                    <span>{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {item.notes && !item.keyTakeaways && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed italic">
                            "{item.notes}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Main Book Modal Component.
 */
export function BookModal({
    item,
    onClose,
    onTagClick,
}: {
    item: any;
    onClose: () => void;
    onTagClick?: (tag: string) => void;
}) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />
            <motion.div
                layoutId={`book-${item.title}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                className="bg-[#fafafa] dark:bg-[#09090b] w-[92%] md:w-full max-w-5xl max-h-[85vh] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group"
                >
                    <X
                        size={20}
                        className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors"
                    />
                </button>

                <div className="md:hidden flex-1 overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#09090b]">
                    <div className="flex flex-col">
                        <BookSidebar item={item} />
                        <BookContent item={item} onTagClick={onTagClick} />
                    </div>
                </div>

                <div className="hidden md:flex md:flex-row flex-1 overflow-hidden">
                    <BookSidebar item={item} />
                    <BookContent item={item} onTagClick={onTagClick} />
                </div>
            </motion.div>
        </div>
    );
}
