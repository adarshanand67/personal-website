"use client";
import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";

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
