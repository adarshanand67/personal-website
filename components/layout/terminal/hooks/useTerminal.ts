"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStore } from "@/lib/store/useStore";
import { introLines } from "@/lib/constants";

/**
 * Terminal Hook - manages terminal state, intro animation, and drag functionality.
 * Handles terminal initialization, intro sequence typing effect, and window dragging.
 *
 * @returns {Object} Terminal utilities
 * @returns {Function} returns.handleDragStart - Mouse down handler for drag functionality
 * @returns {React.RefObject<HTMLInputElement>} returns.inputRef - Ref for input element
 * @returns {React.RefObject<HTMLDivElement>} returns.containerRef - Ref for container element
 *
 * @example
 * ```tsx
 * const { handleDragStart, inputRef, containerRef } = useTerminal();
 * ```
 */
export function useTerminal() {
    const {
        setLines,
        isIntroDone,
        setIsIntroDone,
        isExpanded,
        position,
        setPosition,
        isDragging,
        setIsDragging,
    } = useStore();

    const dragStartRef = useRef({ x: 0, y: 0 });
    const initialPosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!isIntroDone) {
            const allIntroLines = introLines();
            let currentLine = 0;
            const typeNextLine = () => {
                if (currentLine < allIntroLines.length) {
                    setLines((prev) => [...prev, allIntroLines[currentLine]!]);
                    currentLine++;
                    const delay = 5;
                    setTimeout(typeNextLine, delay);
                } else {
                    setIsIntroDone(true);
                }
            };
            typeNextLine();
        }
    }, [isIntroDone, setLines, setIsIntroDone]);

    const handleDragStart = useCallback(
        (e: React.MouseEvent) => {
            if (!isExpanded) return;
            setIsDragging(true);
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            initialPosRef.current = { ...position };
        },
        [isExpanded, position, setIsDragging]
    );

    useEffect(() => {
        const handleDrag = (e: MouseEvent) => {
            if (!isDragging) return;
            setPosition({
                x: initialPosRef.current.x + (e.clientX - dragStartRef.current.x),
                y: initialPosRef.current.y + (e.clientY - dragStartRef.current.y),
            });
        };
        const handleDragEnd = () => setIsDragging(false);
        if (isDragging) {
            window.addEventListener("mousemove", handleDrag);
            window.addEventListener("mouseup", handleDragEnd);
        }
        return () => {
            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup", handleDragEnd);
        };
    }, [isDragging, setPosition, setIsDragging]);

    return {
        handleDragStart,
        inputRef: useRef<HTMLInputElement>(null),
        containerRef: useRef<HTMLDivElement>(null),
    };
}
