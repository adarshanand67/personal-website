"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { introLines, directories } from "@/lib/constants";
import { commands } from "@/lib/terminal/commands";
import { mockFiles } from "@/lib/terminal/mockFileSystem";
import { SectionHeader } from "../ui/SectionHeader";

export function Terminal() {
    const router = useRouter();
    const { setTheme } = useTheme();

    const {
        lines, setLines,
        isIntroDone, setIsIntroDone,
        input, setInput,
        history, setHistory,
        historyIndex, setHistoryIndex,
        passwordMode, setPasswordMode,
        isExpanded, setIsExpanded,
        position, setPosition,
        isDragging, setIsDragging,
        todos, addTodo, toggleTodo, removeTodo, clearTodos
    } = useStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const initialPosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsExpanded(false);
        }
    }, [setIsExpanded]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines, isIntroDone]);

    useEffect(() => {
        if (!(globalThis as any)._terminalStartTime) {
            (globalThis as any)._terminalStartTime = Date.now();
        }

        if (!isIntroDone) {
            const allIntroLines = introLines();
            let currentLine = 0;

            const typeNextLine = () => {
                if (currentLine < allIntroLines.length) {
                    setLines(prev => [...prev, allIntroLines[currentLine]!]);
                    currentLine++;
                    // Faster for the neofetch part, slower for boot logs
                    const delay = currentLine > 14 ? 10 : 30;
                    setTimeout(typeNextLine, delay);
                } else {
                    setIsIntroDone(true);
                }
            };

            typeNextLine();
        }
    }, [isIntroDone, setLines, setIsIntroDone]);

    const executeCommand = async (cmd: string) => {
        if (passwordMode) {
            setPasswordMode(false);
            setLines((prev: string[]) => [...prev, "Checking permissions..."]);
            if (cmd === "admin123" || cmd === "godmode" || cmd === "trellix") {
                setTimeout(() => {
                    setLines((prev: string[]) => [...prev, "Access Granted. Welcome, Administrator.", "Developer Mode: Enabled"]);
                }, 800);
            } else {

                setTimeout(() => {
                    setLines((prev: string[]) => [...prev, "Access Denied."]);
                }, 800);
            }
            return;
        }

        if (cmd.trim()) {
            setHistory((prev) => [cmd, ...prev]);
            setHistoryIndex(-1);
        }

        setLines((prev) => [...prev, `$ ${cmd}`]);
        const pipeParts = cmd.split('|').map(p => p.trim()).filter(p => p);
        if (pipeParts.length === 0) return;

        let currentInput: string | undefined = undefined;
        const baseContext = {
            setPasswordMode,
            router,
            setTheme,
            toggleMatrix: useStore.getState().toggleMatrix,
            setInput,
            history,
            todos,
            addTodo,
            toggleTodo,
            removeTodo,
            clearTodos
        };

        try {
            for (let i = 0; i < pipeParts.length; i++) {
                const part = pipeParts[i];
                const parts = part.trim().split(/\s+/);
                const commandName = parts[0]?.toLowerCase() || '';
                const args = parts.slice(1);

                if (!commandName) continue;

                const command = commands[commandName];
                if (!command) {
                    setLines((prev: string[]) => [...prev, `Command not found: ${commandName}`]);
                    return;
                }

                if (i < pipeParts.length - 1) {
                    let captured: string[] = [];
                    const mockSetLines: React.Dispatch<React.SetStateAction<string[]>> = (action) => {
                        if (typeof action === 'function') {
                            captured = action(captured);
                        } else {
                            if (Array.isArray(action)) {
                                captured = [...captured, ...action];
                            } else {
                                captured = [...captured, action as string];
                            }
                        }
                    };

                    const context = { ...baseContext, setLines: mockSetLines };
                    await command.execute(args, context, currentInput);
                    currentInput = captured.join('\n');
                } else {
                    const context = { ...baseContext, setLines: setLines as any };
                    await command.execute(args, context, currentInput);
                }
            }
        } catch (error) {
            console.error("Exec error", error);
            setLines((prev: string[]) => [...prev, `Error executing command.`]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < history.length) {
                    setHistoryIndex(newIndex);
                    setInput(history[newIndex] || '');
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex] || '');
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const parts = input.split(" ");
            const isCommand = parts.length === 1;
            const currentToken = parts[parts.length - 1] || '';
            const cmd = parts[0]?.toLowerCase() || '';

            let candidates: string[] = [];
            if (isCommand) {
                candidates = Object.keys(commands);
            } else {
                if (['cd', 'open'].includes(cmd)) {
                    candidates = [...directories];
                } else {
                    candidates = [...Object.keys(mockFiles), ...directories];
                }
            }

            if (candidates.length > 0) {
                const matches = candidates.filter((c) => c.toLowerCase().startsWith(currentToken.toLowerCase()));
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0]!;
                    setInput(parts.join(" ") + (isCommand ? " " : ""));
                } else if (matches.length > 1) {
                    let prefix = matches[0] || '';
                    const lowerPrefix = () => prefix.toLowerCase();
                    for (let i = 1; i < matches.length; i++) {
                        while (!matches[i]!.toLowerCase().startsWith(lowerPrefix())) {
                            prefix = prefix.substring(0, prefix.length - 1);
                            if (prefix === "") break;
                        }
                    }
                    if (prefix.length > currentToken.length) {
                        parts[parts.length - 1] = prefix;
                        setInput(parts.join(" "));
                    } else {
                        setLines((prev) => [...prev, `$ ${input}`, matches.join("  ")]);
                    }
                }
            }
        }
    };

    const handleDragStart = (e: React.MouseEvent) => {
        if (!isExpanded) return;
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        initialPosRef.current = { ...position };
    };

    useEffect(() => {
        const handleDrag = (e: MouseEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - dragStartRef.current.x;
            const dy = e.clientY - dragStartRef.current.y;
            setPosition({
                x: initialPosRef.current.x + dx,
                y: initialPosRef.current.y + dy
            });
        };

        const handleDragEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', handleDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, setPosition, setIsDragging]);

    const handleTerminalWrapperClick = (_e: React.MouseEvent) => {
        if (!isExpanded) return;
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            return;
        }
        if (isDragging) return;
        if (isIntroDone) {
            inputRef.current?.focus();
        }
    };

    const parseAnsi = (text: string) => {
        const ansiColors: Record<string, string> = {
            '30': 'text-black',
            '31': 'text-red-500',
            '32': 'text-green-500',
            '33': 'text-yellow-500',
            '34': 'text-blue-500',
            '35': 'text-purple-500',
            '36': 'text-cyan-500',
            '37': 'text-white',
            '90': 'text-gray-500',
            '1': 'font-bold',
            '0': '',
        };

        const parts = text.split(/(\x1b\[\d+m)/g);
        let currentColor = '';

        return parts.map((part, idx) => {
            const match = part.match(/\x1b\[(\d+)m/);
            if (match) {
                currentColor = ansiColors[match[1]] || '';
                return null;
            }
            if (!part) return null;
            return currentColor ? (
                <span key={idx} className={currentColor}>{part}</span>
            ) : part;
        }).filter(Boolean);
    };

    return (
        <div
            className="w-full max-w-7xl relative"
            onClick={handleTerminalWrapperClick}
        >
            <div className="relative glass rounded-xl p-4 hover:border-green-500/50 transition-colors duration-300">
                <section className="font-mono">
                    <SectionHeader
                        title="Terminal"
                        isExpanded={isExpanded}
                        onToggle={() => setIsExpanded(!isExpanded)}
                    />
                    <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <div
                            className={`w-full bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 text-sm select-text relative ${isDragging ? 'cursor-grabbing z-50 shadow-green-500/20' : ''}`}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px)`,
                                transition: isDragging ? 'none' : 'transform 0.1s ease-out, opacity 0.5s ease-in-out',
                                fontFamily: "'JetBrains Mono', 'SF Mono', SFMono-Regular, ui-monospace, monospace",
                                letterSpacing: "0.02em"
                            }}
                        >
                            <div
                                onMouseDown={handleDragStart}
                                className="bg-white/50 dark:bg-white/5 px-4 h-8 flex items-center gap-2 border-b border-white/20 dark:border-white/10 cursor-grab active:cursor-grabbing select-none"
                            >
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
                                <span className="ml-2 text-gray-600 dark:text-gray-400 text-xs font-medium opacity-80">adarsh@linux:~</span>
                            </div>
                            <div
                                ref={containerRef}
                                className="p-4 text-gray-800 dark:text-gray-300 h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
                            >
                                {lines.map((line, i) => (
                                    <div
                                        key={i}
                                        className={`whitespace-pre leading-snug tracking-wide ${line.startsWith('$ ') ? 'text-green-600 dark:text-green-400 font-semibold' : ''}`}
                                    >
                                        {line.includes('\x1b[') ? parseAnsi(line) : line}
                                    </div>
                                ))}

                                {isIntroDone && (
                                    <div className="flex items-center">
                                        <span className="mr-2 text-green-600 dark:text-green-400 font-bold">$</span>
                                        <input
                                            ref={inputRef}
                                            type={passwordMode ? "password" : "text"}
                                            value={input}
                                            onBlur={(_e) => {
                                                setInput(_e.target.value)
                                            }}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="bg-transparent border-none outline-none text-green-600 dark:text-green-400 flex-grow font-medium focus:ring-0 focus:outline-none"
                                            autoFocus
                                            spellCheck={false}
                                            autoComplete="off"
                                            placeholder={passwordMode ? "●●●●●●●●" : ""}
                                        />
                                        {passwordMode && input.length === 0 && (
                                            <span className="animate-pulse text-green-600 dark:text-green-400">▊</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
