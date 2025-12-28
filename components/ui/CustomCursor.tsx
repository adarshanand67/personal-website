/**
 * @fileoverview Custom Cursor Component - smooth animated cursor with spring physics.
 * Replaces default cursor with a custom design featuring smooth spring animations.
 * Automatically hidden on touch devices.
 */

"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Custom Cursor Component - animated cursor with spring physics.
 * Features smooth spring-based motion tracking, mix-blend-difference effect,
 * and automatic hiding on touch devices.
 *

 * @returns {JSX.Element | null} Rendered custom cursor or null on touch devices
 *
 * @example
 * ```tsx
 * <CustomCursor />
 * ```
 */
export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null; // Don't show on touch devices
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] mix-blend-difference"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="w-full h-full bg-white rounded-full border border-white/20 scale-100 group-hover:scale-150 transition-transform duration-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400/80 rounded-full" />
        </motion.div>
    );
}
