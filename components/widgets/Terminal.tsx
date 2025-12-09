"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toLeetSpeak } from "@/lib/utils/leet";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { commands } from "@/lib/terminal/commands";
import { INTRO_LINES, DIRECTORIES } from "@/lib/constants";

export default function Terminal() {
  const router = useRouter();
  const { setTheme } = useTheme();
  // Import audio controls
  const {
    toggleMatrix, isMatrixEnabled,
    setIsPlaying, nextTrack, prevTrack, toggleMute
  } = useGlobalState();

  const [lines, setLines] = useState<string[]>([]);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [passwordMode, setPasswordMode] = useState(false); // For sudo

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMatrixEnabled) {
      setLines(prev => [...prev, "Matrix: Activated."]);
    }
  }, [isMatrixEnabled]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, isIntroDone]);

  // Intro Typing Effect
  useEffect(() => {
    if (!isIntroDone) {
      setLines([...INTRO_LINES(toLeetSpeak)]);
      setIsIntroDone(true);
    }
  }, [isIntroDone]);

  const executeCommand = (cmd: string) => {
    // Password mode handling (KEEPING IN COMPONENT FOR NOW for simplicity of state)
    if (passwordMode) {
      setPasswordMode(false);
      setLines((prev) => [...prev, "Checking permissions..."]);

      if (cmd === "admin123" || cmd === "godmode" || cmd === "trellix") {
        setTimeout(() => {
          setLines((prev) => [...prev, "Access Granted. Welcome, Administrator.", "God Mode: Enabled (Matrix Rain toggled)"]);
          if (!isMatrixEnabled) toggleMatrix();
        }, 800);
      } else {
        setTimeout(() => {
          setLines((prev) => [...prev, "Access Denied."]);
        }, 800);
      }
      return;
    }

    // Add to history
    if (cmd.trim()) {
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
    }

    const parts = cmd.trim().split(/\s+/);
    const commandName = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    if (!commandName) return;

    const newLines = [...lines, `$ ${cmd}`];
    // Immediate state update for the command echo, then let command logic append more
    setLines(newLines);

    const command = commands[commandName];
    if (command) {
      // Execute command
      command.execute(args, {
        setLines,
        setPasswordMode,
        router,
        setTheme,
        isMatrixEnabled,
        toggleMatrix,
        setIsPlaying,
        nextTrack,
        prevTrack,
        toggleMute,
        setInput
      });
    } else {
      setLines(prev => [...prev, `Command not found: ${commandName}. Type 'help' for options.`]);
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

      // If we are at the command part (first word, no space yet or just started typing it)
      const isCommand = parts.length === 1;
      const currentToken = parts[parts.length - 1] || '';

      let candidates: string[] = [];
      const cmd = parts[0]?.toLowerCase() || '';

      if (isCommand) {
        candidates = Object.keys(commands);
      } else if ((cmd === "cd" || cmd === "open") && parts.length === 2) {
        candidates = [...DIRECTORIES];
      }

      if (candidates.length > 0) {
        const matches = [...DIRECTORIES].filter((dir) => dir.startsWith(currentToken.toLowerCase()));

        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0]!;
          setInput(parts.join(" ") + " ");
        } else if (matches.length > 1) {
          // Find common prefix
          let prefix: string = matches[0] || '';
          for (let i = 1; i < matches.length; i++) {
            while (!matches[i]!.startsWith(prefix)) {
              prefix = prefix.substring(0, prefix.length - 1);
              if (prefix === "") break;
            }
          }

          if (prefix.length > currentToken.length) {
            parts[parts.length - 1] = prefix;
            setInput(parts.join(" "));
          }
        }
      }
    }
  };

  const handleTerminalClick = () => {
    if (isIntroDone) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="w-full max-w-2xl bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden border border-gray-800 font-mono text-base my-8 cursor-text relative group"
      onClick={handleTerminalClick}
    >
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-400 text-sm">adarsh@linux:~</span>
      </div>
      <div
        ref={containerRef}
        className="p-6 text-gray-300 dark:text-gray-200 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`mb-1 whitespace-pre-wrap ${line.startsWith('$ ') ? 'text-green-400' : ''}`}
          >
            {line}
          </div>
        ))}

        {isIntroDone && (
          <div className="flex items-center">
            <span className="mr-2 text-green-400">$</span>
            <input
              ref={inputRef}
              type={passwordMode ? "password" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-green-400 flex-grow"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              placeholder={passwordMode ? "●●●●●●●●" : ""}
            />
            {passwordMode && input.length === 0 && (
              <span className="animate-pulse text-green-400">▊</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
