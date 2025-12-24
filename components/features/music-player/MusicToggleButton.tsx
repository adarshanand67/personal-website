"use client";

import { Music } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

/**
 * Music Toggle Button Component - floating action button to open music player.
 * Features animated pulse effect when music is playing and ping indicator.
 * Fixed position in bottom-right corner with scale animations on hover/click.
 * @component
 */
export function MusicToggleButton() {
    const { toggleMusicPlayer, isPlaying } = useStore();
    return (
        <button
            onClick={toggleMusicPlayer}
            className="fixed bottom-8 right-8 z-[101] w-12 h-12 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            title="Open Music Player"
        >
            <div className={`relative ${isPlaying ? 'animate-pulse' : ''}`}>
                <Music size={22} />
                {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                )}
            </div>
        </button>
    );
}
