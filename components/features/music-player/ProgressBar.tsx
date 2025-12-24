interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
    onDragStateChange: (isDragging: boolean) => void;
}

export function ProgressBar({ currentTime, duration, onSeek, onDragStateChange }: ProgressBarProps) {
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-1 group">
            <div className="flex justify-between text-[9px] font-mono text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            <div className="relative h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
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
