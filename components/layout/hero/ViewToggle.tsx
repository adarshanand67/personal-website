"use client";

import { User, Terminal as TerminalIcon } from "lucide-react";

/**
 * Props for ViewToggle component.

 * @property {'profile'|'terminal'} viewMode - Current active view mode
 * @property {Function} setViewMode - Callback to switch between view modes
 */
interface ViewToggleProps {
    viewMode: "profile" | "terminal";
    setViewMode: (mode: "profile" | "terminal") => void;
}

/**
 * View Toggle Component - switches between profile and terminal views in Hero section.
 * Features subtle toggle design with icon and text labels.

 * @param {ViewToggleProps} props - Component props
 */
export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => (
    <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 ml-auto pointer-events-auto shadow-sm gap-1">
        <button
            onClick={() => setViewMode("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "profile"
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
            title="Switch to Profile"
        >
            <User size={14} />
            <span>Profile</span>
        </button>
        <button
            onClick={() => setViewMode("terminal")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "terminal"
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
            title="Switch to Terminal"
        >
            <TerminalIcon size={14} />
            <span>Terminal</span>
        </button>
    </div>
);
