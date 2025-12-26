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
 * Features glassmorphic design with icon and text labels.
 * @component
 * @param {ViewToggleProps} props - Component props
 */
export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => (
    <div className="flex bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-lg border border-gray-200 dark:border-gray-700 ml-auto pointer-events-auto shadow-sm">
        <button
            onClick={() => setViewMode("profile")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                viewMode === "profile"
                    ? "bg-white dark:bg-black text-green-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            title="Switch to Profile"
        >
            <User size={14} className="sm:w-4 sm:h-4" />
            <span className="max-sm:hidden">Profile</span>
        </button>
        <button
            onClick={() => setViewMode("terminal")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                viewMode === "terminal"
                    ? "bg-white dark:bg-black text-green-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            title="Switch to Terminal"
        >
            <TerminalIcon size={14} className="sm:w-4 sm:h-4" />
            <span className="max-sm:hidden">Terminal</span>
        </button>
    </div>
);
