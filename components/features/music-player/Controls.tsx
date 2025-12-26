import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

/**
 * Props for music player Controls component.
 * @interface ControlsProps
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
 * @component
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
                className={`p-2 transition-all ${isShuffle ? "text-[#FA243C]" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                title="Shuffle"
            >
                <Shuffle size={18} strokeWidth={2} />
            </button>

            <div className="flex items-center gap-8">
                <button
                    onClick={onPrev}
                    className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity active:scale-90"
                    title="Previous"
                >
                    <SkipBack size={28} fill="currentColor" strokeWidth={0} />
                </button>

                <button
                    onClick={onTogglePlay}
                    className="w-16 h-16 flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause
                            size={44}
                            className="text-gray-900 dark:text-white"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    ) : (
                        <Play
                            size={44}
                            className="text-gray-900 dark:text-white"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    )}
                </button>

                <button
                    onClick={onNext}
                    className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity active:scale-90"
                    title="Next"
                >
                    <SkipForward size={28} fill="currentColor" strokeWidth={0} />
                </button>
            </div>

            <button
                onClick={onToggleRepeat}
                className={`p-2 transition-all relative ${isRepeat ? "text-[#FA243C]" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
                title="Repeat"
            >
                <Repeat size={18} strokeWidth={2} />
                {isRepeat && (
                    <span className="absolute top-1.5 right-1 text-[8px] font-bold">1</span>
                )}
            </button>
        </div>
    );
}
