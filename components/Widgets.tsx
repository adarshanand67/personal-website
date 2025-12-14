"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ChevronDown, Cloud, CloudRain, Music, Sun, Moon } from "lucide-react";
import { getGithubRepos } from "@/lib/github";
import { useStore } from "@/lib/store/useStore";
import { toLeetSpeak } from "@/lib/utils/leet";
import { commands } from "@/lib/terminal/commands";
import { INTRO_LINES, DIRECTORIES } from "@/lib/constants";
import { MOCK_FILES } from "@/lib/terminal/mockFileSystem";
import { SectionHeader } from "@/components/UI";

// --- GitHubStats ---
export function GitHubStats() {
    const { githubRepos, setGithubRepos, isGithubExpanded, setIsGithubExpanded } = useStore();

    useEffect(() => {
        if (githubRepos.length === 0) {
            getGithubRepos().then(setGithubRepos);
        }
    }, [githubRepos.length, setGithubRepos]);

    if (githubRepos.length === 0) return null;

    return (
        <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div
                onClick={(e) => {
                    // Prevent toggle when clicking links
                    if ((e.target as HTMLElement).closest('a')) return;
                    setIsGithubExpanded(!isGithubExpanded);
                }}
                className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-colors duration-300 cursor-pointer"
            >
                <section className="font-mono">
                    <div className="w-full text-left group mb-3">
                        <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                            <span className="text-primary">##</span> <span className="text-green-700 dark:text-green-400">Open Source</span>
                            <ChevronDown
                                size={20}
                                className={`transition-transform duration-300 ${isGithubExpanded ? 'rotate-0' : '-rotate-90'}`}
                            />
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <span className="text-green-500 font-bold">$</span>
                            <span>ls ~/repos --sort=stars</span>
                            <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                        </div>
                    </div>

                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isGithubExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="space-y-3">
                            {githubRepos.map((repo) => (
                                <div
                                    key={repo.name}
                                    className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
                                >
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <Link
                                            href={repo.html_url}
                                            target="_blank"
                                            className="text-green-700 dark:text-green-400 hover:underline font-bold"
                                        >
                                            {repo.name}
                                        </Link>
                                        <span className="text-gray-500 text-sm">
                                            ⭐ {repo.stargazers_count}
                                            {repo.language && ` • ${repo.language}`}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        {repo.description || "No description"}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            →{" "}
                            <Link
                                href="https://github.com/adarshanand67"
                                target="_blank"
                                className="text-green-700 dark:text-green-400 hover:underline"
                            >
                                View all repositories
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

// --- MusicToggleButton ---
/**
 * Floating button to toggle music player visibility
 * Positioned in bottom-right corner for easy access
 */
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

            {/* Pulse effect when hidden */}
            {!showMusicPlayer && (
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            )}

            {/* Tooltip */}
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

// --- Terminal ---
export function Terminal() {
    const router = useRouter();
    const { setTheme } = useTheme();

    // Access global store state
    const {
        // UI
        toggleMatrix, isMatrixEnabled,
        setIsPlaying, toggleMute,
        toggleMusicPlayer, setShowMusicPlayer,

        // Terminal State
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
            // Need to cast to match string[] type if implementation is rigid, but setLines accepts callbacks
            setLines((prev: string[]) => [...prev, ...INTRO_LINES(toLeetSpeak)]);
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

                    // Custom setter for mocking lines in pipe chain
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
                    // Final command outputs to real terminal
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const context = { ...baseContext, setLines: setLines as any }; // Adjusting type for compatibility
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
                    candidates = [...DIRECTORIES];
                } else {
                    candidates = [...Object.keys(MOCK_FILES), ...DIRECTORIES];
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
    }, [isDragging, setPosition, setIsDragging]); // Updated deps
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

// --- WeatherWidget ---
export function WeatherWidget() {
    const { weather, setWeather, locationName, setLocationName } = useStore();

    useEffect(() => {
        // Avoid re-fetching if data already exists to persist state across navigation
        if (weather) return;

        const fetchWeather = async () => {
            try {
                // 1. Get location from IP
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

                // 2. Fetch Weather
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
        // Simple mapping for Open-Meteo WMO codes
        // 0: Clear sky
        // 1, 2, 3: Mainly clear, partly cloudy, and overcast
        // 45, 48: Fog
        // 51-55: Drizzle
        // 61-65: Rain
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
