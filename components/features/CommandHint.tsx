"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export const CommandHint = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenHint = localStorage.getItem("hasSeenCommandHint");
        if (!hasSeenHint) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                localStorage.setItem("hasSeenCommandHint", "true");
            }, 5000);

            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 12000);

            return () => {
                clearTimeout(timer);
                clearTimeout(hideTimer);
            };
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-32 right-8 z-[100] pointer-events-none"
                >
                    <div className="glass px-6 py-3 rounded-2xl border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.2)] flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Terminal className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Quick Hack</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Press</span>
                                <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold">⌘</kbd>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">+</span>
                                <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold">K</kbd>
                                <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">to explore</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
