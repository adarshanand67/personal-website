/**
 * Props for ProgressBar component.
 * @interface ProgressBarProps
 * @property {number} currentTime - Current playback time in seconds
 * @property {number} duration - Total track duration in seconds
 * @property {Function} onSeek - Callback when user seeks to a new position
 * @property {Function} onDragStateChange - Callback when drag state changes
 */
interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
    onDragStateChange: (isDragging: boolean) => void;
}

/**
 * Progress Bar Component - seekable playback progress indicator.
 * Displays current time, total duration, and allows seeking via slider.
 * @component
 * @param {ProgressBarProps} props - Component props
 */
export function ProgressBar({ currentTime, duration, onSeek, onDragStateChange }: ProgressBarProps) {
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-2 group">
            <div className="flex justify-between text-[11px] font-black text-gray-900 dark:text-green-500 tabular-nums tracking-wider uppercase">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            <div className="relative h-2 bg-black/10 dark:bg-black/40 rounded-full overflow-hidden border border-black/5 dark:border-white/10 shadow-inner">
                <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={(e) => onSeek(parseFloat(e.target.value))}
                    onMouseDown={() => onDragStateChange(true)}
                    onMouseUp={() => onDragStateChange(false)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
            </div>
        </div>
    );
}
