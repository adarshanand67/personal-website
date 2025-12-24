"use client";

/**
 * Props for TerminalHeader component.
 * @interface TerminalHeaderProps
 * @property {Function} onMouseDown - Mouse down handler for drag functionality
 */
interface TerminalHeaderProps {
    onMouseDown: (e: React.MouseEvent) => void;
}

/**
 * Terminal Header Component - macOS-style terminal window header.
 * Features colored window control buttons and username@host display.
 * Supports drag functionality for repositioning the terminal window.
 * @component
 * @param {TerminalHeaderProps} props - Component props
 */
export function TerminalHeader({ onMouseDown }: TerminalHeaderProps) {
    return (
        <div
            onMouseDown={onMouseDown}
            className="bg-white/50 dark:bg-white/5 px-4 h-8 flex items-center gap-2 border-b border-white/20 dark:border-white/10 cursor-grab active:cursor-grabbing select-none"
        >
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-xs font-medium opacity-80">
                adarsh@linux:~
            </span>
        </div>
    );
}
