/**
 * @fileoverview Scroll Progress Component - visual scroll position indicator.
 * Displays a gradient progress bar at the top of the page showing scroll progress.
 */

"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Scroll Progress Component - animated scroll position indicator.
 * Renders a fixed gradient bar at the top of the page that fills horizontally
 * as the user scrolls down. Uses spring physics for smooth animations.
 *

 * @returns {JSX.Element} Rendered scroll progress bar
 *
 * @example
 * ```tsx
 * <ScrollProgress />
 * ```
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-800 z-[10001] origin-left"
            style={{ scaleX }}
        />
    );
}
