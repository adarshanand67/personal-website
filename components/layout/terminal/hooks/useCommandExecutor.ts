"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { commands } from "@/lib/terminal/commands";

/**
 * Command Executor Hook - executes terminal commands with context.
 * Handles password mode, command history, piping, and error handling.
 *
 * @returns {Object} Command executor
 * @returns {Function} returns.executeCommand - Async command execution function
 *
 * @example
 * ```tsx
 * const { executeCommand } = useCommandExecutor();
 * await executeCommand("ls -la");
 * ```
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

            let currentInput: string | undefined = undefined;
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
            };

            try {
                for (const part of pipeParts) {
                    const parts = part.split(/\s+/);
                    const commandName = parts[0]?.toLowerCase();
                    const args = parts.slice(1);
                    if (!commandName || !commands[commandName]) {
                        if (commandName)
                            setLines((prev: string[]) => [
                                ...prev,
                                `Command not found: ${commandName}`,
                            ]);
                        continue;
                    }
                    await commands[commandName].execute(args, context, currentInput);
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
        ]
    );

    return { executeCommand };
}
