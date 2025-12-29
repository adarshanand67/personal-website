"use client";

import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
    Menu,
    X,
    Search,
    User,
    Terminal as TerminalIcon,
    Home,
    FileText,
    Tv,
    BookOpen,
    Gamepad2,
    Music,
    ExternalLink,
    ArrowRight,
    Sun,
    Moon,
    Laptop,
    Github,
    Linkedin,
    Mail,
    Copy,
    ArrowUp,
    ArrowDown,
    Check,
    MapPin,
    Activity,
    Clock,
    ChevronDown,
    Feather,
    Book,
    Gamepad2 as GamepadIcon,
    MonitorPlay,
    RefreshCw,
    Printer,
    Code,
    Keyboard,
    Share2,
    Bookmark,
    QrCode,
    Calculator,
    Hash,
    FileJson,
    Palette,
    Ruler,
    Globe,
    Command as CommandIcon,
    Package,
} from "lucide-react";

import { useStore } from "@/lib/store";
import {
    routes,
    directories,
    introLines,
    skillCategories,
    directoryMap,
} from "@/lib/constants";
import { siteConfig, shelfConfigs } from "@/lib/config";
import { getAssetPath } from "@/lib/utils";
import { linkifyTech, techLinks } from "@/lib/techLinks";
import { SystemStatusLabel } from "@/data";
import { useMounted } from "@/lib/hooks";
import { commands, mockFiles, parseAnsi } from "@/lib/terminal";
import { Profile } from "@/types/definitions";
import { DLPProtection } from "@/components/features";
import { HobbiesModal } from "@/components/modals";
import { ShortcutGuide } from "@/components/features";
import { ScrollProgress, TiltWrapper } from "@/components/ui";
import { MusicPlayer, MusicToggleButton } from "@/components/features";

// ============================================================================
// Shared Components & UI Elements
// ============================================================================

export function SectionHeader({
    title,
    isExpanded,
    onToggle,
    rightElement,
}: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: React.ReactNode;
}) {
    return (
        <div
            className="w-full text-left group mb-2 cursor-pointer"
            onClick={onToggle}
        >
            <div className="flex items-center gap-3 mb-1">
                <div
                    className={`h-6 w-1 rounded-full bg-gray-300 dark:bg-zinc-800 transition-all duration-300 ${isExpanded ? "scale-y-100" : "scale-y-50 opacity-50"}`}
                />
                <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight text-gray-900 dark:text-white group-hover:text-foreground transition-colors">
                    {title}
                    <ChevronDown
                        size={20}
                        className={`transition-all duration-500 text-black dark:text-gray-400 ${isExpanded ? "rotate-180" : "-rotate-90 opacity-40 group-hover:opacity-100"}`}
                    />
                </h2>
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </div>
        </div>
    );
}

export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(161, 161, 170, 0.08)",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm transition-all hover:shadow-lg group/spotlight ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative h-full z-10">{children}</div>
        </div>
    );
};

export function SystemStatus() {
    const [time, setTime] = useState("");
    const [status, setStatus] = useState<SystemStatusLabel>(
        SystemStatusLabel.Available,
    );
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(istTime);
            const h = parseInt(
                now.toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "numeric",
                    hour12: false,
                }),
            );
            if (h >= 0 && h < 7) setStatus(SystemStatusLabel.Sleeping);
            else if (h >= 9 && h < 18) setStatus(SystemStatusLabel.Coding);
            else setStatus(SystemStatusLabel.Available);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-3 mt-6"
        >
            {[
                { icon: Clock, label: `${time} IST` },
                { icon: Activity, label: status },
                { icon: MapPin, label: "Bengaluru, IN" },
            ].map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 backdrop-blur-3xl rounded-full border border-foreground/10 shadow-sm transition-all hover:border-foreground/20"
                >
                    <item.icon size={14} className="text-black dark:text-gray-400" />
                    <span className="text-[11px] font-mono font-black text-foreground/60 tracking-widest uppercase">
                        {item.label}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}

// ============================================================================
// Theme & Layout Providers
// ============================================================================

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { isMounted, setIsMounted } = useStore();
    useEffect(() => setIsMounted(true), [setIsMounted]);
    if (!isMounted)
        return (
            <button
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
            >
                <div className="h-5 w-5" />
            </button>
        );
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl hover:bg-foreground/5 text-foreground/60 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
        </button>
    );
}

