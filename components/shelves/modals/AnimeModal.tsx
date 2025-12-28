/**
 * @fileoverview Anime Modal Component - full-screen modal for displaying anime details.
 * Provides an immersive viewing experience with animated transitions, sidebar,
 * scrollable content area, and tag filtering support.
 */

"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { AnimeSidebar } from "./anime/AnimeSidebar";
import { AnimeContent } from "./anime/AnimeContent";

/**
 * Props for AnimeModal component.

 * @property {any} item - Anime data object to display
 * @property {Function} onClose - Callback function to close the modal
 * @property {Function} onTagClick - Callback function when a category tag is clicked
 */
interface AnimeModalProps {
    item: any;
    onClose: () => void;
    onTagClick: (tag: string) => void;
}

/**
 * Anime Modal Component - animated full-screen modal for anime details.
 * Features backdrop blur, spring animations, responsive layout switching between
 * mobile (single scrollable view) and desktop (sidebar + content), and interactive tag filtering.
 *

 * @param {AnimeModalProps} props - Component props
 * @returns {JSX.Element} Rendered modal with anime details
 */
export function AnimeModal({ item, onClose, onTagClick }: AnimeModalProps) {
    // Validate item prop
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
                {/* Close Button - Fixed */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-sm group"
                >
                    <X
                        size={20}
                        className="text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors"
                    />
                </button>

                {/* Mobile/Small Screens: Single scrollable view with everything */}
                <div className="md:hidden flex-1 overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#09090b]">
                    <div className="flex flex-col">
                        <AnimeSidebar item={item} />
                        <AnimeContent item={item} onTagClick={onTagClick} />
                    </div>
                </div>

                {/* Desktop: Side-by-side layout */}
                <div className="hidden md:flex md:flex-row flex-1 overflow-hidden">
                    <AnimeSidebar item={item} />
                    <AnimeContent item={item} onTagClick={onTagClick} />
                </div>
            </motion.div>
        </div>
    );
}
