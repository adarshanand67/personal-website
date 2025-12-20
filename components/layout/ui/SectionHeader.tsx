"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

interface SectionHeaderProps {
    title: string;
    command: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
}

export function SectionHeader({
    title,
    command,
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
                <span className="text-primary">##</span>
                {title}
                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                />
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <span className="text-green-500 font-bold">$</span>
                <span>{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
            </div>
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

export function TerminalCursor() {
    const {
        cursorPosition,
        setCursorPosition,
        isCursorVisible,
        setIsCursorVisible,
        isCursorClicking,
        setIsCursorClicking,
        isCursorPointer,
        setIsCursorPointer
    } = useStore();

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
            if (!isCursorVisible) setIsCursorVisible(true);
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setIsCursorPointer(isClickable);
        };
        const handleMouseDown = () => setIsCursorClicking(true);
        const handleMouseUp = () => setIsCursorClicking(false);
        document.documentElement.style.cursor = 'none';
        const handleMouseEnter = () => setIsCursorVisible(true);
        const handleMouseLeave = () => setIsCursorVisible(false);
        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.style.cursor = 'auto';
        };
    }, [isCursorVisible, setCursorPosition, setIsCursorVisible, setIsCursorClicking, setIsCursorPointer]);

    if (!isCursorVisible) return null;
    return (
        <div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div
                className={`bg-green-500 transition-all duration-150 ease-out border border-green-400/50 shadow-[0_0_10px_rgba(34,197,94,0.5)] ${isCursorClicking
                    ? "w-3 h-3 scale-90"
                    : isCursorPointer
                        ? "w-6 h-6 rotate-45 opacity-80"
                        : "w-4 h-6 opacity-80 animate-pulse"
                    }`}
            />
        </div>
    );
}
