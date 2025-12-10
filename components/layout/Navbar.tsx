"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { useUISound } from "@/hooks/useUISound";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "lucide-react";
import GlitchLink from "@/components/ui/GlitchLink";
import { ROUTES } from "@/lib/constants";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isSoundEnabled } = useGlobalState();
  const { playSound } = useUISound(isSoundEnabled);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="h-24" /> {/* Spacer for floating nav */}
      <nav
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="w-full max-w-5xl glass rounded-2xl shadow-sm transition-all duration-300">
          <div className="px-4 md:px-6">
            <div className="flex items-center h-14">
              {/* Hamburger - Left side on mobile */}
              <button
                className={`md:hidden p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded={isActive}
                onClick={() => {
                  playSound('click');
                  setIsActive(!isActive);
                }}
                onMouseEnter={() => playSound('hover')}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isActive ? "rotate-45 translate-y-1.5" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isActive ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isActive ? "-rotate-45 -translate-y-2" : ""}`}
                  />
                </div>
              </button>

              {/* Brand: Terminal Home Style */}
              <Link
                href={ROUTES.HOME}
                className="text-lg font-bold text-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2 font-mono whitespace-nowrap mr-auto md:mr-0"
              >
                ~/
              </Link>

              {/* Mobile: Theme toggle on right */}
              <div className="md:hidden">
                <ThemeToggle />
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex md:items-center md:ml-auto gap-1 text-sm font-medium">
                <GlitchLink
                  href={ROUTES.BLOG_SHELF}
                  className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                >
                  Blogshelf
                </GlitchLink>

                <GlitchLink
                  href={ROUTES.PAPER_SHELF}
                  className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                >
                  Papershelf
                </GlitchLink>

                <GlitchLink
                  href={ROUTES.ANIME_SHELF}
                  className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                >
                  Animeshelf
                </GlitchLink>

                <GlitchLink
                  href={ROUTES.BOOK_SHELF}
                  className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                >
                  Bookshelf
                </GlitchLink>

                <GlitchLink
                  href={ROUTES.HOBBY_SHELF}
                  className="px-3 py-2 rounded-lg text-foreground/80 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono transition-colors"
                >
                  HobbyShelf
                </GlitchLink>

                {/* Divider */}
                <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-2"></div>

                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground/80 hover:text-green-600 dark:hover:text-green-400 transition-all"
                    onClick={() => {
                      playSound('click');
                      document.dispatchEvent(new Event("open-command-menu"));
                    }}
                    onMouseEnter={() => playSound('hover')}
                    aria-label="Search"
                  >
                    {mounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              id="menu"
              className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-80 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="flex flex-col items-center gap-2 text-sm font-mono pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
                <Link
                  href={ROUTES.BLOG_SHELF}
                  className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                  onClick={() => setIsActive(false)}
                >
                  Blogshelf
                </Link>
                <Link
                  href={ROUTES.PAPER_SHELF}
                  className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                  onClick={() => setIsActive(false)}
                >
                  Papershelf
                </Link>
                <Link
                  href={ROUTES.ANIME_SHELF}
                  className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                  onClick={() => setIsActive(false)}
                >
                  Animeshelf
                </Link>
                <Link
                  href={ROUTES.BOOK_SHELF}
                  className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                  onClick={() => setIsActive(false)}
                >
                  Bookshelf
                </Link>
                <Link
                  href={ROUTES.HOBBY_SHELF}
                  className="w-full text-center py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                  onClick={() => setIsActive(false)}
                >
                  HobbyShelf
                </Link>

                <div className="flex items-center gap-2 pt-2 w-full justify-center">
                  <button
                    onClick={() => {
                      document.dispatchEvent(new Event("open-command-menu"));
                      setIsActive(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all"
                  >
                    {mounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
