import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

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

export function Controls({
    isPlaying, onTogglePlay, onNext, onPrev, isShuffle, onToggleShuffle, isRepeat, onToggleRepeat
}: ControlsProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <button
                onClick={onToggleShuffle}
                className={`p-1.5 transition-colors ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
            >
                <Shuffle size={16} />
            </button>

            <div className="flex items-center gap-4">
                <button onClick={onPrev} className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                    <SkipBack size={20} fill="currentColor" />
                </button>
                <button
                    onClick={onTogglePlay}
                    className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                    {isPlaying ? <Pause size={20} className="text-white dark:text-black" fill="currentColor" /> : <Play size={20} className="text-white dark:text-black ml-0.5" fill="currentColor" />}
                </button>
                <button onClick={onNext} className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                    <SkipForward size={20} fill="currentColor" />
                </button>
            </div>

            <button
                onClick={onToggleRepeat}
                className={`p-1.5 transition-colors relative ${isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
            >
                <Repeat size={16} />
                {isRepeat && <span className="absolute top-0 right-0 text-[8px] font-bold">1</span>}
            </button>
        </div>
    );
}
