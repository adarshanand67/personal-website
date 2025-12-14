"use client";

import { Music } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

/**
 * Floating button to toggle music player visibility
 * Positioned in bottom-right corner for easy access
 */
export default function MusicToggleButton() {
    const { showMusicPlayer, toggleMusicPlayer } = useStore();

    return (
        <button
            onClick={toggleMusicPlayer}
            className={`
                fixed bottom-8 left-8 z-40
                p-3 rounded-full
                bg-gradient-to-br from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                shadow-lg hover:shadow-xl
                transition-all duration-300
                border-2 border-green-400/50
                group
                ${showMusicPlayer ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}
            `}
            aria-label={showMusicPlayer ? "Hide Music Player" : "Show Music Player"}
            title={showMusicPlayer ? "Hide Music Player" : "Show Music Player"}
        >
            <Music
                className={`
                    w-5 h-5 text-white
                    transition-transform duration-300
                    ${showMusicPlayer ? 'rotate-0' : 'group-hover:rotate-12'}
                `}
            />

            {/* Pulse effect when hidden */}
            {!showMusicPlayer && (
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            )}

            {/* Tooltip */}
            <span className="
                absolute bottom-full left-0 mb-2
                px-3 py-1.5 rounded-lg
                bg-gray-900 text-white text-sm
                whitespace-nowrap
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                pointer-events-none
                shadow-lg
            ">
                {showMusicPlayer ? 'Hide Music' : 'Show Music'}
            </span>
        </button>
    );
}