function createClientIcon(Icon: React.ComponentType<{ className?: string }>) {
    return function ClientIcon(props: { className?: string }) {
        const mounted = useMounted();
        return !mounted ? (
            <div className={props.className} aria-hidden="true" />
        ) : (
            <Icon {...props} />
        );
    };
}

export const ClientLinkedin = createClientIcon(Linkedin);
export const ClientGithub = createClientIcon(Github);
export const ClientMail = createClientIcon(Mail);

function getTechIcon(name: string) {
    const icons: Record<string, any> = {
        "C": Code, "C++": Code, "Python": Code, "JavaScript": Code, "TypeScript": Code, "Bash": TerminalIcon,
        "Intel SGX/TDX": Activity, "Gramine": FileJson, "System Programming": Laptop, "Windows Internals": Laptop,
        "Ubuntu": Globe, "CentOS": Globe, "RHEL": Globe,
        "Data Loss Prevention": Check, "Trellix ePO": Activity, "Endpoint Security": Check, "EDR": Activity, "XDR": Activity,
        "PowerShell": TerminalIcon, "Boldon James": Bookmark, "Full-Disk Encryption": Copy, "Hashicorp Vault": Keyboard,
        "OpenSSL": Keyboard, "Post-Quantum Cryptography": Keyboard, "libFuzzer": Activity, "RESTler": Activity,
        "SIEM": Activity, "Threat Intelligence": Activity, "Address Sanitizer": Activity, "Memory Sanitizer": Activity,
        "FIDO Device Onboarding": User,
        "vLLM": Activity, "PyTorch": Activity, "OpenVINO": Activity, "NumPy": Activity, "Pandas": Activity,
        "Jupyter": Activity, "CUDA": Activity, "ONNX": Activity, "MLflow": Activity,
        "Redis": FileJson, "MySQL": FileJson,
        "Next.js": Home, "React": Home, "Tailwind CSS": Palette, "Framer Motion": RefreshCw, "Three.js": Palette, "Zustand": FileJson,
        "Docker": Package, "Kubernetes": Package, "GitHub Actions": Github, "AWS": Globe, "Jenkins": RefreshCw
    };
    return icons[name] || null;
}

export const GlobalEffect = () => {
    const { setIsMounted } = useStore();
    useEffect(() => setIsMounted(true), [setIsMounted]);
    return null;
};

