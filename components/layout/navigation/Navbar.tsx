"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store/useStore";
import { Menu, X } from "lucide-react";
import { NavBrand } from "./NavBrand";
import { NavLinks } from "./NavLinks";
import { NavActions } from "./NavActions";

/**
 * Modern Navigation Bar Component - sleek floating navbar with blur effect.
 * Features responsive design, smooth animations, and modern glassmorphism.

 */
export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight)
                setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            setIsScrolled(currentScroll > 20);
        };
        window.addEventListener("scroll", updateScroll);
        updateScroll();
        return () => window.removeEventListener("scroll", updateScroll);
    }, [setIsMounted]);

    return (
        <>
            <div className="h-20" />

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[70] h-0.5 bg-transparent pointer-events-none">
                <div
                    className="h-full bg-slate-900 dark:bg-slate-200 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Main Navbar */}
            <nav
                className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300"
                role="navigation"
            >
                <div
                    className={`mx-auto px-4 transition-all duration-500 ${isScrolled ? "py-3" : "py-4"}`}
                >
                    <div
                        className={`max-w-7xl mx-auto backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border transition-all duration-700 ${
                            isScrolled
                                ? "border-foreground/10 shadow-2xl shadow-black/10 dark:shadow-black/40"
                                : "border-foreground/5 shadow-xl shadow-black/5 dark:shadow-black/20"
                        }`}
                    >
                        <div className="px-6">
                            <div
                                className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}
                            >
                                {/* Brand */}
                                <NavBrand />

                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center gap-1">
                                    <NavLinks />
                                </div>

                                {/* Actions */}
                                <div className="hidden md:flex items-center gap-2">
                                    <NavActions isMounted={isMounted} />
                                </div>

                                {/* Mobile Menu Button */}
                                <div className="md:hidden flex items-center gap-2">
                                    <NavActions isMounted={isMounted} />
                                    <button
                                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-95"
                                        onClick={() => setIsNavbarActive(!isNavbarActive)}
                                        aria-label="Toggle menu"
                                    >
                                        {isNavbarActive ? (
                                            <X
                                                size={24}
                                                className="text-black dark:text-gray-400"
                                            />
                                        ) : (
                                            <Menu
                                                size={24}
                                                className="text-black dark:text-gray-400"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isNavbarActive && (
                            <div className="md:hidden border-t border-gray-200/50 dark:border-white/10 animate-slide-up">
                                <div className="px-6 py-4">
                                    <NavLinks
                                        className="flex flex-col gap-1"
                                        onItemClick={() => setIsNavbarActive(false)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
