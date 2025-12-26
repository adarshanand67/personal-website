"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { commands } from "@/lib/terminal/terminal";
import { introLines, directories } from "@/lib/constants";
import { mockFiles } from "@/lib/terminal/mockFileSystem";

/**
 * Terminal Hook - manages terminal state, intro animation, and drag functionality.
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
        files,
        setFiles,
    } = useStore();

    useEffect(() => {
        if (Object.keys(files).length === 0) {
            setFiles(mockFiles);
        }
    }, [files, setFiles]);

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
                    setTimeout(typeNextLine, 0);
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

/**
 * Command Executor Hook - executes terminal commands with context.
 */
export function useCommandExecutor() {
    const router = useRouter();
    const { setTheme } = useTheme();
    const {
        setLines,
        setHistory,
        setHistoryIndex,
        passwordMode,
        setPasswordMode,
        setInput,
        history,
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        clearTodos,
        files,
        setFiles,
        currentDir,
        setCurrentDir,
    } = useStore();

    const executeCommand = useCallback(
        async (cmd: string) => {
            if (passwordMode) {
                setPasswordMode(false);
                setLines((prev: string[]) => [...prev, "Checking permissions..."]);
                const success = ["admin123", "godmode", "trellix"].includes(cmd);
                setTimeout(() => {
                    setLines((prev: string[]) => [
                        ...prev,
                        success ? "Access Granted. Welcome, Administrator." : "Access Denied.",
                    ]);
                    if (success) setLines((prev: string[]) => [...prev, "Developer Mode: Enabled"]);
                }, 800);
                return;
            }

            if (cmd.trim()) {
                setHistory((prev) => [cmd, ...prev]);
                setHistoryIndex(-1);
            }

            setLines((prev) => [...prev, `$ ${cmd}`]);
            const pipeParts = cmd
                .split("|")
                .map((p) => p.trim())
                .filter((p) => p);
            if (pipeParts.length === 0) return;

            const context = {
                setPasswordMode,
                router,
                setTheme,
                setInput,
                history,
                todos,
                addTodo,
                toggleTodo,
                removeTodo,
                clearTodos,
                setLines: setLines as any,
                files,
                setFiles,
                currentDir,
                setCurrentDir,
            };

            try {
                for (const part of pipeParts) {
                    const parts = part.split(/\s+/);
                    const commandName = parts[0]?.toLowerCase();
                    const args = parts.slice(1);
                    if (commandName && commands[commandName]) {
                        await commands[commandName].execute(args, context);
                    } else if (commandName) {
                        setLines((prev: string[]) => [
                            ...prev,
                            `Command not found: ${commandName}`,
                        ]);
                    }
                }
            } catch (error) {
                setLines((prev: string[]) => [...prev, `Error executing command.`]);
            }
        },
        [
            passwordMode,
            setPasswordMode,
            setLines,
            setHistory,
            setHistoryIndex,
            router,
            setTheme,
            setInput,
            history,
            todos,
            addTodo,
            toggleTodo,
            removeTodo,
            clearTodos,
            files,
            setFiles,
            currentDir,
            setCurrentDir,
        ]
    );

    return { executeCommand };
}

/**
 * Keyboard Hook - handles terminal keyboard interactions.
 */
export function useKeyboard(executeCommand: (cmd: string) => void) {
    const { input, setInput, history, historyIndex, setHistoryIndex } = useStore();

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                executeCommand(input);
                setInput("");
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (history.length > 0 && historyIndex + 1 < history.length) {
                    const newIndex = historyIndex + 1;
                    setHistoryIndex(newIndex);
                    setInput(history[newIndex] || "");
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    setInput(history[newIndex] || "");
                } else if (historyIndex === 0) {
                    setHistoryIndex(-1);
                    setInput("");
                }
            } else if (e.key === "Tab") {
                e.preventDefault();
                const parts = input.split(" ");
                const isCommand = parts.length === 1;
                const currentToken = parts[parts.length - 1] || "";
                const cmd = parts[0]?.toLowerCase() || "";

                let candidates: string[] = isCommand
                    ? Object.keys(commands)
                    : ["cd", "open"].includes(cmd)
                      ? [...directories]
                      : [...Object.keys(mockFiles), ...directories];

                const matches = candidates.filter((c) =>
                    c.toLowerCase().startsWith(currentToken.toLowerCase())
                );
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0]!;
                    setInput(parts.join(" ") + (isCommand ? " " : ""));
                }
            }
        },
        [input, setInput, history, historyIndex, setHistoryIndex, executeCommand]
    );

    return { handleKeyDown };
}
