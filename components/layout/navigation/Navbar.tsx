"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store/useStore";
import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme";
import { NavBrand } from "./NavBrand";
import { NavLinks } from "./NavLinks";
import { NavActions } from "./NavActions";

/**
 * Main Navigation Bar Component - fixed glassmorphic navbar with scroll progress.
 * Features responsive design with mobile menu, theme toggle, and command menu integration.
 * @component
 */
export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        setIsMounted(true);
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, [setIsMounted]);

    return (
        <>
            <div className="h-20" />
            <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200/20 pointer-events-none">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
            </div>
            <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4" role="navigation">
                <div className="w-full max-w-5xl glass rounded-2xl shadow-xl border border-white/20 dark:border-white/5 transition-all duration-500 hover:shadow-2xl">
                    <div className="px-5">
                        <div className="flex items-center h-16">
                            <NavBrand />
                            <div className="hidden md:flex md:items-center gap-2 text-sm font-bold">
                                <NavLinks />
                                <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-3 opacity-50" />
                                <NavActions isMounted={isMounted} />
                            </div>
                            <div className="md:hidden flex items-center gap-2">
                                <button onClick={() => document.dispatchEvent(new Event("open-command-menu"))} className="p-2 rounded-xl text-foreground/70 transition-all"><Search size={20} /></button>
                                <ThemeToggle />
                                <button className="p-2 ml-1 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all" onClick={() => setIsNavbarActive(!isNavbarActive)}>
                                    <Menu size={22} className={isNavbarActive ? "text-green-500" : ""} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {isNavbarActive && (
                        <div className="md:hidden overflow-hidden pb-6 animate-fade-in border-t border-gray-200/50 dark:border-gray-800/50">
                            <NavLinks className="flex flex-col items-center gap-2 text-sm font-mono pt-4" onItemClick={() => setIsNavbarActive(false)} />
                            <div className="flex items-center gap-2 pt-4 w-full justify-center">
                                <button onClick={() => { document.dispatchEvent(new Event("open-command-menu")); setIsNavbarActive(false); }} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-sm font-bold">
                                    <Search className="w-4 h-4" /> <span>Search</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
