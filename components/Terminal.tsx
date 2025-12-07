"use client";

import { useState, useEffect, useRef } from "react";
import { toLeetSpeak } from "@/lib/utils/leet";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const introLines = [
    "> ./adarsh_profile.exe",
    "> Initializing SDE protocol...",
    "> Loading modules: C++, Rust...",
    `> ${toLeetSpeak("Access granted. Type 'help' for commands.")}`,
  ];

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentText, isIntroDone]);

  // Focus input on click
  const handleTerminalClick = () => {
    if (isIntroDone) {
      inputRef.current?.focus();
    }
  };

  // Intro Typing Effect
  useEffect(() => {
    if (currentLineIndex >= introLines.length) {
      setIsIntroDone(true);
      return;
    }

    const targetLine = introLines[currentLineIndex];
    if (currentText.length < targetLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetLine.slice(0, currentText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, targetLine]);
        setCurrentText("");
        setCurrentLineIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentLineIndex, introLines]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      const newLines = [...lines, `$ ${input}`];

      switch (cmd) {
        case "help":
          newLines.push(
            "Available commands:",
            "  help    - Show this menu",
            "  whoami  - Display profile info",
            "  ls      - List shelf directories",
            "  clear   - Clear terminal",
            "  contact - Show contact info"
          );
          break;
        case "whoami":
          newLines.push("Adarsh Anand | SDE @Trellix | Security & Systems Enthusiast");
          break;
        case "ls":
          newLines.push(
            "drwxr-xr-x  blogs/",
            "drwxr-xr-x  papers/",
            "drwxr-xr-x  books/",
            "drwxr-xr-x  anime/"
          );
          break;
        case "clear":
          setLines([]);
          setInput("");
          return;
        case "contact":
          newLines.push("Email: adarshan20302@gmail.com", "LinkedIn: /in/adarshanand67");
          break;
        case "":
          break;
        default:
          newLines.push(`Command not found: ${cmd}. Type 'help' for options.`);
      }

      setLines(newLines);
      setInput("");
    }
  };

  return (
    <div
      className="w-full max-w-lg bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden border border-gray-800 font-mono text-sm my-6 cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-400 text-xs">adarsh@linux:~</span>
      </div>
      <div
        ref={containerRef}
        className="p-4 text-green-400 h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {line}
          </div>
        ))}
        {!isIntroDone && (
          <div>
            {currentText}
            <span className="animate-pulse">_</span>
          </div>
        )}
        {isIntroDone && (
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-green-400 flex-grow"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>
    </div>
  );
}
