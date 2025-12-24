"use client";

import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme";

/**
 * Props for NavActions component.
 * @interface NavActionsProps
 * @property {boolean} isMounted - Whether component is mounted (for SSR safety)
 */
interface NavActionsProps {
    isMounted: boolean;
}

/**
 * Navigation Actions Component - search button and theme toggle.
 * Displays action buttons in the navbar (search, theme switcher).
 * @component
 * @param {NavActionsProps} props - Component props
 */
export function NavActions({ isMounted }: NavActionsProps) {
    const handleSearchClick = () => {
        document.dispatchEvent(new Event("open-command-menu"));
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-green-500/5 text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-all border border-gray-200 dark:border-gray-700"
                onClick={handleSearchClick}
                aria-label="Search"
                title="Search (⌘K)"
            >
                {isMounted ? (
                    <>
                        <Search size={18} />
                        <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-400">Search</span>
                        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </>
                ) : (
                    <div className="w-4 h-4" />
                )}
            </button>
            <ThemeToggle />
        </div>
    );
}
