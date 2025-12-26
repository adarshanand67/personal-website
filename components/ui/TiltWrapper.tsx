/**
 * @fileoverview Tilt Wrapper Component - 3D tilt effect on mouse movement.
 * Wraps children with interactive 3D tilt effect that follows mouse position.
 */

"use client";

import React, { useRef, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

/**
 * Props for TiltWrapper component.
 * @interface TiltWrapperProps
 * @property {React.ReactNode} children - Content to wrap with tilt effect
 * @property {string} [className] - Optional CSS classes
 * @property {number} [intensity=15] - Tilt intensity in degrees (default: 15)
 */
interface TiltWrapperProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

/**
 * Tilt Wrapper Component - interactive 3D tilt effect.
 * Applies smooth 3D rotation to children based on mouse position.
 * Uses spring physics for natural motion and resets on mouse leave.
 *
 * @component
 * @param {TiltWrapperProps} props - Component props
 * @returns {JSX.Element} Wrapped content with tilt effect
 *
 * @example
 * ```tsx
 * <TiltWrapper intensity={20} className="my-card">
 *   <div>Tiltable content</div>
 * </TiltWrapper>
 * ```
 */
export const TiltWrapper: React.FC<TiltWrapperProps> = ({
    children,
    className = "",
    intensity = 15,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useSpring(0, { stiffness: 400, damping: 30 });
    const y = useSpring(0, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            // Calculate normalized relative position (-0.5 to 0.5)
            const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
            const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

            x.set(relativeX);
            y.set(relativeY);
        },
        [x, y]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative ${className}`}
        >
            <div style={{ transform: "translateZ(20px)" }}>{children}</div>
        </motion.div>
    );
};
