import { useStore } from "@/lib/store/useStore";
import { Music } from "lucide-react";

export function MusicToggleButton() {
    const { showMusicPlayer, toggleMusicPlayer, isPlaying } = useStore();

    return (
        <button
            onClick={toggleMusicPlayer}
            className={`
                fixed bottom-8 right-8 z-40
                p-3 rounded-full
                bg-gradient-to-br from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                shadow-lg hover:shadow-xl
                transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                border-2 border-green-400/50
                group
                ${showMusicPlayer ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}
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
            {isPlaying && !showMusicPlayer && (
                <div
                    className="flex gap-[2px] items-center justify-center absolute -top-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white dark:border-gray-900 overflow-hidden w-6 h-6 shadow-sm"
                    title="Music is playing"
                >
                    <div className="w-[2px] bg-white animate-[music-bar-1_1s_ease-in-out_infinite]" />
                    <div className="w-[2px] bg-white animate-[music-bar-2_0.8s_ease-in-out_infinite]" />
                    <div className="w-[2px] bg-white animate-[music-bar-3_1.2s_ease-in-out_infinite]" />
                </div>
            )}
            {!showMusicPlayer && (
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            )}
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
