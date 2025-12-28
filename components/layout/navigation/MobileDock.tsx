"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Tv, BookOpen, Music, Gamepad2 } from "lucide-react";
import { routes } from "@/lib/constants";

import { motion } from "framer-motion";

const navItems = [
    { icon: Home, label: "Home", path: routes.home },
    { icon: FileText, label: "Articles", path: routes.articleShelf },
    { icon: BookOpen, label: "Books", path: routes.bookShelf },
    { icon: Tv, label: "Anime", path: routes.animeShelf },
    { icon: Gamepad2, label: "Hobbies", path: routes.hobbyShelf },
];

/**
 * Mobile Dock Component - floating bottom navigation for mobile devices.
 * Features glassmorphic design with active state indicators and search button.
 * Only visible on mobile screens (md breakpoint and below).

 */
export function MobileDock() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px]">
            <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 rounded-t-[32px] shadow-xl px-6 py-4 flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            className="relative flex flex-col items-center gap-1 group"
                        >
                            <div
                                className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200"}`}
                            >
                                <item.icon size={20} />
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="dock-dot"
                                    className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full"
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
                        className={`p-2 rounded-xl transition-all duration-300 ${pathname === routes.music ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 hover:text-black dark:hover:text-gray-200"}`}
                    >
                        <Music size={20} />
                    </div>
                    {pathname === routes.music && (
                        <motion.div
                            layoutId="dock-dot"
                            className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full"
                        />
                    )}
                </Link>
            </div>
        </div>
    );
}
