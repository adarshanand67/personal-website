"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { SectionHeader } from "../ui/SectionHeader";
import { useTerminal } from "./hooks/useTerminal";
import { useCommandExecutor } from "./hooks/useCommandExecutor";
import { useKeyboard } from "./hooks/useKeyboard";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalContent } from "./TerminalContent";

/**
 * Terminal Component - interactive command-line interface.
 * Features draggable window, command execution, and password mode.

 */
export function Terminal() {
    const {
        lines,
        isIntroDone,
        input,
        setInput,
        passwordMode,
        isExpanded,
        setIsExpanded,
        position,
        isDragging,
    } = useStore();

    const { handleDragStart, inputRef, containerRef } = useTerminal();
    const { executeCommand } = useCommandExecutor();
    const { handleKeyDown } = useKeyboard(executeCommand);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines, isIntroDone, containerRef]);

    const handleWrapperClick = () => {
        if (!isExpanded || isDragging) return;
        if (isIntroDone && !window.getSelection()?.toString()) {
            inputRef.current?.focus();
        }
    };

    return (
        <div className="w-full max-w-7xl relative" onClick={handleWrapperClick}>
            <div className="relative glass rounded-xl p-4 transition-all duration-300">
                <section className="font-mono">
                    <SectionHeader
                        title="Terminal"
                        isExpanded={isExpanded}
                        onToggle={() => setIsExpanded(!isExpanded)}
                    />
                    <div
                        className={`transition-all duration-500 ease-in-out ${isExpanded ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}
                    >
                        <div
                            className={`w-full bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 text-sm select-text relative z-10 ${isDragging ? "cursor-grabbing z-50 shadow-foreground/20" : ""}`}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px)`,
                                transition: isDragging
                                    ? "none"
                                    : "transform 0.1s ease-out, opacity 0.5s ease-in-out",
                                fontFamily: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
                            }}
                        >
                            <TerminalHeader onMouseDown={handleDragStart} />
                            <TerminalContent
                                lines={lines}
                                isIntroDone={isIntroDone}
                                passwordMode={passwordMode}
                                input={input}
                                containerRef={containerRef}
                                inputRef={inputRef}
                                handleKeyDown={handleKeyDown}
                                onChange={(e) => setInput(e.target.value)}
                                onBlur={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
