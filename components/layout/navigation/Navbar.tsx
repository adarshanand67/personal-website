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
            <div className="h-20" />
            <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200/20 pointer-events-none">
                <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            <nav
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="w-full max-w-5xl glass rounded-2xl shadow-xl shadow-black/5 border border-white/20 dark:border-white/5 transition-all duration-500 hover:shadow-2xl">
                    <div className="px-5">
                        <div className="flex items-center h-16">
                            <Link
                                href={routes.home}
                                className="text-xl font-black title-gradient tracking-tight flex items-center gap-3 mr-auto group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-green-500/20">
                                    ~
                                </div>
                                Adarsh
                            </Link>

                            <div className="hidden md:flex md:items-center gap-2 text-sm font-bold">
                                <Link
                                    href={routes.articleShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/5 transition-all"
                                >
                                    Articles
                                </Link>
                                <Link
                                    href={routes.bookShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/5 transition-all"
                                >
                                    Books
                                </Link>
                                <Link
                                    href={routes.animeShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/5 transition-all"
                                >
                                    Anime
                                </Link>
                                <Link
                                    href={routes.hobbyShelf}
                                    className="px-4 py-2 rounded-xl text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/5 transition-all"
                                >
                                    Hobby
                                </Link>

                                <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-3 opacity-50"></div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-green-500/5 text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                        onClick={() => {
                                            document.dispatchEvent(new Event("open-command-menu"));
                                        }}
                                        aria-label="Search"
                                    >
                                        {isMounted ? <Search size={18} /> : <div className="w-4 h-4" />}
                                    </button>
                                    <ThemeToggle />
                                </div>
                            </div>

                            <div className="md:hidden flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        document.dispatchEvent(new Event("open-command-menu"));
                                    }}
                                    className="p-2 rounded-xl text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-all"
                                >
                                    <Search size={20} />
                                </button>
                                <ThemeToggle />
                                <button
                                    className="p-2 ml-1 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                                    onClick={() => setIsNavbarActive(!isNavbarActive)}
                                >
                                    <Menu size={22} className={isNavbarActive ? "text-green-600" : ""} />
                                </button>
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
