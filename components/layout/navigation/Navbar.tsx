"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store/useStore";
import { routes } from "@/lib/constants";
import { ThemeToggle } from "@/components/layout/theme";
import { Menu, Search } from "lucide-react";

export function Navbar() {
    const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } = useStore();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        setIsMounted(true);
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            }
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, [setIsMounted]);

    return (
        <>
            <div className="h-24" />
            <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200/20 pointer-events-none">
                <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
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
                                    href={routes.bookShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/80 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-medium"
                                >
                                    Books
                                </Link>
                                <Link
                                    href={routes.animeShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/80 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400 transition-all font-medium"
                                >
                                    Anime
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
