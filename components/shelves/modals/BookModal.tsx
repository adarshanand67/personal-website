"use client";

import Image from "next/image";
import { X, BookOpen, Check, ExternalLink, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface BookModalProps {
    item: any;
    onClose: () => void;
}

export function BookModal({ item, onClose }: BookModalProps) {
    return (
        <div className="fixed inset-0 z-[1001] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                layoutId={`book-${item.title}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.8 }}
                className="bg-white dark:bg-zinc-900 w-full max-w-5xl h-[95vh] md:h-auto md:max-h-[90vh] md:rounded-3xl rounded-t-[32px] shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10"
            >
                {/* Mobile Handle */}
                <div className="md:hidden w-full flex flex-col items-center pt-3 pb-2 sticky top-0 bg-white dark:bg-zinc-900 z-30 border-b border-gray-100 dark:border-white/5">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-gray-100/80 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm"
                >
                    <X size={20} className="text-gray-700 dark:text-gray-300" />
                </button>

                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header Section with Image */}
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-8 md:p-12 border-b border-gray-200 dark:border-white/10">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Book Cover */}
                            <div className="shrink-0 mx-auto md:mx-0">
                                {item.image ? (
                                    <div className="relative w-40 md:w-48 aspect-[2/3] shadow-2xl rounded-xl overflow-hidden ring-4 ring-white/50 dark:ring-white/10 group">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="w-40 md:w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                        <BookOpen className="text-gray-400" size={56} />
                                    </div>
                                )}
                            </div>

                            {/* Book Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                                    <span className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                                        Featured Book
                                    </span>
                                    {item.recommended && (
                                        <span className="px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-amber-500/20">
                                            <Star size={11} fill="currentColor" /> Must Read
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-3xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white leading-tight">
                                    {item.title}
                                </h2>

                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-6">
                                    by {item.author}
                                </p>

                                {item.description && (
                                    <div className="relative">
                                        <Quote size={24} className="absolute -left-2 -top-2 text-green-500/30" />
                                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6 max-w-2xl">
                                            {item.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Key Takeaways */}
                        {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-1 rounded-full bg-green-500" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                                        Key Takeaways
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-green-500/20 to-transparent" />
                                </div>

                                <div className="grid gap-4">
                                    {item.keyTakeaways.map((takeaway: string, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-green-500/20 transition-colors">
                                                <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5 group-hover:bg-green-500/20 transition-colors">
                                                    <Check size={16} className="text-green-600 dark:text-green-400" />
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed flex-1">
                                                    {takeaway}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notes (if no takeaways) */}
                        {item.notes && !item.keyTakeaways && (
                            <div className="p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed italic">
                                    "{item.notes}"
                                </p>
                            </div>
                        )}

                        {/* CTA Button */}
                        {item.amazonLink && (
                            <div className="pt-4">
                                <a
                                    href={item.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                                    Get it on Amazon
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
