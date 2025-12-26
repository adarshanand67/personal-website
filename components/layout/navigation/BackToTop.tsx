"use client";

import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Back to Top Button Component - floating button to scroll to page top.
 * Appears when user scrolls down >400px, animates in/out smoothly.
 * Fixed position in bottom-left corner with smooth scroll behavior.
 * @component
 */
export function BackToTop() {
    const { isBackToTopVisible, setIsBackToTopVisible } = useStore();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsBackToTopVisible(true);
            } else {
                setIsBackToTopVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [setIsBackToTopVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isBackToTopVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 left-8 z-50 group"
                    aria-label="Back to top"
                >
                    <div className="relative">
                        <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-all" />
                        <div className="relative w-12 h-12 flex items-center justify-center bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-full shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                            <ArrowUp
                                size={20}
                                className="text-gray-600 dark:text-gray-300 group-hover:text-green-500 transition-colors"
                            />
                        </div>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
