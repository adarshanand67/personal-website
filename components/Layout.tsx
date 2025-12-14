"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { useMounted } from "@/lib/hooks";
import { useRef } from "react";
import { routes, introLines, directories } from "@/lib/constants";
import { siteConfig } from "@/lib/config";
import { commands } from "@/lib/terminal/commands";
import { mockFiles } from "@/lib/terminal/mockFileSystem";
import {
    ArrowUp,
    Search,
    Sun,
    Moon,
    Laptop,
    FileText,
    Home,
    BookOpen,
    Tv,
    Mail,
    Github,
    Linkedin,
    Sparkles,
    Gamepad2,
    Cloud,
    CloudRain,
    Music,
    ChevronDown,
} from "lucide-react";


interface GlitchTextProps {
    text: string;
    className?: string;
}
export function GlitchText({ text, className = "" }: GlitchTextProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={`relative inline-block overflow-hidden group hover:text-green-500 transition-colors duration-300 ${className}`}>
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1 group-hover:translate-x-[2px]"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-2 group-hover:-translate-x-[2px]"
                aria-hidden="true"
            >
                {text}
            </span>
        </span>
    );
}

export function Terminal() {
    const router = useRouter();
    const { setTheme } = useTheme();

    const {
        toggleMatrix, isMatrixEnabled,
        setIsPlaying, toggleMute,
        toggleMusicPlayer, setShowMusicPlayer,


        lines, setLines,
        isIntroDone, setIsIntroDone,
        input, setInput,
        history, setHistory,
        historyIndex, setHistoryIndex,
        passwordMode, setPasswordMode,
        isExpanded, setIsExpanded,
        position, setPosition,
        isDragging, setIsDragging
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
        if (isMatrixEnabled) {
            setLines((prev) => [...prev, "Matrix: Activated."]);
        }
    }, [isMatrixEnabled, setLines]);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines, isIntroDone]);
    useEffect(() => {
        if (!isIntroDone) {
            setLines((prev: string[]) => [...prev, ...introLines()]);
            setIsIntroDone(true);
        }
    }, [isIntroDone, setLines, setIsIntroDone]);
    const executeCommand = async (cmd: string) => {
        if (passwordMode) {
            setPasswordMode(false);
            setLines((prev: string[]) => [...prev, "Checking permissions..."]);
            if (cmd === "admin123" || cmd === "godmode" || cmd === "trellix") {
                setTimeout(() => {
                    setLines((prev: string[]) => [...prev, "Access Granted. Welcome, Administrator.", "God Mode: Enabled (Matrix Rain toggled)"]);
                    if (!isMatrixEnabled) toggleMatrix();
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
            isMatrixEnabled,
            toggleMatrix,
            setIsPlaying,
            toggleMute,
            setInput,
            commandHistory: history,
            toggleMusicPlayer,
            setShowMusicPlayer,

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



export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}


export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { isMounted, setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    if (!isMounted) {
        return (
            <button
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
            >
                <div className="h-5 w-5" />
            </button>
        );
    }
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-900 dark:text-gray-100" />
            <Moon
                className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-900 dark:text-gray-100"
                style={{ marginTop: "-20px" }}
            />
        </button>
    );
}


export function BackToTop() {
    const { isBackToTopVisible, setIsBackToTopVisible } = useStore();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsBackToTopVisible(true);
            } else {
                setIsBackToTopVisible(false);
            }
        };
        toggleVisibility();

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [setIsBackToTopVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isBackToTopVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 md:p-5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all z-50 font-mono text-sm hover:scale-110"
            aria-label="Back to top"
        >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
        </button>
    );
}


export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { setTheme } = useTheme();
    const { toggleMatrix, toggleHobbiesModal } = useStore();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        const openEvent = () => setOpen(true);
        document.addEventListener("keydown", down);
        document.addEventListener("open-command-menu", openEvent);
        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("open-command-menu", openEvent);
        };
    }, []);

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false);
        setSearch("");
        command();
    }, []);

    if (!open) return null;

    const commands = [
        { icon: Home, label: "Home", action: () => router.push("/") },
        { icon: FileText, label: "Blogshelf", action: () => router.push("/blogs") },
        { icon: FileText, label: "Papershelf", action: () => router.push("/papershelf") },
        { icon: Tv, label: "Animeshelf", action: () => router.push("/animeshelf") },
        { icon: BookOpen, label: "Bookshelf", action: () => router.push("/bookshelf") },
        { icon: Sparkles, label: "Toggle Matrix Rain", action: toggleMatrix },
        { icon: Gamepad2, label: "View Hobbies", action: toggleHobbiesModal },
        { icon: Sun, label: "Light Mode", action: () => setTheme("light") },
        { icon: Moon, label: "Dark Mode", action: () => setTheme("dark") },
        { icon: Laptop, label: "System Theme", action: () => setTheme("system") },
        { icon: Github, label: "GitHub", action: () => window.open(`https://${siteConfig.contact.github}`, "_blank") },
        { icon: Linkedin, label: "LinkedIn", action: () => window.open(`https://${siteConfig.contact.linkedin}`, "_blank") },
        { icon: Mail, label: "Contact Email", action: () => window.open(`mailto:${siteConfig.contact.email}`) },
    ];

    const filtered = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[640px]">
                <div className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-800 p-2">
                    <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3 pb-2 mb-2">
                        <Search className="w-4 h-4 text-gray-600 dark:text-gray-300 mr-2" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Type a command or search..."
                            className="w-full bg-transparent border-none outline-none text-sm h-8 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
                            autoFocus
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto px-1">
                        {filtered.length === 0 ? (
                            <div className="py-6 text-center text-sm text-gray-700 dark:text-gray-300">
                                No results found.
                            </div>
                        ) : (
                            filtered.map((cmd, i) => (
                                <button
                                    key={i}
                                    onClick={() => runCommand(cmd.action)}
                                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                                >
                                    <cmd.icon className="w-4 h-4" />
                                    {cmd.label}
                                </button>
                            ))
                        )}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2 px-2 flex justify-between items-center text-[10px] text-gray-400">
                        <span>Open with ⌘ K</span>
                        <span>Select with ↵</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function Footer() {
    return (
        <footer className="relative py-16 border-t border-gray-200/50 dark:border-gray-800/50 mt-auto font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-green-50/30 via-transparent to-transparent dark:from-green-950/20 dark:via-transparent dark:to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 glass rounded-2xl p-4 shadow-sm mx-auto w-fit">
                    <Link
                        href="/"
                        scroll={false}
                        className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-sm"
                        title="Back to Home"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="font-medium hidden sm:inline-block">Home</span>
                    </Link>
                    <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { href: "/articleshelf", label: "Articles", icon: "📝" },
                            { href: "/bookshelf", label: "Books", icon: "📚" },
                            { href: "/animeshelf", label: "Anime", icon: "📺" },
                            { href: "/hobbyshelf", label: "Hobby", icon: "🎮" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                            >
                                <span className="text-xs opacity-70">{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-center text-xs opacity-80 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                <span className="mr-1">©</span>
                {new Date().getFullYear()}
                <span className="ml-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
                    Adarsh Anand
                </span>
            </p>
        </footer>
    );
}


export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    return (
        <>
            <div className="h-24" />
            <nav
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="w-full max-w-5xl glass rounded-2xl shadow-sm transition-all duration-300">
                    <div className="px-4 md:px-6">
                        <div className="flex items-center h-14">
                            <button
                                className={`md:hidden p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isNavbarActive ? "is-active" : ""}`}
                                aria-label="menu"
                                aria-expanded={isNavbarActive}
                                onClick={() => {
                                    setIsNavbarActive(!isNavbarActive);
                                }}
                            >
                                <div className="w-5 h-4 relative flex flex-col justify-between">
                                    <span
                                        className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isNavbarActive ? "rotate-45 translate-y-1.5" : ""}`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isNavbarActive ? "opacity-0" : ""}`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isNavbarActive ? "-rotate-45 -translate-y-2" : ""}`}
                                    />
                                </div>
                            </button>
                            <Link
                                href={routes.home}
                                className="text-lg font-bold text-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2 font-mono whitespace-nowrap mr-auto md:mr-0"
                            >
                                ~/
                            </Link>
                            <div className="md:hidden">
                                <ThemeToggle />
                            </div>
                            <div className="hidden md:flex md:items-center md:ml-auto gap-1 text-sm font-medium">
                                <GlitchLink
                                    href={routes.articleShelf}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Articleshelf
                                </GlitchLink>
                                <GlitchLink
                                    href={routes.animeShelf}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Animeshelf
                                </GlitchLink>
                                <GlitchLink
                                    href={routes.bookShelf}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Bookshelf
                                </GlitchLink>
                                <GlitchLink
                                    href={routes.hobbyShelf}
                                    className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                                >
                                    Hobbyshelf
                                </GlitchLink>
                                <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-2"></div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground/80 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                        onClick={() => {
                                            document.dispatchEvent(new Event("open-command-menu"));
                                        }}
                                        aria-label="Search"
                                    >
                                        {isMounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                                    </button>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="menu"
                        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isNavbarActive ? "max-h-80 pb-6 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2 text-sm font-mono pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
                            <Link
                                href={routes.articleShelf}
                                className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                onClick={() => setIsNavbarActive(false)}
                            >
                                Articleshelf
                            </Link>
                            <Link
                                href={routes.animeShelf}
                                className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                onClick={() => setIsNavbarActive(false)}
                            >
                                Animeshelf
                            </Link>
                            <Link
                                href={routes.bookShelf}
                                className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                onClick={() => setIsNavbarActive(false)}
                            >
                                Bookshelf
                            </Link>
                            <Link
                                href={routes.hobbyShelf}
                                className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                onClick={() => setIsNavbarActive(false)}
                            >
                                Hobbyshelf
                            </Link>
                            <div className="flex items-center gap-2 pt-2 w-full justify-center">
                                <button
                                    onClick={() => {
                                        document.dispatchEvent(new Event("open-command-menu"));
                                        setIsNavbarActive(false);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                >
                                    {isMounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    );
}


export const GlobalEffect = () => {
    const { setMounted } = useStore();

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    return null;
};


function createClientIcon(Icon: React.ComponentType<{ className?: string }>) {
    return function ClientIcon(props: { className?: string }) {
        const mounted = useMounted();
        if (!mounted) return <div className={props.className} aria-hidden="true" />;
        return <Icon {...props} />;
    };
}
export const ClientLinkedin = createClientIcon(Linkedin);
export const ClientGithub = createClientIcon(Github);
export const ClientMail = createClientIcon(Mail);




interface GlitchLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
export function GlitchLink({ href, children, className = "", onClick }: GlitchLinkProps) {
    return (
        <Link
            href={href}
            className={`relative group inline-block overflow-hidden ${className}`}
            onClick={() => {
                if (onClick) onClick();
            }}
        >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[2px]">
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1 group-hover:translate-x-[2px]"
                aria-hidden="true"
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-2 group-hover:-translate-x-[2px]"
                aria-hidden="true"
            >
                {children}
            </span>
        </Link>
    );
}


export const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isMatrixEnabled } = useStore();
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        if (!isMatrixEnabled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = new Array(columns).fill(1);
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z";
        const isDark = resolvedTheme === "dark";
        let animationId: number;
        const draw = () => {
            ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = isDark ? "#0F0" : "#15803d";
            ctx.font = "15px monospace";
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text || '', i * 20, drops[i]! * 20);
                if (drops[i]! * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i]!++;
                }
            }
            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, [isMatrixEnabled, resolvedTheme]);
    if (!isMatrixEnabled) return null;
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.1] dark:opacity-[0.4] transition-opacity duration-500"
            aria-hidden="true"
        />
    );
};


interface SectionHeaderProps {
    title: string;
    command: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
}
export function SectionHeader({
    title,
    command,
    isExpanded,
    onToggle,
    rightElement,
}: SectionHeaderProps) {
    return (
        <div
            className="w-full text-left group mb-3 cursor-pointer"
            onClick={onToggle}
        >
            <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                <span className="text-primary">##</span> {title}
                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                />
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <span className="text-green-500 font-bold">$</span>
                <span>{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
            </div>
        </div>
    );
}


export const SpotlightCard = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) => {
    return (
        <div
            className={`relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md ${className || ""}`}
        >
            <div className="relative h-full">{children}</div>
        </div>
    );
};


export function TerminalCursor() {
    const {
        cursorPosition,
        setCursorPosition,
        isCursorVisible,
        setIsCursorVisible,
        isCursorClicking,
        setIsCursorClicking,
        isCursorPointer,
        setIsCursorPointer
    } = useStore();

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
            if (!isCursorVisible) setIsCursorVisible(true);
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setIsCursorPointer(isClickable);
        };
        const handleMouseDown = () => setIsCursorClicking(true);
        const handleMouseUp = () => setIsCursorClicking(false);
        document.documentElement.style.cursor = 'none';
        const handleMouseEnter = () => setIsCursorVisible(true);
        const handleMouseLeave = () => setIsCursorVisible(false);
        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.style.cursor = 'auto';
        };
    }, [isCursorVisible, setCursorPosition, setIsCursorVisible, setIsCursorClicking, setIsCursorPointer]);

    if (!isCursorVisible) return null;
    return (
        <div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div
                className={`bg-green-500 transition-all duration-150 ease-out border border-green-400/50 shadow-[0_0_10px_rgba(34,197,94,0.5)] ${isCursorClicking
                    ? "w-3 h-3 scale-90"
                    : isCursorPointer
                        ? "w-6 h-6 rotate-45 opacity-80"
                        : "w-4 h-6 opacity-80 animate-pulse"
                    }`}
            />
        </div>
    );
}


export function MusicToggleButton() {
    const { showMusicPlayer, toggleMusicPlayer } = useStore();

    return (
        <button
            onClick={toggleMusicPlayer}
            className={`
                fixed bottom-8 left-8 z-40
                p-3 rounded-full
                bg-gradient-to-br from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                shadow-lg hover:shadow-xl
                transition-all duration-300
                border-2 border-green-400/50
                group
                ${showMusicPlayer ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}
            `}
            aria-label={showMusicPlayer ? "Hide Music Player" : "Show Music Player"}
            title={showMusicPlayer ? "Hide Music Player" : "Show Music Player"}
        >
            <Music
                className={`
                    w-5 h-5 text-white
                    transition-transform duration-300
                    ${showMusicPlayer ? 'rotate-0' : 'group-hover:rotate-12'}
                `}
            />
            {!showMusicPlayer && (
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            )}
            <span className="
                absolute bottom-full left-0 mb-2
                px-3 py-1.5 rounded-lg
                bg-gray-900 text-white text-sm
                whitespace-nowrap
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                pointer-events-none
                shadow-lg
            ">
                {showMusicPlayer ? 'Hide Music' : 'Show Music'}
            </span>
        </button>
    );
}


export function WeatherWidget() {
    const { weather, setWeather, locationName, setLocationName } = useStore();

    useEffect(() => {
        if (weather) return;

        const fetchWeather = async () => {
            try {
                let lat = 12.9716;
                let lon = 77.5946;
                let city = "Bengaluru";

                try {
                    const locRes = await fetch("https://ipapi.co/json/");
                    if (locRes.ok) {
                        const locData = await locRes.json();
                        if (locData.latitude && locData.longitude) {
                            lat = locData.latitude;
                            lon = locData.longitude;
                            city = locData.city || locData.region || "Local";
                        }
                    }
                } catch {
                    console.warn("Location fetch failed, using default");
                }

                setLocationName(city);
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&timezone=auto`
                );
                const data = await res.json();
                setWeather({
                    temperature: Math.round(data.current.temperature_2m),
                    isDay: data.current.is_day === 1,
                    weatherCode: data.current.weather_code,
                });
            } catch (error) {
                console.error("Failed to fetch weather", error);
            }
        };

        fetchWeather();
    }, [weather, setWeather, setLocationName]);

    if (!weather) return null;

    const getWeatherIcon = () => {
        const { weatherCode, isDay } = weather;

        if (weatherCode <= 1)
            return isDay ? (
                <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
                <Moon className="w-4 h-4 text-gray-400" />
            );
        if (weatherCode <= 3) return <Cloud className="w-4 h-4 text-gray-400" />;
        if (weatherCode >= 51) return <CloudRain className="w-4 h-4 text-gray-500" />;

        return <Sun className="w-4 h-4 text-orange-400" />;
    };

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            {getWeatherIcon()}
            <span>{locationName}, {weather.temperature}°C</span>
        </div>
    );
}
