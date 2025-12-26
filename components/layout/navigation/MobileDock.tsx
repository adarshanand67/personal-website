"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Tv, BookOpen, Music } from "lucide-react";
import { routes } from "@/lib/constants";

import { motion } from "framer-motion";

const navItems = [
    { icon: Home, label: "Home", path: routes.home },
    { icon: FileText, label: "Articles", path: routes.articleShelf },
    { icon: BookOpen, label: "Books", path: routes.bookShelf },
    { icon: Tv, label: "Anime", path: routes.animeShelf },
];

/**
 * Mobile Dock Component - floating bottom navigation for mobile devices.
 * Features glassmorphic design with active state indicators and search button.
 * Only visible on mobile screens (md breakpoint and below).
 * @component
 */
export function MobileDock() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px]">
            <div className="glass-apple dark:bg-black/80 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 rounded-t-[32px] shadow-2xl px-6 py-4 flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            className="relative flex flex-col items-center gap-1 group"
                        >
                            <div
                                className={`p-2 transition-all duration-300 ${isActive ? "text-slate-900 dark:text-white scale-125" : "text-slate-400 dark:text-gray-500 opacity-60 hover:opacity-100"}`}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="dock-dot"
                                    className="absolute -bottom-1 w-1 h-1 bg-slate-900 dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                />
                            )}
                        </Link>
                    );
                })}
                {/* Music Button - Managed same as others for consistent styling */}
                <Link
                    href={routes.music}
                    className="relative flex flex-col items-center gap-1 group"
                >
                    <div
                        className={`p-2 transition-all duration-300 ${pathname === routes.music ? "text-slate-900 dark:text-white scale-125" : "text-slate-400 dark:text-gray-500 opacity-60 hover:opacity-100"}`}
                    >
                        <Music size={20} strokeWidth={pathname === routes.music ? 3 : 2} />
                    </div>
                    {pathname === routes.music && (
                        <motion.div
                            layoutId="dock-dot"
                            className="absolute -bottom-1 w-1 h-1 bg-slate-900 dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        />
                    )}
                </Link>
            </div>
        </div>
    );
}
