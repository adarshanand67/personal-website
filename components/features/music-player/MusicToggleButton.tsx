"use client";

import { Music } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

/**
 * Music Toggle Button Component - floating action button to open music player.
 * Features animated pulse effect when music is playing and ping indicator.
 * Fixed position in bottom-right corner with scale animations on hover/click.

 */
export function MusicToggleButton() {
    const { toggleMusicPlayer, isPlaying } = useStore();
    return (
        <button
            onClick={toggleMusicPlayer}
            className="hidden md:flex fixed bottom-8 right-8 z-[101] w-14 h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
            title="Open Music Player"
        >
            <div className={`relative ${isPlaying ? "animate-pulse" : ""}`}>
                <Music size={22} className="text-black dark:text-gray-400" />
                {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-gray-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black dark:bg-gray-400"></span>
                    </span>
                )}
            </div>
        </button>
    );
}
