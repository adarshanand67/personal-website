"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toLeetSpeak } from "@/lib/utils/leet";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { commands } from "@/lib/terminal/commands";
import { INTRO_LINES, DIRECTORIES } from "@/lib/constants";
import { MOCK_FILES } from "@/lib/terminal/mockFileSystem";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Terminal() {
  const router = useRouter();
  const { setTheme } = useTheme();
  // Import audio controls
  const {
    toggleMatrix, isMatrixEnabled,
    setIsPlaying, nextTrack, prevTrack, toggleMute,
    toggleMusicPlayer, setShowMusicPlayer
  } = useGlobalState();

  const [lines, setLines] = useState<string[]>([]);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [passwordMode, setPasswordMode] = useState(false); // For sudo
  const [isExpanded, setIsExpanded] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check mobile on mount
  useEffect(() => {
    if (window.innerWidth < 1024) { // Collapse on mobile/tablet
      setIsExpanded(false);
    }
  }, []);

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

  const executeCommand = async (cmd: string) => {
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

    // Echo command
    setLines((prev) => [...prev, `$ ${cmd}`]);

    const pipeParts = cmd.split('|').map(p => p.trim()).filter(p => p);
    if (pipeParts.length === 0) return;

    let currentInput: string | undefined = undefined;

    // We creating a partial context to share (setLines will be overridden per command if needed)
    const baseContext = {
      setPasswordMode,
      router,
      setTheme,
      isMatrixEnabled,
      toggleMatrix,
      setIsPlaying,
      nextTrack,
      prevTrack,
      toggleMute,
      setInput,
      commandHistory: history,
      toggleMusicPlayer,
      setShowMusicPlayer
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
          setLines((prev) => [...prev, `Command not found: ${commandName}`]);
          return;
        }

        if (i < pipeParts.length - 1) {
          // Capture output
          let captured: string[] = [];
          const mockSetLines: React.Dispatch<React.SetStateAction<string[]>> = (action) => {
            if (typeof action === 'function') {
              captured = action(captured);
            } else {
              if (Array.isArray(action)) {
                captured = [...captured, ...action];
              } else {
                // Should not happen with our use of addLine/addLines
                captured = [...captured, action as string];
              }
            }
          };

          const context = { ...baseContext, setLines: mockSetLines };
          // @ts-ignore - mockSetLines matching
          await command.execute(args, context, currentInput);
          currentInput = captured.join('\n');
        } else {
          // Final command - output to real terminal
          const context = { ...baseContext, setLines };
          await command.execute(args, context, currentInput);
        }
      }
    } catch (error) {
      console.error("Exec error", error);
      setLines((prev) => [...prev, `Error executing command.`]);
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

      // Check if we are completing a command or an argument
      const isCommand = parts.length === 1;
      const currentToken = parts[parts.length - 1] || '';
      const cmd = parts[0]?.toLowerCase() || '';

      let candidates: string[] = [];

      if (isCommand) {
        // Complete commands
        candidates = Object.keys(commands);
      } else {
        // Complete arguments based on command
        if (['cd', 'open'].includes(cmd)) {
          // Navigation - only directories
          candidates = [...DIRECTORIES];
        } else {
          // General - files and directories (simplified)
          // For now, listing both MOCK_FILES and DIRECTORIES for file-related commands
          // ideally we'd filter based on what the command expects, but this is a good approximation
          candidates = [...Object.keys(MOCK_FILES), ...DIRECTORIES];
        }
      }

      if (candidates.length > 0) {
        const matches = candidates.filter((c) => c.toLowerCase().startsWith(currentToken.toLowerCase()));

        if (matches.length === 1) {
          // Single match - complete it
          parts[parts.length - 1] = matches[0]!;
          // Add a space if it's a command completion, essentially preparing for args
          // If it's a directory/file, maybe user wants to continue path? 
          // For simplified flat file system, just adding space is fine mostly, but standard shell adds / for dirs.
          // Let's just add space for now.
          setInput(parts.join(" ") + (isCommand ? " " : ""));
        } else if (matches.length > 1) {
          // Multiple matches - find common prefix
          let prefix = matches[0] || '';
          // Case-insensitive matching for prefix finding is tricky if we want to preserve case of the candidate
          // Let's use the first match as the baseline for case
          const lowerPrefix = () => prefix.toLowerCase();

          for (let i = 1; i < matches.length; i++) {
            while (!matches[i]!.toLowerCase().startsWith(lowerPrefix())) {
              prefix = prefix.substring(0, prefix.length - 1);
              if (prefix === "") break;
            }
          }

          if (prefix.length > currentToken.length) {
            // We found a longer common prefix, complete to it
            parts[parts.length - 1] = prefix;
            setInput(parts.join(" "));
          } else {
            // Cannot complete further, show candidates
            // We append a new line to the terminal output showing candidates
            // This is standard shell behavior (e.g., zsh)
            // But we need to make sure we don't spam if they keep pressing tab without typing
            // For this implementation, we'll just append.
            setLines((prev) => [...prev, `$ ${input}`, matches.join("  ")]);
          }
        }
      }
    }
  };

  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });

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
  }, [isDragging]);

  const handleTerminalWrapperClick = (e: React.MouseEvent) => {
    // If collapsed, don't focus
    if (!isExpanded) return;

    // Don't focus if user is selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    // Don't focus if dragging
    if (isDragging) return;

    if (isIntroDone) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="w-full max-w-4xl relative"
      onClick={handleTerminalWrapperClick}
    >
      <div className="relative glass rounded-xl p-4 hover:border-green-500/50 transition-colors duration-300">
        <section className="font-mono">
          <SectionHeader
            title="Terminal"
            command="./interactive-shell.sh"
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />

          <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div
              className={`w-full bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 font-mono text-base select-text relative ${isDragging ? 'cursor-grabbing z-50 shadow-green-500/20' : ''}`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out, opacity 0.5s ease-in-out'
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
                className="p-4 text-gray-800 dark:text-gray-300 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
              >
                {lines.map((line, i) => {
                  // Parse ANSI color codes
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
                      key={i}
                      className={`mb-1 whitespace-pre-wrap ${line.startsWith('$ ') ? 'text-green-600 dark:text-green-400 font-semibold' : ''}`}
                    >
                      {line.includes('\x1b[') ? parseAnsi(line) : line}
                    </div>
                  );
                })}

                {isIntroDone && (
                  <div className="flex items-center">
                    <span className="mr-2 text-green-600 dark:text-green-400 font-bold">$</span>
                    <input
                      ref={inputRef}
                      type={passwordMode ? "password" : "text"}
                      value={input}
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
