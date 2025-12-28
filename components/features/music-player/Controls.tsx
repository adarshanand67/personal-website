import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

/**
 * Props for music player Controls component.

 * @property {boolean} isPlaying - Whether music is currently playing
 * @property {Function} onTogglePlay - Callback to toggle play/pause
 * @property {Function} onNext - Callback to skip to next track
 * @property {Function} onPrev - Callback to go to previous track
 * @property {boolean} isShuffle - Whether shuffle mode is enabled
 * @property {Function} onToggleShuffle - Callback to toggle shuffle mode
 * @property {boolean} isRepeat - Whether repeat mode is enabled
 * @property {Function} onToggleRepeat - Callback to toggle repeat mode
 */
interface ControlsProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onNext: () => void;
    onPrev: () => void;
    isShuffle: boolean;
    onToggleShuffle: () => void;
    isRepeat: boolean;
    onToggleRepeat: () => void;
}

/**
 * Music Player Controls Component - playback control buttons.
 * Features play/pause, skip, shuffle, and repeat controls with an Apple Music aesthetic.

 * @param {ControlsProps} props - Component props
 */
export function Controls({
    isPlaying,
    onTogglePlay,
    onNext,
    onPrev,
    isShuffle,
    onToggleShuffle,
    isRepeat,
    onToggleRepeat,
}: ControlsProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <button
                onClick={onToggleShuffle}
                className={`p-1 transition-all duration-300 hover:scale-110 active:scale-95 ${isShuffle ? "text-black dark:text-gray-400 opacity-100" : "text-black/20 dark:text-white/20 hover:text-black/40 dark:hover:text-white/40"}`}
                title="Shuffle"
            >
                <Shuffle size={14} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-6">
                <button
                    onClick={onPrev}
                    className="text-black/40 dark:text-gray-500 hover:text-black dark:hover:text-gray-300 hover:scale-110 active:scale-90 transition-all duration-300"
                    title="Previous"
                >
                    <SkipBack size={18} fill="currentColor" strokeWidth={0} />
                </button>

                <button
                    onClick={onTogglePlay}
                    className="w-10 h-10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 group bg-black dark:bg-white rounded-full shadow-md"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause
                            size={20}
                            className="text-white dark:text-black"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    ) : (
                        <Play
                            size={20}
                            className="text-white dark:text-black ml-0.5"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    )}
                </button>

                <button
                    onClick={onNext}
                    className="text-black/40 dark:text-gray-500 hover:text-black dark:hover:text-gray-300 hover:scale-110 active:scale-90 transition-all duration-300"
                    title="Next"
                >
                    <SkipForward size={18} fill="currentColor" strokeWidth={0} />
                </button>
            </div>

            <button
                onClick={onToggleRepeat}
                className={`p-1 transition-all duration-300 hover:scale-110 active:scale-95 relative ${isRepeat ? "text-black dark:text-gray-400 opacity-100" : "text-black/20 dark:text-white/20 hover:text-black/40 dark:hover:text-white/40"}`}
                title="Repeat"
            >
                <Repeat size={14} strokeWidth={2.5} />
                {isRepeat && (
                    <span className="absolute -top-1 -right-1 text-[8px] font-black">1</span>
                )}
            </button>
        </div>
    );
}
