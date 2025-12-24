"use client";

import Image from "next/image";
import { X, Tv, Check, Star, Calendar, Film, Play } from "lucide-react";
import { motion } from "framer-motion";
import { WatchStatus } from '@/types/definitions';

interface AnimeModalProps {
    item: any;
    onClose: () => void;
    onTagClick: (tag: string) => void;
}

export function AnimeModal({ item, onClose, onTagClick }: AnimeModalProps) {
    return (
        <div className="fixed inset-0 z-[1001] flex items-end md:items-center justify-center p-0 md:p-4">
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
                className="bg-[#fafafa] dark:bg-[#09090b] w-full max-w-5xl h-[95vh] md:h-auto md:max-h-[85vh] md:rounded-[32px] rounded-t-[32px] shadow-2xl overflow-hidden relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row"
            >
                {/* Mobile Handle */}
                <div className="md:hidden w-full flex flex-col items-center pt-3 pb-2 sticky top-0 bg-[#fafafa] dark:bg-[#09090b] z-30 border-b border-gray-100 dark:border-white/5">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group"
                >
                    <X size={20} className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </button>

                {/* Left Side: Image & Key Stats */}
                <div className="md:w-[400px] bg-gray-100/50 dark:bg-white/5 p-8 md:p-10 flex flex-col items-center justify-start border-r border-gray-200/50 dark:border-white/5 relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/80 dark:to-black/20 pointer-events-none" />

                    {item.image ? (
                        <div className="relative w-48 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-8 transform hover:scale-[1.02] transition-transform duration-500">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="w-48 md:w-64 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                            <Tv className="text-gray-400" size={56} />
                        </div>
                    )}

                    <div className="w-full space-y-3 relative z-10">
                        {item.status === WatchStatus.Completed && (
                            <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-500/20">
                                <Check size={14} strokeWidth={3} />
                                <span>Completed</span>
                            </div>
                        )}
                        {item.recommended && (
                            <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                <Star size={14} fill="currentColor" />
                                <span>Highly Recommended</span>
                            </div>
                        )}

                        {/* Watch Trailer Button */}
                        <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " trailer")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-600/20 group transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Play size={16} className="fill-current group-hover:scale-110 transition-transform" />
                            Watch Trailer
                        </a>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {item.year && (
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                        <Calendar size={12} /> {item.year}
                                    </span>
                                )}
                                {item.rating && (
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                        <Star size={12} /> {item.rating}
                                    </span>
                                )}
                                {item.seasons && (
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                        <Film size={12} /> {item.seasons}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                                {item.title}
                            </h2>

                            {item.description && (
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                    {item.description}
                                </p>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gray-100 dark:bg-white/5" />

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag: string) => (
                                        <button
                                            key={tag}
                                            onClick={() => onTagClick(tag)}
                                            className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 hover:scale-105 transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Learnings */}
                        {item.keyLearnings && item.keyLearnings.length > 0 && (
                            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-500/10 rounded-lg">
                                        <Tv size={18} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Key Takeaways
                                    </h3>
                                </div>
                                <ul className="space-y-3 list-disc pl-5 marker:text-gray-400">
                                    {item.keyLearnings.map((learning: string, idx: number) => (
                                        <li key={idx} className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                            {learning}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
