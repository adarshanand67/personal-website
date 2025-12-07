"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toLeetSpeak } from "@/lib/utils/leet";

export default function Terminal() {
  const router = useRouter();
  const { setTheme } = useTheme();

  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const introLines = [
    "> ./adarsh_profile.sh",
    "> Initializing SDE protocol...",
    "> Loading modules: C++, Make, Git...",
    `> Access granted :${toLeetSpeak("Type 'help' for commands.")}`,
  ];

  const commands = [
    "help",
    "ls",
    "cd",
    "open",
    "clear",
    "whoami",
    "date",
    "theme",
    "sudo",
    "rm",
    "contact",
    "blogs",
    "papers",
    "books",
    "anime",
  ];

  const directories = ["blogs", "papers", "books", "anime"];

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentText, isIntroDone]);

  // Intro Typing Effect (DISABLED)
  useEffect(() => {
    if (!isIntroDone) {
      setLines(introLines);
      setIsIntroDone(true);
    }
  }, [isIntroDone]);

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add to history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    const newLines = [...lines, `$ ${cmd}`];

    switch (command) {
      case "help":
        newLines.push(
          "Available commands:",
          "  ls              - List directories",
          "  cd [dir]        - Change directory (navigates site)",
          "  open [dir]      - Open directory",
          "  whoami          - Display profile info",
          "  theme [mode]    - Set theme (light/dark/system)",
          "  date            - Show current date/time",
          "  clean / clear   - Clear terminal",
          "  sudo            - Execute with superuser privileges",
          "  contact         - Show contact info"
        );
        break;

      case "ls":
        newLines.push(
          "drwxr-xr-x  blogs/",
          "drwxr-xr-x  papers/",
          "drwxr-xr-x  bookshelf/",
          "drwxr-xr-x  animeshelf/"
        );
        break;

      case "cd":
      case "open":
        if (args.length === 0) {
          newLines.push("usage: cd [directory]");
        } else {
          const dir = args[0].replace(/^\.\//, "").replace(/\/$/, "").replace("shelf", ""); // relaxed matching
          const map: Record<string, string> = {
            blog: "/blogs",
            blogs: "/blogs",
            paper: "/papershelf",
            papers: "/papershelf",
            book: "/bookshelf",
            books: "/bookshelf",
            anime: "/animeshelf",
            animes: "/animeshelf",
            home: "/",
            "~": "/",
            ".": "/",
          };

          if (map[dir]) {
            newLines.push(`Navigating to ${map[dir]}...`);
            router.push(map[dir]);
          } else {
            newLines.push(`Directory not found: ${args[0]}`);
          }
        }
        break;

      case "whoami":
        newLines.push(
          "User: Adarsh Anand",
          "Role: SDE @ Trellix",
          "Expertise: C++, System Design, Security",
          "Status: Online"
        );
        break;

      case "date":
        newLines.push(new Date().toString());
        break;

      case "theme":
        if (args.length === 0) {
          newLines.push("usage: theme [light|dark|system]");
        } else {
          const mode = args[0].toLowerCase();
          if (["light", "dark", "system"].includes(mode)) {
            setTheme(mode);
            newLines.push(`Theme set to ${mode}`);
          } else {
            newLines.push(`Invalid theme: ${mode}. Use light, dark, or system.`);
          }
        }
        break;

      case "sudo":
        newLines.push("Permission denied: You are not categorized as admin.");
        break;

      case "rm":
        if (args.includes("-rf") && args.includes("/")) {
          newLines.push("Nice try, but I need this website.");
        } else {
          newLines.push("Permission denied.");
        }
        break;

      case "clear":
      case "cls":
        setLines([]);
        setInput("");
        return; // Early return to avoid setting lines

      case "contact":
        newLines.push(
          "Email: adarshan20302@gmail.com",
          "LinkedIn: linkedin.com/in/adarshanand67",
          "GitHub: github.com/adarshanand67"
        );
        break;

      case "":
        break;

      default:
        newLines.push(`Command not found: ${command}. Type 'help' for options.`);
    }

    setLines(newLines);
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
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(" ");

      // If we are at the command part (first word, no space yet or just started typing it)
      const isCommand = parts.length === 1;
      const currentToken = parts[parts.length - 1]; // keep case for replacement?? actually commands are mostly lower

      let candidates: string[] = [];
      const cmd = parts[0].toLowerCase();

      if (isCommand) {
        candidates = commands;
      } else if ((cmd === "cd" || cmd === "open") && parts.length === 2) {
        candidates = directories;
      }

      if (candidates.length > 0) {
        const matches = candidates.filter((c) => c.startsWith(currentToken.toLowerCase()));

        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setInput(parts.join(" ") + " ");
        } else if (matches.length > 1) {
          // Find common prefix
          let prefix = matches[0];
          for (let i = 1; i < matches.length; i++) {
            while (!matches[i].startsWith(prefix)) {
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
      className="w-full max-w-2xl bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden border border-gray-800 font-mono text-base my-8 cursor-text"
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
        className="p-6 text-green-400 h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
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
              onKeyDown={handleKeyDown}
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