export const DLPProvider = ({ children }: { children: React.ReactNode }) => {
    const [isBlurred, setIsBlurred] = useState(false);
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "F12") {
                e.preventDefault();
                return false;
            }
            if (
                (e.ctrlKey || e.metaKey) &&
                ((e.shiftKey && ["I", "C", "J"].includes(e.key.toUpperCase())) ||
                    ["U", "S", "P"].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
                return false;
            }
        };
        const handleDragStart = (e: DragEvent) => e.preventDefault();
        const handleFocus = () => setIsBlurred(false);
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("dragstart", handleDragStart);
        window.addEventListener("focus", handleFocus);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("dragstart", handleDragStart);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);
    return (
        <div className="relative w-full h-full">
            <div
                className={`transition-all duration-300 w-full h-full ${isBlurred ? "blur-[20px] select-none pointer-events-none grayscale opacity-50" : ""}`}
                aria-hidden={isBlurred}
            >
                {children}
            </div>
            {isBlurred && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-sm pointer-events-none">
                    <div className="px-8 py-4 rounded-2xl bg-foreground text-background border border-foreground/10 shadow-2xl font-black uppercase tracking-widest text-xs animate-pulse">
                        Protected Content
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================================
// Navigation & Command Components
// ============================================================================

export function useCommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
            if (e.key === "Escape") setOpen(false);
        };
        const openEvent = () => setOpen(true);
        document.addEventListener("keydown", down);
        document.addEventListener("open-command-menu", openEvent);
        return () => { document.removeEventListener("keydown", down); document.removeEventListener("open-command-menu", openEvent); };
    }, []);

    const runCommand = useCallback((command: () => unknown) => { setOpen(false); setSearch(""); command(); }, []);

    const commandGroups = useMemo(() => [
        {
            group: "Navigation",
            items: [
                { icon: Home, label: "Home", description: "Go to homepage", action: () => router.push("/") },
                { icon: FileText, label: "Articles", description: "Browse technical articles", action: () => router.push("/articleshelf") },
                { icon: MonitorPlay, label: "Anime", description: "View anime watchlist", action: () => router.push("/animeshelf") },
                { icon: Book, label: "Books", description: "Explore reading list", action: () => router.push("/bookshelf") },
                { icon: GamepadIcon, label: "Hobbies", description: "Discover hobbies & interests", action: () => router.push("/hobbyshelf") },
            ],
        },
        {
            group: "Quick Actions",
            items: [
                { icon: Copy, label: "Copy Email", description: "Copy email to clipboard", action: () => { navigator.clipboard.writeText(siteConfig.contact.email); } },
                { icon: ExternalLink, label: "Copy Page URL", description: "Copy current page URL", action: () => { navigator.clipboard.writeText(window.location.href); } },
                { icon: Github, label: "Copy GitHub URL", description: "Copy GitHub profile link", action: () => { navigator.clipboard.writeText(`https://${siteConfig.contact.github}`); } },
                { icon: Linkedin, label: "Copy LinkedIn URL", description: "Copy LinkedIn profile link", action: () => { navigator.clipboard.writeText(`https://${siteConfig.contact.linkedin}`); } },
                { icon: Copy, label: "Copy Page Title", description: "Copy current page title", action: () => { navigator.clipboard.writeText(document.title); } },
                { icon: TerminalIcon, label: "Open Terminal", description: "Toggle terminal view", action: () => document.querySelector<HTMLElement>("[data-terminal-toggle]")?.click() },
                { icon: Music, label: "Toggle Music", description: "Play/pause music player", action: () => document.querySelector<HTMLElement>("[data-music-toggle]")?.click() },
                { icon: ArrowUp, label: "Scroll to Top", description: "Jump to page top", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
                { icon: ArrowDown, label: "Scroll to Bottom", description: "Jump to page bottom", action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }) },
            ],
        },
        {
            group: "Appearance",
            items: [
                { icon: Sun, label: "Light Mode", description: "Switch to light theme", action: () => setTheme("light") },
                { icon: Moon, label: "Dark Mode", description: "Switch to dark theme", action: () => setTheme("dark") },
                { icon: Laptop, label: "System Theme", description: "Match system preferences", action: () => setTheme("system") },
            ],
        },
    ], [router, setTheme]);

    const filteredItems = useMemo(() => commandGroups.flatMap((g) => g.items).filter((item) => item.label.toLowerCase().includes(search.toLowerCase())), [commandGroups, search]);
    useEffect(() => { setSelectedIndex(0); }, [search]);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((prev) => (prev + 1) % filteredItems.length); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length); }
            else if (e.key === "Enter") { e.preventDefault(); if (filteredItems[selectedIndex]) runCommand(filteredItems[selectedIndex].action); }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [open, filteredItems, selectedIndex, runCommand]);

    return { open, setOpen, search, setSearch, selectedIndex, runCommand, commandGroups, filteredItems };
}

export function NavBrand() {
    const pathname = usePathname();
    const router = useRouter();
    const { setHeroViewMode } = useStore();
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setHeroViewMode("profile");
        if (pathname === routes.home) {
            document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" }) || window.scrollTo({ top: 0, behavior: "smooth" });
        } else router.push(routes.home);
    };
    return (
        <button onClick={handleClick} className="text-xl font-black tracking-tight flex items-center gap-3 mr-auto group cursor-pointer text-foreground">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-zinc-800 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-black/10">~</div>
            Adarsh
        </button>
    );
}

