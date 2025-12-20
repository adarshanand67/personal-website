"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, type ThemeProviderProps } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { useMounted } from "@/lib/hooks";
import {
    Search as SearchIcon, Moon, Sun, X, Music, Menu,
    ArrowUp, Laptop, FileText, Home, BookOpen, Tv, Mail, Github, Linkedin, Sparkles,
    Gamepad2, Cloud, CloudRain, ChevronDown, Search,
} from "lucide-react";
import { routes, introLines, directories } from "@/lib/constants";
import { siteConfig } from "@/lib/config";
import { commands } from "@/lib/terminal/commands";
import { mockFiles } from "@/lib/terminal/mockFileSystem";
import { SystemMonitor } from "@/components/features";
import { SystemStatus } from "@/components/systemStatus";
import { Terminal } from "@/components/layout/terminal";
import { ThemeProvider, ThemeToggle, ClientLinkedin, ClientGithub, ClientMail } from "@/components/layout/theme";
import { SectionHeader, SpotlightCard, TerminalCursor } from "@/components/layout/ui";





// Terminal component is now imported from @/components/layout/terminal



// Theme components imported from @/components/layout/theme


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

            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
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
    const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();

    useEffect(() => {
        setIsMounted(true);
    }, [setIsMounted]);

    return (
        <>
            <div className="h-24" />
            <nav
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="w-full max-w-7xl glass rounded-2xl shadow-lg border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-xl hover:scale-[1.005]">
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
                                ~/Adarsh
                            </Link>
                            <div className="hidden lg:flex items-center ml-4">
                                <SystemStatus />
                            </div>
                            <div className="md:hidden">
                                <ThemeToggle />
                            </div>
                            <div className="hidden md:flex md:items-center md:ml-auto gap-1 text-sm font-medium">
                                <Link
                                    href={routes.articleShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/80 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-medium"
                                >
                                    Articles
                                </Link>
                                <Link
                                    href={routes.animeShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/80 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-medium"
                                >
                                    Anime
                                </Link>
                                <Link
                                    href={routes.bookShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/80 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-medium"
                                >
                                    Books
                                </Link>
                                <Link
                                    href={routes.hobbyShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/80 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-medium"
                                >
                                    Hobby
                                </Link>
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
    const { setIsMounted } = useStore();

    useEffect(() => {
        setIsMounted(true);
    }, [setIsMounted]);

    return null;
};


// Client icons imported from @/components/layout/theme







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


// UI components imported from @/components/layout/ui


// Terminal cursor component imported from @/components/layout/ui


export function MusicToggleButton() {
    const { showMusicPlayer, toggleMusicPlayer } = useStore();

    return (
        <button
            onClick={toggleMusicPlayer}
            className={`
                fixed bottom-8 right-8 z-40
                p-3 rounded-full
                bg-gradient-to-br from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                shadow-lg hover:shadow-xl
                transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                border-2 border-green-400/50
                group
                ${showMusicPlayer ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}
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

// Re-export modularized components for backward compatibility
export { Terminal, ThemeProvider, ThemeToggle, ClientLinkedin, ClientGithub, ClientMail, SectionHeader, SpotlightCard, TerminalCursor };
