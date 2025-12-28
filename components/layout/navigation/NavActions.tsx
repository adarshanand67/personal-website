"use client";

import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme";

/**
 * Props for NavActions component.

 * @property {boolean} isMounted - Whether component is mounted (for SSR safety)
 */
interface NavActionsProps {
    isMounted: boolean;
}

/**
 * Navigation Actions Component - search button and theme toggle.
 * Displays action buttons in the navbar (search, theme switcher).

 * @param {NavActionsProps} props - Component props
 */
export function NavActions({ isMounted }: NavActionsProps) {
    const handleSearchClick = () => {
        document.dispatchEvent(new Event("open-command-menu"));
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-all border border-foreground/10"
                onClick={handleSearchClick}
                aria-label="Search"
                title="Search (⌘K)"
            >
                {isMounted ? (
                    <>
                        <Search size={22} className="text-black dark:text-gray-400" />
                        <span className="hidden md:inline text-sm text-foreground/50">Search</span>
                        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-foreground/5 border border-foreground/10 rounded">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </>
                ) : (
                    <div className="w-5 h-5" />
                )}
            </button>
            <ThemeToggle />
        </div>
    );
}
