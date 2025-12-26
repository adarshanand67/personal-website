"use client";

import { useCallback } from "react";
import { useStore } from "@/lib/store/useStore";
import { commands } from "@/lib/terminal/commands";
import { directories } from "@/lib/constants";
import { mockFiles } from "@/lib/terminal/mockFileSystem";

/**
 * Keyboard Hook - handles terminal keyboard interactions.
 * Manages Enter (execute), Arrow Up/Down (history), and Tab (autocomplete).
 *
 * @param {Function} executeCommand - Command execution function
 * @returns {Object} Keyboard handlers
 * @returns {Function} returns.handleKeyDown - Keyboard event handler
 *
 * @example
 * ```tsx
 * const { handleKeyDown } = useKeyboard(executeCommand);
 * <input onKeyDown={handleKeyDown} />
 * ```
 */
export function useKeyboard(executeCommand: (cmd: string) => void) {
    const { input, setInput, history, historyIndex, setHistoryIndex, setLines } = useStore();

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
                // Basic tab completion logic
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