export function NavLinks({ className, onItemClick }: { className?: string; onItemClick?: () => void }) {
    const pathname = usePathname();
    const links = [
        { href: routes.articleShelf, label: "Articles", icon: FileText },
        { href: routes.bookShelf, label: "Books", icon: Book },
        { href: routes.animeShelf, label: "Anime", icon: MonitorPlay },
        { href: routes.hobbyShelf, label: "Hobby", icon: Palette },
    ];
    return (
        <div className={`flex items-center gap-1 md:gap-2 ${className || ""}`}>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link key={link.href} href={link.href} onClick={onItemClick} className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}>
                        <link.icon size={18} className="transition-transform duration-300 group-hover:scale-110 text-black dark:text-gray-400" />
                        <span className={`text-[11px] uppercase tracking-widest whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}>{link.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}

export function NavActions({ isMounted }: { isMounted: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-all border border-foreground/10" onClick={() => document.dispatchEvent(new Event("open-command-menu"))} aria-label="Search" title="Search (⌘K)">
                {isMounted ? (
                    <>
                        <Search size={22} className="text-black dark:text-gray-400" />
                        <span className="hidden md:inline text-sm text-foreground/50">Search</span>
                        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-foreground/5 border border-foreground/10 rounded"><span className="text-xs">⌘</span>K</kbd>
                    </>
                ) : <div className="w-5 h-5" />}
            </button>
            <ThemeToggle />
        </div>
    );
}

export function MobileDock() {
    const pathname = usePathname();
    const navItems = [
        { icon: Home, label: "Home", path: routes.home },
        { icon: FileText, label: "Articles", path: routes.articleShelf },
        { icon: BookOpen, label: "Books", path: routes.bookShelf },
        { icon: Tv, label: "Anime", path: routes.animeShelf },
        { icon: Gamepad2, label: "Hobbies", path: routes.hobbyShelf },
    ];
    return (
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px]">
            <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 rounded-t-[32px] shadow-xl px-6 py-4 flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.label} href={item.path} className="relative flex flex-col items-center gap-1 group">
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200"}`}>{<item.icon size={20} />}</div>
                            {isActive && <motion.div layoutId="dock-dot" className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
                        </Link>
                    );
                })}
                <Link href={routes.music} className="relative flex flex-col items-center gap-1 group">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${pathname === routes.music ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 hover:text-black dark:hover:text-gray-200"}`}><Music size={20} /></div>
                    {pathname === routes.music && <motion.div layoutId="dock-dot" className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
                </Link>
            </div>
        </div>
    );
}

function CommandMenuInput({ value, onChange }: any) {
    return (
        <div className="flex items-center border-b border-gray-200 dark:border-white/10 px-4 h-14">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search for anything..." className="w-full bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder:text-gray-400" autoFocus />
            <span className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 font-mono">ESC</span>
        </div>
    );
}

