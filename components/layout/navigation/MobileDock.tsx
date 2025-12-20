"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Tv, BookOpen, Search } from "lucide-react";
import { routes } from "@/lib/constants";
import { motion } from "framer-motion";

const navItems = [
    { icon: Home, label: "Home", path: routes.home },
    { icon: FileText, label: "Blog", path: routes.articleShelf },
    { icon: Tv, label: "Anime", path: routes.animeShelf },
    { icon: BookOpen, label: "Books", path: routes.bookShelf },
];

export function MobileDock() {
    const pathname = usePathname();

    const openCommandMenu = () => {
        document.dispatchEvent(new Event("open-command-menu"));
    };

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
            <div className="glass-apple dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl px-6 py-3 flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            className="relative flex flex-col items-center gap-1 group"
                        >
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-green-500 text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-green-500'}`}>
                                <item.icon size={20} />
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="dock-dot"
                                    className="absolute -bottom-1 w-1 h-1 bg-green-500 rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
                <button
                    onClick={openCommandMenu}
                    className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors p-2"
                >
                    <Search size={22} />
                </button>
            </div>
        </div>
    );
}
