"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { AnimeSidebar } from "./anime/AnimeSidebar";
import { AnimeContent } from "./anime/AnimeContent";

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

                <AnimeSidebar item={item} />
                <AnimeContent item={item} onTagClick={onTagClick} />
            </motion.div>
        </div>
    );
}
