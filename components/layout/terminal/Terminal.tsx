"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { SectionHeader } from "../ui/SectionHeader";
import { parseAnsi } from "@/lib/terminal/ansi";
import { useTerminal, useCommandExecutor, useKeyboard } from "./terminalHooks";

/**
 * Terminal Header Component - macOS-style terminal window header.
 */
function TerminalHeader({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
    return (
        <div
            onMouseDown={onMouseDown}
            className="bg-white/50 dark:bg-white/5 px-4 h-8 flex items-center gap-2 border-b border-white/20 dark:border-white/10 cursor-grab active:cursor-grabbing select-none"
        >
            <div className="w-3 h-3 rounded-full bg-foreground/10 shadow-sm border border-foreground/5"></div>
            <div className="w-3 h-3 rounded-full bg-foreground/10 shadow-sm border border-foreground/5"></div>
            <div className="w-3 h-3 rounded-full bg-foreground/10 shadow-sm border border-foreground/5"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-xs font-medium opacity-80">
                adarsh@linux:~
            </span>
        </div>
    );
}

/**
 * Terminal Content Component - scrollable terminal output and input area.
 */
function TerminalContent({
    lines,
    isIntroDone,
    passwordMode,
    input,
    containerRef,
    inputRef,
    handleKeyDown,
    onChange,
    onBlur,
}: {
    lines: string[];
    isIntroDone: boolean;
    passwordMode: boolean;
    input: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
    return (
        <div
            ref={containerRef}
            className="p-4 text-gray-800 dark:text-gray-300 h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
            {lines.map((line, i) => (
                <div
                    key={i}
                    className={`whitespace-pre leading-snug tracking-wide ${line.startsWith("$ ") ? "text-foreground font-bold" : ""}`}
                >
                    {line.includes("\x1b[") ? parseAnsi(line) : line}
                </div>
            ))}

            {isIntroDone && (
                <div className="flex items-center">
                    <span className="mr-2 text-foreground font-bold">$</span>
                    <input
                        ref={inputRef}
                        type={passwordMode ? "password" : "text"}
                        value={input}
                        onBlur={onBlur}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-foreground flex-grow font-medium focus:ring-0 !focus:outline-none !focus-visible:ring-0 !focus-visible:outline-none"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        placeholder={passwordMode ? "●●●●●●●●" : ""}
                    />
                    {passwordMode && input.length === 0 && (
                        <span className="animate-pulse text-foreground">▊</span>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Terminal Component - interactive command-line interface.
 * Features draggable window, command execution, and password mode.
 * @component
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
