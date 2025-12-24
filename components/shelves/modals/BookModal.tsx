"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { BookHeader } from "./book/BookHeader";
import { BookContent } from "./book/BookContent";

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
                    <BookHeader item={item} />
                    <BookContent item={item} />
                </div>
            </motion.div>
        </div>
    );
}
