"use client";

import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme";

interface NavActionsProps {
    isMounted: boolean;
}

export function NavActions({ isMounted }: NavActionsProps) {
    const handleSearchClick = () => {
        document.dispatchEvent(new Event("open-command-menu"));
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-green-500/5 text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-all"
                onClick={handleSearchClick}
                aria-label="Search"
            >
                {isMounted ? <Search size={18} /> : <div className="w-4 h-4" />}
            </button>
            <ThemeToggle />
        </div>
    );
}
