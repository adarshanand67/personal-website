"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_MESSAGES = [
    "[INFO] Initializing quantum encryption module...",
    "[WARN] High latency detected in neural subsystem.",
    "[OK] Matrix synchronization complete.",
    "[INFO] Fetching latest blog updates from IPFS...",
    "[SEC] Unauthorized scan detected and blocked.",
    "[SYS] Kernel optimization in progress (Level 3)...",
    "[NET] Established secure tunnel to adarsh.dev",
    "[USER] Session verified: Adarsh Anand",
    "[INFO] Heartbeat 200 OK - All systems nominal.",
    "[DB] Indexing tech stack graph databases...",
    "[SCAN] Searching for hidden CTF flags...",
    "[OK] Coffee levels: [||||||----] 60%",
    "[INFO] Background matrix rain speed adjusted.",
    "[SYS] Purging unnecessary build artifacts...",
    "[NET] Packet loss: 0.001% - Stable connection."
];

export const SystemLogTicker = () => {
    const [currentLog, setCurrentLog] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLog(prev => (prev + 1) % LOG_MESSAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-4 left-8 z-40 h-6 overflow-hidden pointer-events-none select-none">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentLog}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[10px] font-mono text-gray-500/80 dark:text-gray-400/60 uppercase tracking-[0.2em]"
                    >
                        {LOG_MESSAGES[currentLog]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};
