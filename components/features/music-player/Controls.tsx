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
 * Features play/pause, skip, shuffle, and repeat controls with visual feedback.
 * @component
 * @param {ControlsProps} props - Component props
 */
export function Controls({
    isPlaying, onTogglePlay, onNext, onPrev, isShuffle, onToggleShuffle, isRepeat, onToggleRepeat
}: ControlsProps) {
    return (
        <div className="flex items-center justify-between px-1">
            <button
                onClick={onToggleShuffle}
                className={`p-2 rounded-xl transition-all ${isShuffle ? 'text-green-500 bg-green-500/20' : 'text-gray-400 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-500/10'}`}
                title="Shuffle"
            >
                <Shuffle size={20} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-6">
                <button
                    onClick={onPrev}
                    className="p-1.5 text-gray-500 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-all hover:scale-120 active:scale-90"
                    title="Previous"
                >
                    <SkipBack size={24} fill="currentColor" strokeWidth={0} />
                </button>

                <button
                    onClick={onTogglePlay}
                    className="w-14 h-14 bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-400 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] dark:shadow-[0_0_30px_rgba(34,197,94,0.2)] group"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ?
                        <Pause size={28} className="text-white dark:text-black" fill="currentColor" strokeWidth={0} /> :
                        <Play size={28} className="text-white dark:text-black ml-1" fill="currentColor" strokeWidth={0} />
                    }
                </button>

                <button
                    onClick={onNext}
                    className="p-1.5 text-gray-500 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-all hover:scale-120 active:scale-90"
                    title="Next"
                >
                    <SkipForward size={24} fill="currentColor" strokeWidth={0} />
                </button>
            </div>

            <button
                onClick={onToggleRepeat}
                className={`p-2 rounded-xl transition-all relative ${isRepeat ? 'text-green-500 bg-green-500/20' : 'text-gray-400 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-500/10'}`}
                title="Repeat"
            >
                <Repeat size={20} strokeWidth={2.5} />
                {isRepeat && <span className="absolute top-1.5 right-1.5 text-[8px] font-black">1</span>}
            </button>
        </div>
    );
}