function CommandMenuItem({ item, isSelected, onSelect }: any) {
    return (
        <button onClick={() => onSelect(item.action)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${isSelected ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-lg" : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"}`}>
            <div className="flex items-center gap-3 flex-1">
                <item.icon size={18} className={isSelected ? "text-white dark:text-black" : "text-gray-500"} />
                <div className="flex flex-col items-start gap-0.5"><span className="font-medium">{item.label}</span>{item.description && <span className={`text-xs ${isSelected ? "text-white/90" : "text-gray-700 dark:text-gray-300"}`}>{item.description}</span>}</div>
            </div>
            {isSelected && <div className="flex items-center gap-1.5 opacity-80"><span className="text-[10px] font-mono">Enter</span><ArrowRight size={14} /></div>}
        </button>
    );
}

function CommandMenuItems({ groups, search, selectedIndex, filteredItems, onSelect }: any) {
    if (filteredItems.length === 0) return <div className="py-12 text-center text-gray-500 text-sm">No results found for &ldquo;{search}&rdquo;</div>;
    return (
        <div className="space-y-4">
            {groups.map((group: any) => {
                const groupFiltered = group.items.filter((item: any) => item.label.toLowerCase().includes(search.toLowerCase()));
                if (groupFiltered.length === 0) return null;
                return (
                    <div key={group.group} className="space-y-1">
                        <div className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{group.group}</div>
                        {groupFiltered.map((item: any) => <CommandMenuItem key={item.label} item={item} isSelected={filteredItems.indexOf(item) === selectedIndex} onSelect={onSelect} />)}
                    </div>
                );
            })}
        </div>
    );
}

export function CommandMenu() {
    const { open, setOpen, search, setSearch, selectedIndex, runCommand, commandGroups, filteredItems } = useCommandMenu();
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto" onClick={() => setOpen(false)} />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="w-full max-w-[600px] bg-white dark:bg-[#0a0a0a] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden pointer-events-auto">
                        <CommandMenuInput value={search} onChange={setSearch} />
                        <div className="max-h-[60vh] overflow-y-auto py-2 px-2 custom-scrollbar"><CommandMenuItems groups={commandGroups} search={search} selectedIndex={selectedIndex} filteredItems={filteredItems} onSelect={runCommand} /></div>
                        <div className="bg-gray-50 dark:bg-white/5 px-4 h-10 flex items-center justify-between text-[11px] text-gray-500 border-t"><div className="flex gap-4"><span>↑↓ Navigate</span><span>↵ Select</span></div><div><CommandIcon size={12} className="inline mr-1" />K</div></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function Footer() {
    return (
        <footer className="hidden md:block relative py-16 border-t border-foreground/5 mt-auto font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.02] via-transparent to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-6 backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border border-foreground/10 p-6 shadow-2xl mb-8">
                    <Link href="/" className="group flex items-center gap-2 text-foreground/40 hover:text-foreground"><Home size={18} className="text-black dark:text-gray-400 group-hover:scale-110" /><span className="font-black uppercase tracking-widest text-xs">Home</span></Link>
                    <div className="w-px h-6 bg-foreground/10" />
                    <NavLinks />
                </div>
                <p className="text-gray-500 font-medium text-center text-[10px] opacity-60 pb-8 tracking-widest uppercase">©{new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </footer>
    );
}

export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            setIsScrolled(currentScroll > 20);
        };
        window.addEventListener("scroll", updateScroll);
        updateScroll();
        return () => window.removeEventListener("scroll", updateScroll);
    }, [setIsMounted]);

    return (
        <>
            <div className="h-20" />
            <div className="fixed top-0 left-0 right-0 z-[70] h-0.5 bg-transparent pointer-events-none">
                <div className="h-full bg-slate-900 dark:bg-slate-200 transition-all duration-300 shadow-sm" style={{ width: `${scrollProgress}%` }} />
            </div>
            <nav className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
                <div className={`mx-auto px-4 transition-all duration-500 ${isScrolled ? "py-3" : "py-4"}`}>
                    <div className={`max-w-7xl mx-auto backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border transition-all duration-700 ${isScrolled ? "border-foreground/10 shadow-2xl" : "border-foreground/5 shadow-xl"}`}>
                        <div className="px-6 flex items-center justify-between h-20">
                            <NavBrand />
                            <div className="hidden md:flex items-center gap-1"><NavLinks /></div>
                            <div className="hidden md:flex items-center gap-2"><NavActions isMounted={isMounted} /></div>
                            <div className="md:hidden flex items-center gap-2">
                                <NavActions isMounted={isMounted} />
                                <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95" onClick={() => setIsNavbarActive(!isNavbarActive)}>{isNavbarActive ? <X size={24} /> : <Menu size={24} />}</button>
                            </div>
                        </div>
                        {isNavbarActive && <div className="md:hidden border-t border-gray-200/50 dark:border-white/10 p-6"><NavLinks className="flex flex-col gap-1" onItemClick={() => setIsNavbarActive(false)} /></div>}
                    </div>
                </div>
            </nav>
        </>
    );
}

// ============================================================================
// Terminal Component & Hooks
// ============================================================================

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
                    setLines((prev) => [...prev, allIntroLines[currentLine]!]);
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
                setHistory((prev) => [cmd, ...prev]);
                setHistoryIndex(-1);
            }
            setLines((prev) => [...prev, `$ ${cmd}`]);
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
            className="bg-white/50 dark:bg-white/5 px-4 h-8 flex items-center gap-2 border-b border-white/20 dark:border-white/10 cursor-grab active:cursor-grabbing select-none"
        >
            <div className="w-3 h-3 rounded-full bg-foreground/10 shadow-sm border border-foreground/5" />
            <div className="w-3 h-3 rounded-full bg-foreground/10 shadow-sm border border-foreground/5" />
            <div className="w-3 h-3 rounded-full bg-foreground/10 shadow-sm border border-foreground/5" />
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-xs font-medium opacity-80">
                adarsh@linux:~
            </span>
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
            className="p-4 text-gray-800 dark:text-gray-300 h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
            {lines.map((line: string, i: number) => (
                <div
                    key={i}
                    className={`whitespace-pre leading-snug tracking-wide ${line.startsWith("$ ") ? "text-foreground font-bold" : ""}`}
                >
                    {line.includes("\x1b[") ? parseAnsi(line) : line}
                </div>
            ))}
            {isIntroDone && (
                <div className="flex items-center">
                    <span className="mr-2 text-foreground font-bold">$</span>
                    <input
                        ref={inputRef}
                        type={passwordMode ? "password" : "text"}
                        value={input}
                        onBlur={onBlur}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-foreground flex-grow font-medium focus:ring-0"
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

export function TerminalPreloader() {
    const { isIntroDone, setLines, setIsIntroDone } = useStore();
    useEffect(() => {
        if (!isIntroDone) {
            setLines(introLines());
            setIsIntroDone(true);
        }
    }, [isIntroDone, setLines, setIsIntroDone]);
    return null;
}



// ============================================================================
// Hero Section
// ============================================================================

export const ViewToggle = ({
    viewMode,
    setViewMode,
}: {
    viewMode: "profile" | "terminal";
    setViewMode: (mode: "profile" | "terminal") => void;
}) => (
    <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 ml-auto pointer-events-auto shadow-sm gap-1">
        <button
            onClick={() => setViewMode("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${viewMode === "profile"
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
        >
            <User size={14} /> <span>Profile</span>
        </button>
        <button
            onClick={() => setViewMode("terminal")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${viewMode === "terminal"
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
        >
            <TerminalIcon size={14} /> <span>Terminal</span>
        </button>
    </div>
);

export function Hero({ profile }: { profile: Profile }) {
    const { heroViewMode, setHeroViewMode } = useStore();
    return (
        <section
            id="hero"
            className="section max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 relative overflow-visible"
            onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
            }}
        >
            <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {heroViewMode === "profile" ? (
                        <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                            <div className="glass rounded-[2rem] p-6 md:p-10 border border-white/10 relative overflow-hidden group/container shadow-xl">
                                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative z-10">
                                    <TiltWrapper intensity={15}>
                                        <div className="relative w-32 h-32 md:w-52 md:h-52 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-2 border-foreground/10 shadow-2xl">
                                            <Image src={profile.avatar || ""} alt={profile.name} fill className="object-cover" priority />
                                        </div>
                                    </TiltWrapper>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{profile.name}</h1>
                                            <ViewToggle viewMode={heroViewMode} setViewMode={setHeroViewMode} />
                                        </div>
                                        <SystemStatus />
                                        <blockquote className="text-lg md:text-xl font-medium text-foreground/80 mt-6 pl-6 border-l-2 border-foreground/10 italic">
                                            {profile.bio.paragraphs[0]}
                                        </blockquote>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                                    {[
                                        { label: "LinkedIn", name: "Connect", href: `https://${siteConfig.contact.linkedin}`, icon: Linkedin },
                                        { label: "Email", name: "Say Hello", href: `mailto:${siteConfig.contact.email}`, icon: Mail },
                                        { label: "GitHub", name: "Codebase", href: `https://${siteConfig.contact.github}`, icon: Github }
                                    ].map((social, i) => (
                                        <Link key={i} href={social.href} target="_blank" className="p-4 rounded-3xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-background rounded-2xl flex items-center justify-center border border-foreground/10"><social.icon size={20} /></div>
                                                <div className="text-left">
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{social.label}</p>
                                                    <h3 className="text-sm font-bold">{social.name}</h3>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="terminal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
                            <div className="absolute top-6 right-8 z-20"><ViewToggle viewMode={heroViewMode} setViewMode={setHeroViewMode} /></div>
                            <Terminal />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

// ============================================================================
// Experience Section
// ============================================================================

export function Experience({ items }: { items: any[] }) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["experience"] ?? true;
    return (
        <div className="mb-2 font-mono max-w-6xl mx-auto px-4 md:px-6" id="experience">
            <SectionHeader title="Experience" isExpanded={isExpanded} onToggle={() => toggleSectionExpanded("experience")} />
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 gap-4 pt-1 overflow-hidden">
                        {items.map((exp, i) => (
                            <SpotlightCard key={i}>
                                <div className="p-4 md:p-6 flex flex-col md:row-gap-4">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {exp.logo && <div className="shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-gray-800 p-1.5 border border-foreground/5 shadow-sm"><Image src={getAssetPath(exp.logo)} alt={exp.company} width={48} height={48} className="w-full h-full object-contain" /></div>}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start"><h3 className="text-lg font-black">{exp.company}</h3><span className="text-xs font-bold opacity-40">{exp.duration}</span></div>
                                            <p className="text-sm font-bold text-foreground/70">{exp.role}</p>
                                            <div className="flex items-center gap-1 text-[10px] opacity-40 mt-1"><MapPin size={10} /><span>{exp.location}</span></div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs pl-4 border-l-2 border-foreground/10 italic text-foreground/60 mb-4" dangerouslySetInnerHTML={{ __html: linkifyTech(exp.description) }} />
                                        {exp.highlights && exp.highlights.length > 0 && (
                                            <ul className="space-y-2 list-none text-[11px] text-foreground/70">
                                                {exp.highlights.map((h: string, idx: number) => (
                                                    <li key={idx} className="flex gap-2 group/item">
                                                        <span className="text-foreground/30 group-hover/item:text-foreground/60 transition-colors">↳</span>
                                                        <span dangerouslySetInnerHTML={{ __html: linkifyTech(h) }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// Tech Stack Section
// ============================================================================

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

export function TechStack() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["techstack"] ?? false;
    const [viewMode, setViewMode] = useState<"list" | "graph">("list");
    return (
        <div className="font-mono max-w-6xl mx-auto px-4 md:px-6 mb-4">
            <SectionHeader title="Tech Stack" isExpanded={isExpanded} onToggle={() => toggleSectionExpanded("techstack")}
                rightElement={
                    <div className="flex bg-foreground/5 p-0.5 rounded-lg border border-foreground/10" onClick={e => e.stopPropagation()}>
                        {["list", "graph"].map(m => (
                            <button key={m} onClick={() => setViewMode(m as any)} className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${viewMode === m ? "bg-background shadow-sm" : "opacity-40"}`}>{m}</button>
                        ))}
                    </div>
                }
            />
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        {viewMode === "list" ? (
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {Object.entries(skillCategories).map(([cat, skills]) => (
                                    <SpotlightCard key={cat}><div className="p-3">
                                        <h3 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">{cat}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => {
                                                const Icon = getTechIcon(skill);
                                                return (
                                                    <Link key={skill} href={techLinks[skill] || "#"} target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-full text-xs font-bold hover:bg-foreground/10 transition-all">
                                                        {Icon && <Icon size={12} className="opacity-50" />}
                                                        {skill}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div></SpotlightCard>
                                ))}
                            </div>
                        ) : <div className="h-[500px] mt-4 rounded-xl border border-foreground/10 overflow-hidden"><ForceGraph2D graphData={{ nodes: [], links: [] }} /></div>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// Shelves Section
// ============================================================================

export function ShelvesSection() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["shelves"] ?? false;
    const shelfIcons: Record<string, any> = { blogs: Feather, articles: FileText, books: Book, anime: MonitorPlay, hobby: Palette };
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-8">
            <div className="glass rounded-[2rem] p-6 md:p-8 border border-white/10 cursor-pointer" onClick={() => toggleSectionExpanded("shelves")}>
                <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight">
                    <div className="h-8 w-1 rounded-full bg-foreground" /> Directories
                    <ChevronDown size={22} className={`transition-transform duration-500 ${isExpanded ? "rotate-180" : "-rotate-90 opacity-40"}`} />
                </h2>
                <div className="flex items-center gap-2 opacity-40 text-sm font-bold ml-4 mt-2"><span>$</span>ls -F ~<span className="animate-pulse w-2 h-4 bg-foreground" /></div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 overflow-hidden">
                            {["blogs", "articles", "books", "anime", "hobby"].map(key => (
                                <Link key={key} href={directoryMap[key]} className="flex items-center gap-5 p-5 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all">
                                    <div className="p-4 rounded-xl bg-background border border-foreground/10">{React.createElement(shelfIcons[key], { size: 22 })}</div>
                                    <div><div className="font-black text-lg">{key}/</div><div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{shelfConfigs[key].description}</div></div>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ============================================================================
// Recent Content Section
// ============================================================================

export function RecentSection({ title, command, items, linkText, linkUrl }: { title: string; command: string; items: any[]; linkText: string; linkUrl: string }) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const id = `recent-${title.toLowerCase().replace(/\s+/g, "-")}`;
    const isExpanded = expandedSections[id] ?? false;
    return (
        <section className="font-mono max-w-6xl mx-auto px-4 md:px-12 mb-8 cursor-pointer" onClick={() => toggleSectionExpanded(id)}>
            <h2 className="text-xl font-black flex items-center gap-2 opacity-90"><span className="opacity-20">##</span>{title}<ChevronDown size={20} className={`transition-transform ${isExpanded ? "rotate-0" : "-rotate-90 opacity-30"}`} /></h2>
            <div className="flex items-center gap-2 opacity-40 text-xs mt-1"><span>$</span>{command}<span className="animate-pulse w-2 h-4 bg-foreground/20" /></div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 overflow-hidden">
                        <div className="space-y-4 glass p-6 rounded-2xl border border-white/10">
                            {items.map((item, i) => (
                                <div key={i} className="pl-4 border-l-2 border-foreground/10">
                                    <span className="text-[10px] font-black opacity-30 uppercase tracking-widest block mb-1">{item.date}</span>
                                    <Link href={item.url} className="text-sm font-bold hover:underline decoration-foreground/20 underline-offset-4">{item.title}</Link>
                                </div>
                            ))}
                        </div>
                        <Link href={linkUrl} className="mt-4 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity block">→ {linkText}</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// ============================================================================
// Contact Section
// ============================================================================

export function ContactSection() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["contact"] ?? false;
    const [copied, setCopied] = useState(false);
    return (
        <div id="contact" className="font-mono max-w-6xl mx-auto px-4 md:px-12 mb-24">
            <SectionHeader title="Let's Talk" isExpanded={isExpanded} onToggle={() => toggleSectionExpanded("contact")} />
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="opacity-60 mb-8 max-w-2xl text-sm font-medium">I'm always open to discussing new opportunities, interesting projects, collaborations, or just chatting about tech, security, and system programming.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href={`https://${siteConfig.contact.linkedin}`} target="_blank" className="p-4 rounded-2xl glass border border-white/10 hover:shadow-lg transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center"><Linkedin size={20} /></div>
                                    <div><p className="text-[10px] font-black uppercase tracking-widest opacity-40">LinkedIn</p><div className="text-sm font-bold">{siteConfig.contact.linkedin.split('/').pop()}</div></div>
                                </div>
                            </Link>
                            <div onClick={() => { navigator.clipboard.writeText(siteConfig.contact.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-4 rounded-2xl glass border border-white/10 hover:shadow-lg transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center">{copied ? <Check size={20} /> : <Mail size={20} />}</div>
                                    <div><p className="text-[10px] font-black uppercase tracking-widest opacity-40">{copied ? "Copied!" : "Email"}</p><div className="text-sm font-bold">{siteConfig.contact.email}</div></div>
                                </div>
                            </div>
                            <Link href={`https://${siteConfig.contact.github}`} target="_blank" className="p-4 rounded-2xl glass border border-white/10 hover:shadow-lg transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center"><Github size={20} /></div>
                                    <div><p className="text-[10px] font-black uppercase tracking-widest opacity-40">GitHub</p><div className="text-sm font-bold">{siteConfig.contact.github.split('/').pop()}</div></div>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// Client Layout Component
// ============================================================================

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
        >
            <DLPProtection />
            <TerminalPreloader />
            <ScrollProgress />
            <div className="page-glow" />
            <GlobalEffect />
            <Navbar />
            <CommandMenu />
            <HobbiesModal />
            {children}
            <ShortcutGuide />
            <MobileDock />
            <MusicPlayer />
            <MusicToggleButton />
            <Footer />
        </ThemeProvider>
    );
}
