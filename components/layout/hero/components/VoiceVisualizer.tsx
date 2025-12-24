/**
 * @fileoverview Voice Visualizer Component - animated audio waveform visualization.
 * Displays animated bars simulating an audio waveform with "Deep Voice Optimized" label.
 */

import { motion } from "framer-motion";

/**
 * Voice Visualizer Component - animated audio waveform bars.
 * Renders 12 animated bars with staggered delays to create a waveform effect.
 * Includes "Deep Voice Optimized" label and opacity transitions on hover.
 * 
 * @component
 * @returns {JSX.Element} Rendered voice visualizer with animated bars
 * 
 * @example
 * ```tsx
 * <VoiceVisualizer />
 * ```
 */
export function VoiceVisualizer() {
    return (
        <div className="flex items-center gap-1 h-8 opacity-40 group-hover/container:opacity-100 transition-opacity duration-1000">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: [8, 24, 12, 32, 8],
                        opacity: [0.3, 1, 0.5, 1, 0.3]
                    }}
                    transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1
                    }}
                    className="w-1 bg-green-500 rounded-full"
                />
            ))}
            <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-green-600 dark:text-green-400">Deep Voice Optimized</span>
        </div>
    );
}
