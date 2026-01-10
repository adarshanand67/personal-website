"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store";
import { SectionHeader } from "./SectionHeader"; // Local import
import { introLines, directories } from "@/lib/constants";
import { parseAnsi } from "@/lib/utils";
import { commands, mockFiles } from "@/lib/terminal/data";

function useTerminal() {
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
          setLines((prev: string[]) => [...prev, allIntroLines[currentLine]!]);
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
    [isExpanded, position, setIsDragging],
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

function useCommandExecutor() {
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
            success
              ? "Access Granted. Welcome, Administrator."
              : "Access Denied.",
          ]);
          if (success)
            setLines((prev: string[]) => [...prev, "Developer Mode: Enabled"]);
        }, 800);
        return;
      }

      if (cmd.trim()) {
        setHistory((prev: string[]) => [cmd, ...prev]);
        setHistoryIndex(-1);
      }
      setLines((prev: string[]) => [...prev, `$ ${cmd}`]);
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
          await commands[commandName].execute(args, context, undefined);
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
    ],
  );

  return { executeCommand };
}

function useKeyboard(executeCommand: (cmd: string) => void) {
  const { input, setInput, history, historyIndex, setHistoryIndex } =
    useStore();
  return {
    handleKeyDown: useCallback(
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
          const currentToken = parts[parts.length - 1] || "";
          const cmd = parts[0]?.toLowerCase() || "";
          let candidates =
            parts.length === 1
              ? Object.keys(commands)
              : ["cd", "open"].includes(cmd)
                ? [...directories]
                : [...Object.keys(mockFiles), ...directories];
          const matches = candidates.filter((c) =>
            c.toLowerCase().startsWith(currentToken.toLowerCase()),
          );
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0]!;
            setInput(parts.join(" ") + (parts.length === 1 ? " " : ""));
          }
        }
      },
      [input, setInput, history, historyIndex, setHistoryIndex, executeCommand],
    ),
  };
}

function TerminalHeader({
  onMouseDown,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="bg-zinc-100/90 dark:bg-zinc-900/90 px-4 h-8 flex items-center gap-2 border-b border-zinc-200/50 dark:border-white/5 cursor-grab active:cursor-grabbing select-none rounded-t-xl"
    >
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-90 transition-all shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-90 transition-all shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:brightness-90 transition-all shadow-sm" />
      </div>
      <div className="flex-1 text-center pr-12">
        <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold font-mono opacity-80 flex items-center justify-center gap-1.5">
          <span className="w-3 h-3">📁</span> adarsh — -zsh
        </span>
      </div>
    </div>
  );
}

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
}: any) {
  return (
    <div
      ref={containerRef}
      className="p-6 text-gray-800 dark:text-gray-200 h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent font-mono text-sm"
    >
      {lines.map((line: string, i: number) => (
        <div
          key={i}
          className={`whitespace-pre leading-relaxed tracking-wide ${line.startsWith("$ ") ? "text-foreground font-bold" : ""}`}
        >
          {line.startsWith("$ ") ? (
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">➜</span>
              <span className="text-cyan-500 font-bold">~</span>
              <span className="text-foreground">{line.substring(2)}</span>
            </div>
          ) : (
            <div
              className={`${line.includes("Error") ? "text-red-400" : "opacity-90"}`}
              dangerouslySetInnerHTML={
                line.includes("\x1b[") ? { __html: parseAnsi(line) } : undefined
              }
            >
              {!line.includes("\x1b[") && line}
            </div>
          )}
        </div>
      ))}
      {isIntroDone && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-500 font-bold">➜</span>
          <span className="text-cyan-500 font-bold">~</span>
          <input
            ref={inputRef}
            type={passwordMode ? "password" : "text"}
            value={input}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-foreground flex-grow font-bold focus:ring-0 p-0 ml-1"
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
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines, isIntroDone, containerRef]);

  return (
    <div
      className="w-full max-w-7xl relative"
      onClick={() =>
        isExpanded && !isDragging && isIntroDone && inputRef.current?.focus()
      }
    >
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
                fontFamily:
                  "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
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
                onChange={(e: any) => setInput(e.target.value)}
                onBlur={(e: any) => setInput(e.target.value)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
