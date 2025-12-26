"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

/**
 * Props for SectionHeader component.
 * @interface SectionHeaderProps
 * @property {string} title - Section title text
 * @property {boolean} isExpanded - Whether section is expanded
 * @property {Function} onToggle - Callback when header is clicked
 * @property {React.ReactNode} [rightElement] - Optional element to display on the right side
 */
interface SectionHeaderProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
}

/**
 * Section Header Component - collapsible section header with animated chevron.
 * Features green accent bar, hover effects, and optional right-side element.
 * @component
 * @param {SectionHeaderProps} props - Component props
 */
export function SectionHeader({ title, isExpanded, onToggle, rightElement }: SectionHeaderProps) {
    return (
        <div className="w-full text-left group mb-2 cursor-pointer" onClick={onToggle}>
            <div className="flex items-center gap-3 mb-1">
                <div
                    className={`h-6 w-1 rounded-full bg-green-500 transition-all duration-300 ${isExpanded ? "scale-y-100" : "scale-y-50 opacity-50"}`}
                />
                <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
                    {title}
                    <ChevronDown
                        size={20}
                        className={`transition-all duration-500 ${isExpanded ? "rotate-180" : "-rotate-90 opacity-40"}`}
                    />
                </h2>
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </div>
        </div>
    );
}

/**
 * Spotlight Card Component - interactive card with mouse-tracking spotlight effect.
 * Creates a radial gradient that follows the mouse cursor for premium visual feedback.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.spotlightColor] - Spotlight gradient color (default: green)
 *
 * @example
 * ```tsx
 * <SpotlightCard className="p-6">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </SpotlightCard>
 * ```
 */
export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(34, 197, 94, 0.15)",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty("--mouse-x", `${x}px`);
        divRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`
                relative overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-800/50 
                bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm transition-all hover:shadow-lg 
                group/spotlight ${className}
            `}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative h-full z-10">{children}</div>
        </div>
    );
};
