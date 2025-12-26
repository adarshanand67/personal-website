"use client";

import { User, Terminal as TerminalIcon } from "lucide-react";

/**
 * Props for ViewToggle component.
 * @interface ViewToggleProps
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
 * @component
 * @param {ViewToggleProps} props - Component props
 */
export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => (
    <div className="hidden md:flex bg-transparent p-1 rounded-xl ml-auto pointer-events-auto gap-1">
        <button
            onClick={() => setViewMode("profile")}
            className={`flex items-center gap-2 px-4 py-2 transition-all ${
                viewMode === "profile"
                    ? "font-bold text-zinc-900 dark:text-white scale-105"
                    : "font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
            title="Switch to Profile"
        >
            <User
                size={14}
                className={viewMode === "profile" ? "stroke-[2.5px]" : "stroke-[2px]"}
            />
            <span>Profile</span>
        </button>
        <button
            onClick={() => setViewMode("terminal")}
            className={`flex items-center gap-2 px-4 py-2 transition-all ${
                viewMode === "terminal"
                    ? "font-bold text-zinc-900 dark:text-white scale-105"
                    : "font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
            title="Switch to Terminal"
        >
            <TerminalIcon
                size={14}
                className={viewMode === "terminal" ? "stroke-[2.5px]" : "stroke-[2px]"}
            />
            <span>Terminal</span>
        </button>
    </div>
);
