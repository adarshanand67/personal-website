/**
 * @fileoverview Anime Modal Component - full-screen modal for displaying anime details.
 */

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Tv, Check, Star, Play, Calendar, Film } from "lucide-react";
import { motion } from "framer-motion";
import { WatchStatus } from "@/types/definitions";
import { PillTag } from "@/components/ui/PillTag";

/**
 * Sidebar Component for the Anime Modal.
 */
function AnimeSidebar({ item }: { item: any }) {
    return (
        <div className="w-full md:w-[350px] bg-foreground/[0.02] p-6 md:p-8 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-foreground/10 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none" />

            {item.image ? (
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " anime official trailer")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-40 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group flex-shrink-0"
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play
                            size={48}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                            fill="currentColor"
                        />
                    </div>
                </a>
            ) : (
                <div className="w-48 md:w-64 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                    <Tv className="text-gray-400" size={56} />
                </div>
            )}

            <div className="w-full space-y-3 relative z-10">
                {item.status === WatchStatus.Completed && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        <Check size={18} strokeWidth={3} />
                        <span>Completed</span>
                    </div>
                )}
                {item.recommended && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        <Star size={18} fill="currentColor" />
                        <span>Highly Recommended</span>
                    </div>
                )}
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " anime official trailer")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
                >
                    <Play size={16} className="fill-current" />
                    Watch Trailer
                </a>
            </div>
        </div>
    );
}

/**
 * Content Component for the Anime Modal.
 */
function AnimeContent({ item, onTagClick }: { item: any; onTagClick: (tag: string) => void }) {
    return (
        <div className="flex-1 md:overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                <div>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {item.year && (
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                                <Calendar size={10} /> {item.year}
                            </span>
                        )}
                        {item.rating && (
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                                <Star size={10} /> {item.rating}
                            </span>
                        )}
                        {item.seasons && (
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                                <Film size={10} /> {item.seasons}
                            </span>
                        )}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        {item.title}
                    </h2>
                    {item.description && (
                        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                            {item.description}
                        </p>
                    )}
                </div>
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
                {item.tags && item.tags.length > 0 && (
                    <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                            Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag: string) => (
                                <PillTag key={tag} label={tag} onClick={() => onTagClick(tag)} />
                            ))}
                        </div>
                    </div>
                )}
                {item.keyLearnings && item.keyLearnings.length > 0 && (
                    <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                                <Tv size={16} className="text-foreground/60" />
                            </div>
                            <h3 className="text-[9px] font-black text-foreground/80 uppercase tracking-widest">
                                Key Takeaways
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {item.keyLearnings.map((learning: string, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
                                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                        {learning}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Main Anime Modal Component.
 */
export function AnimeModal({
    item,
    onClose,
    onTagClick,
}: {
    item: any;
    onClose: () => void;
    onTagClick: (tag: string) => void;
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
                layoutId={`anime-${item.title}`}
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
                        <AnimeSidebar item={item} />
                        <AnimeContent item={item} onTagClick={onTagClick} />
                    </div>
                </div>

                <div className="hidden md:flex md:flex-row flex-1 overflow-hidden">
                    <AnimeSidebar item={item} />
                    <AnimeContent item={item} onTagClick={onTagClick} />
                </div>
            </motion.div>
        </div>
    );
}
