"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

interface SectionHeaderProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
}

export function SectionHeader({
    title,
    isExpanded,
    onToggle,
    rightElement,
}: SectionHeaderProps) {
    return (
        <div
            className="w-full text-left group mb-3 cursor-pointer"
            onClick={onToggle}
        >
            <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                {title}
                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                />
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </h2>
        </div>
    );
}

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


