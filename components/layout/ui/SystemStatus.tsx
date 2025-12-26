"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { SystemStatusLabel } from "@/data/enums";

/**
 * System Status Component - displays real-time IST clock, dynamic status, and location.
 * Status automatically updates based on time of day:
 * - 0:00-7:00: Sleeping 😴
 * - 9:00-18:00: Coding 💻
 * - Other times: Available ✅
 *
 * @component
 * @returns {JSX.Element} Animated status badges showing time, activity, and location
 */
export function SystemStatus() {
    const [time, setTime] = useState("");
    const [status, setStatus] = useState<SystemStatusLabel>(SystemStatusLabel.Available);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(istTime);

            // Dynamic status based on IST time
            const hour = now.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                hour12: false,
            });
            const h = parseInt(hour);
            if (h >= 0 && h < 7) setStatus(SystemStatusLabel.Sleeping);
            else if (h >= 9 && h < 18) setStatus(SystemStatusLabel.Coding);
            else setStatus(SystemStatusLabel.Available);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center md:items-start gap-3 mt-6"
        >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20">
                <Clock size={14} className="text-black dark:text-gray-400" />
                <span className="text-[11px] font-mono font-black text-foreground/60 tabular-nums uppercase tracking-widest">
                    {time} IST
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20">
                <Activity size={14} className="text-black dark:text-gray-400" />
                <span className="text-[11px] font-mono font-black text-foreground/60 uppercase tracking-widest">
                    {status}
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20">
                <MapPin size={14} className="text-black dark:text-gray-400" />
                <span className="text-[11px] font-mono font-black text-foreground/60 uppercase tracking-widest">
                    Bengaluru, IN
                </span>
            </div>
        </motion.div>
    );
}
