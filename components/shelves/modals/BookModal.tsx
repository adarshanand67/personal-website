/**
 * @fileoverview Book Modal Component - full-screen modal for displaying book details.
 * Provides an immersive reading experience with animated transitions, sidebar,
 * and scrollable content area.
 */

"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { BookSidebar } from "./book/BookSidebar";
import { BookContent } from "./book/BookContent";

/**
 * Props for BookModal component.
 * @interface BookModalProps
 * @property {any} item - Book data object to display
 * @property {Function} onClose - Callback function to close the modal
 */
interface BookModalProps {
    item: any;
    onClose: () => void;
}

/**
 * Book Modal Component - animated full-screen modal for book details.
 * Features backdrop blur, spring animations, responsive layout switching between
 * mobile (bottom sheet) and desktop (centered modal), and composed sidebar/content layout.
 *
 * @component
 * @param {BookModalProps} props - Component props
 * @returns {JSX.Element} Rendered modal with book details
 *
 * @example
 * ```tsx
 * <BookModal
 *   item={bookData}
 *   onClose={() => setShowModal(false)}
 * />
 * ```
 */
export function BookModal({ item, onClose }: BookModalProps) {
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
                className="bg-[#fafafa] dark:bg-[#09090b] w-[92%] md:w-full max-w-5xl h-[80vh] md:h-auto md:max-h-[85vh] rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden relative z-10 border border-white/20 dark:border-white/10 flex flex-col md:flex-row mx-4 md:mx-0"
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
                    <X
                        size={20}
                        className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors"
                    />
                </button>

                <BookSidebar item={item} />
                <BookContent item={item} />
            </motion.div>
        </div>
    );
}
