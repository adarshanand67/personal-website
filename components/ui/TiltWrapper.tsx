"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface TiltWrapperProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export const TiltWrapper: React.FC<TiltWrapperProps> = ({
    children,
    className = "",
    intensity = 15
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useSpring(0, { stiffness: 400, damping: 30 });
    const y = useSpring(0, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate normalized relative position (-0.5 to 0.5)
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(relativeX);
        y.set(relativeY);
    }, [x, y]);

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
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};
