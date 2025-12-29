/**
 * @fileoverview Consolidated shelf modal components for anime, books, and hobbies.
 */

"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
    X, ExternalLink, Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee,
    Users, Mic, Calendar, Star, Film, Play, Check, BookOpen, Quote
} from "lucide-react";
import { motion } from "framer-motion";
import { PillTag } from "@/components/ui";
import { WatchStatus, Book } from "@/types/definitions";
import { getBookGradient } from "@/lib/utils/color";

// ============================================================================
// Anime Modal Components
// ============================================================================

interface AnimeSidebarProps {
    item: any;
}

function AnimeSidebar({ item }: AnimeSidebarProps) {
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
                    <Image src={item.image} alt={item.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="currentColor" />
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
                    <Play size={16} className="fill-current group-hover:scale-110 transition-transform" />
                    Watch Trailer
                </a>
            </div>
        </div>
    );
}

interface AnimeContentProps {
    item: any;
    onTagClick: (tag: string) => void;
}

function AnimeContent({ item, onTagClick }: AnimeContentProps) {
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
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
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
                            <h3 className="text-[9px] font-black text-foreground/80 uppercase tracking-widest">Key Takeaways</h3>
                        </div>
                        <div className="space-y-4">
                            {item.keyLearnings.map((learning: string, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
                                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">{learning}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface AnimeModalProps {
    item: any;
    onClose: () => void;
    onTagClick: (tag: string) => void;
}

export function AnimeModal({ item, onClose, onTagClick }: AnimeModalProps) {
    if (!item || typeof item !== "object") {
        console.error("Invalid anime item passed to AnimeModal:", item);
        onClose();
        return null;
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
            <motion.div
                layoutId={`anime-${item.title}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                className="bg-[#fafafa] dark:bg-[#09090b] w-[92%] md:w-full max-w-5xl max-h-[85vh] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group">
                    <X size={20} className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors" />
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

// ============================================================================
// Book Modal Components
// ============================================================================

interface BookSidebarProps {
    item: Book;
}

function BookSidebar({ item }: BookSidebarProps) {
    return (
        <div className="w-full md:w-[350px] bg-foreground/[0.02] p-6 md:p-8 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-foreground/10 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none" />

            {item.image ? (
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " " + item.author + " book review")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-40 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group flex-shrink-0"
                >
                    <Image src={item.image} alt={item.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="currentColor" />
                    </div>
                </a>
            ) : (
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " " + item.author + " book review")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-40 md:w-64 aspect-[2/3] bg-gradient-to-br ${getBookGradient(item.title)} rounded-r-md rounded-l-sm flex flex-col p-6 mb-6 md:mb-8 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group`}
                >
                    <div className="absolute top-1 left-0 w-4 h-[98%] -translate-x-3 bg-black/20 dark:bg-black/40 blur-[1px] rounded-l-sm" />
                    <div className="flex-1 border-2 border-white/20 p-4 flex flex-col items-center justify-center text-center">
                        <BookOpen className="text-white/40 mb-4" size={32} />
                        <h3 className="text-white font-serif font-bold text-xl leading-tight line-clamp-4 drop-shadow-md">{item.title}</h3>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-white/80 font-mono uppercase tracking-widest truncate">{item.author}</p>
                    </div>
                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center rounded-r-md rounded-l-sm">
                        <Play size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="currentColor" />
                    </div>
                </a>
            )}

            <div className="w-full space-y-3 relative z-10">
                {item.recommended && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground/5 text-foreground/80 rounded-xl text-[10px] font-black uppercase tracking-widest border border-foreground/10">
                        <Star size={12} fill="currentColor" />
                        <span>Must Read</span>
                    </div>
                )}
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " " + item.author + " book review")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 text-foreground/60 hover:text-foreground rounded-xl text-[10px] font-black uppercase tracking-widest group transition-all hover:scale-[1.02] active:scale-[0.98] border border-foreground/10 hover:border-foreground hover:bg-foreground/5 shadow-sm"
                >
                    <Play size={14} className="group-hover:scale-110 transition-transform fill-current" />
                    <span>Watch Book Review</span>
                </a>
            </div>
        </div>
    );
}

interface BookContentProps {
    item: any;
}

function BookContent({ item }: BookContentProps) {
    return (
        <div className="flex-1 md:overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">{item.title}</h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium mb-6">by {item.author}</p>
                    {item.description && (
                        <div className="relative">
                            <Quote size={18} className="absolute -left-2 -top-2 text-foreground/10" />
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6">{item.description}</p>
                        </div>
                    )}
                </div>
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
                {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                    <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                                <BookOpen size={16} className="text-foreground/60" />
                            </div>
                            <h3 className="text-[9px] font-black text-foreground/80 uppercase tracking-widest">Key Takeaways</h3>
                        </div>
                        <ul className="space-y-4">
                            {item.keyTakeaways.map((takeaway: string, idx: number) => (
                                <li key={idx} className="group flex items-start gap-4 text-sm md:text-base text-foreground/80 leading-relaxed font-normal p-3 rounded-xl transition-all hover:bg-foreground/5">
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/50 shrink-0 transition-colors" />
                                    <span>{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {item.notes && !item.keyTakeaways && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed italic">"{item.notes}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

interface BookModalProps {
    item: any;
    onClose: () => void;
}

export function BookModal({ item, onClose }: BookModalProps) {
    if (!item || typeof item !== "object") {
        console.error("Invalid book item passed to BookModal:", item);
        onClose();
        return null;
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
            <motion.div
                layoutId={`book-${item.title}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                className="bg-[#fafafa] dark:bg-[#09090b] w-[92%] md:w-full max-w-5xl max-h-[85vh] rounded-[24px] md:rounded-[32px] shadow-2xl relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group">
                    <X size={20} className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </button>
                <div className="md:hidden flex-1 overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#09090b]">
                    <div className="flex flex-col">
                        <BookSidebar item={item} />
                        <BookContent item={item} />
                    </div>
                </div>
                <div className="hidden md:flex md:flex-row flex-1 overflow-hidden">
                    <BookSidebar item={item} />
                    <BookContent item={item} />
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// Hobby Modal Component
// ============================================================================

const iconMap: Record<string, React.ElementType> = {
    Dumbbell, Tv, Book: Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic,
};

const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <span className="text-4xl mb-4">🎮</span>;
    return <IconComponent className="w-12 h-12 text-foreground mb-4" />;
};

interface HobbyModalProps {
    item: any;
    onClose: () => void;
}

export function HobbyModal({ item, onClose }: HobbyModalProps) {
    if (!item || typeof item !== "object") {
        console.error("Invalid hobby item passed to HobbyModal:", item);
        onClose();
        return null;
    }

    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <motion.div layoutId={`hobby-${item.name || "unknown"}`} className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20">
                    <X size={20} />
                </button>
                <div className="p-10 flex flex-col items-center text-center">
                    {getIcon(item.icon || "")}
                    <h2 className="text-2xl font-bold mb-3 font-mono">{item.name || "Unknown Hobby"}</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-6 font-mono">{item.description || "No description available"}</p>
                    {item.link && (
                        <a
                            href={item.link}
                            target={item.link?.startsWith("http") ? "_blank" : undefined}
                            rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/10 hover:border-foreground hover:bg-foreground/5 text-foreground/60 hover:text-foreground font-black text-xs rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-widest"
                        >
                            <ExternalLink size={14} /> Explore More
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
