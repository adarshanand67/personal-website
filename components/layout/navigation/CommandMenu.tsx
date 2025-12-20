"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Search,
    Home,
    FileText,
    BookOpen,
    Tv,
    Gamepad2,
    Sun,
    Moon,
    Laptop,
    Github,
    Linkedin,
    Mail,
    ArrowRight,
    Command as CommandIcon,
} from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

type CommandGroup = {
    group: string;
    items: {
        icon: any;
        label: string;
        action: () => void;
        shortcut?: string;
    }[];
};

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { setTheme } = useTheme();
    const { toggleHobbiesModal } = useStore();
    const listRef = useRef<HTMLDivElement>(null);

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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const commandGroups: CommandGroup[] = [
        {
            group: "Navigation",
            items: [
                { icon: Home, label: "Home", action: () => router.push("/") },
                { icon: FileText, label: "Articleshelf", action: () => router.push("/articleshelf") },
                { icon: Tv, label: "Animeshelf", action: () => router.push("/animeshelf") },
                { icon: BookOpen, label: "Bookshelf", action: () => router.push("/bookshelf") },
                { icon: Gamepad2, label: "Hobbyshelf", action: () => router.push("/hobbyshelf") },
            ]
        },
        {
            group: "Home Sections",
            items: [
                { icon: ArrowRight, label: "Jump to Hero", action: () => scrollToSection("hero") },
                { icon: ArrowRight, label: "Jump to Experience", action: () => scrollToSection("experience") },
                { icon: ArrowRight, label: "Jump to Tech Stack", action: () => scrollToSection("techstack") },
                { icon: ArrowRight, label: "Jump to Contact", action: () => scrollToSection("contact") },
            ]
        },
        {
            group: "Appearance",
            items: [
                { icon: Sun, label: "Light Mode", action: () => setTheme("light") },
                { icon: Moon, label: "Dark Mode", action: () => setTheme("dark") },
                { icon: Laptop, label: "System Theme", action: () => setTheme("system") },
            ]
        },
        {
            group: "Social",
            items: [
                { icon: Github, label: "GitHub", action: () => window.open(`https://${siteConfig.contact.github}`, "_blank") },
                { icon: Linkedin, label: "LinkedIn", action: () => window.open(`https://${siteConfig.contact.linkedin}`, "_blank") },
                { icon: Mail, label: "Contact Email", action: () => window.open(`mailto:${siteConfig.contact.email}`) },
            ]
        }
    ];

    const allItems = commandGroups.flatMap(g => g.items);
    const filteredItems = allItems.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    runCommand(filteredItems[selectedIndex].action);
                }
            }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [open, filteredItems, selectedIndex, runCommand]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="w-full max-w-[600px] bg-white/90 dark:bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden pointer-events-auto overflow-hidden"
                    >
                        <div className="flex items-center border-b border-gray-100 dark:border-white/5 px-4 h-14">
                            <Search className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for anything..."
                                className="w-full bg-transparent border-none outline-none text-base dark:text-white placeholder:text-gray-500 font-medium"
                                autoFocus
                            />
                            <div className="flex items-center gap-1.5 ml-auto">
                                <span className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/10 text-[10px] text-gray-400 font-mono">ESC</span>
                            </div>
                        </div>

                        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2 px-2 custom-scrollbar">
                            {filteredItems.length === 0 ? (
                                <div className="py-12 text-center text-gray-500 text-sm">
                                    No results found for &ldquo;{search}&rdquo;
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {commandGroups.map((group) => {
                                        const groupFiltered = group.items.filter(item =>
                                            item.label.toLowerCase().includes(search.toLowerCase())
                                        );
                                        if (groupFiltered.length === 0) return null;

                                        return (
                                            <div key={group.group} className="space-y-1">
                                                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                                    {group.group}
                                                </div>
                                                {groupFiltered.map((item) => {
                                                    const globalIndex = filteredItems.indexOf(item);
                                                    const isSelected = globalIndex === selectedIndex;
                                                    return (
                                                        <button
                                                            key={item.label}
                                                            onClick={() => runCommand(item.action)}
                                                            className={`
                                                                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                                                                ${isSelected
                                                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'}
                                                            `}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <item.icon size={18} className={isSelected ? 'text-white' : 'text-gray-400 dark:text-gray-500'} />
                                                                <span className="font-medium">{item.label}</span>
                                                            </div>
                                                            {isSelected && (
                                                                <div className="flex items-center gap-1.5 opacity-80">
                                                                    <span className="text-[10px] font-mono">Enter</span>
                                                                    <ArrowRight size={14} />
                                                                </div>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 px-4 h-10 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="p-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">↑↓</span>
                                    <span>Navigate</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="p-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">↵</span>
                                    <span>Select</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <CommandIcon size={12} />
                                <span className="font-mono">K</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
