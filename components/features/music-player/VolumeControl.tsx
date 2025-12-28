import { Volume1, Volume2, VolumeX } from "lucide-react";

/**
 * Props for VolumeControl component.

 * @property {number} volume - Current volume level (0-1)
 * @property {boolean} isMuted - Whether audio is muted
 * @property {Function} onVolumeChange - Callback when volume changes
 * @property {Function} onToggleMute - Callback to toggle mute
 */
interface VolumeControlProps {
    volume: number;
    isMuted: boolean;
    onVolumeChange: (val: number) => void;
    onToggleMute: () => void;
}

/**
 * Volume Control Component - adjustable volume slider with an Apple Music aesthetic.
 * Features a thin slider with speaker icons at both ends.

 * @param {VolumeControlProps} props - Component props
 */
export function VolumeControl({
    volume,
    isMuted,
    onVolumeChange,
    onToggleMute,
}: VolumeControlProps) {
    return (
        <div className="flex items-center gap-3 px-1 group/volume">
            <button
                onClick={onToggleMute}
                className="text-black/20 dark:text-gray-600 hover:text-black dark:hover:text-gray-400 transition-colors shrink-0"
                title={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume1 size={14} />}
            </button>

            <div className="flex-1 h-1 bg-black/5 dark:bg-white/5 rounded-full relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-black/40 dark:bg-gray-500/40 group-hover/volume:bg-black/60 dark:group-hover/volume:bg-gray-400/60 transition-colors rounded-full"
                    style={{ width: `${volume * 100}%` }}
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
            </div>

            <div className="text-black/20 dark:text-gray-600 shrink-0">
                <Volume2 size={14} />
            </div>
        </div>
    );
}
