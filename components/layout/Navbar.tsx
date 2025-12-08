"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="h-14" />
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-background transition-all duration-300 font-mono"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Hamburger - Left side on mobile */}
            <button
              className={`md:hidden p-2 mr-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded={isActive}
              onClick={() => setIsActive(!isActive)}
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

            {/* Brand */}
            <Link
              href="/"
              className="text-lg font-bold text-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              ~/adarsh
            </Link>

            {/* Mobile: Theme toggle on right */}
            <div className="md:hidden ml-auto">
              <ThemeToggle />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:ml-auto gap-0">
              <Link
                href="/blogshelf"
                className="px-4 py-3 text-base text-foreground/80 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Blogshelf
              </Link>
              <Link
                href="/papershelf"
                className="px-4 py-3 text-base text-foreground/80 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Papershelf
              </Link>
              <Link
                href="/animeshelf"
                className="px-4 py-3 text-base text-foreground/80 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Animeshelf
              </Link>
              <Link
                href="/bookshelf"
                className="px-4 py-3 text-base text-foreground/80 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Bookshelf
              </Link>
              <Link
                href="/hobbieshelf"
                className="px-4 py-3 text-base text-foreground/80 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Hobbieshelf
              </Link>

              <span className="text-gray-400 mx-1">|</span>

              <button
                className="px-3 py-1.5 flex items-center gap-1.5 text-sm text-foreground/80 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                onClick={() => document.dispatchEvent(new Event("open-command-menu"))}
                aria-label="Search"
              >
                {mounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />}
                <kbd className="text-xs text-gray-500">⌘K</kbd>
              </button>

              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            id="menu"
            className={`md:hidden overflow-hidden transition-all duration-200 ${isActive ? "max-h-64 pb-4" : "max-h-0"
              }`}
          >
            <div className="flex flex-col gap-1 text-sm">
              <Link
                href="/blogshelf"
                className="py-2 hover:text-green-600 dark:hover:text-green-400"
                onClick={() => setIsActive(false)}
              >
                Blogshelf
              </Link>
              <Link
                href="/papershelf"
                className="py-2 hover:text-green-600 dark:hover:text-green-400"
                onClick={() => setIsActive(false)}
              >
                Papershelf
              </Link>
              <Link
                href="/animeshelf"
                className="py-2 hover:text-green-600 dark:hover:text-green-400"
                onClick={() => setIsActive(false)}
              >
                Animeshelf
              </Link>
              <Link
                href="/bookshelf"
                className="py-2 hover:text-green-600 dark:hover:text-green-400"
                onClick={() => setIsActive(false)}
              >
                Bookshelf
              </Link>
              <Link
                href="/hobbieshelf"
                className="py-2 hover:text-green-600 dark:hover:text-green-400"
                onClick={() => setIsActive(false)}
              >
                Hobbieshelf
              </Link>

              <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => document.dispatchEvent(new Event("open-command-menu"))}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                >
                  {mounted ? <Search className="w-4 h-4" /> : <div className="w-4 h-4" />} Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
