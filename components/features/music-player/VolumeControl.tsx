import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
    volume: number;
    isMuted: boolean;
    onVolumeChange: (val: number) => void;
    onToggleMute: () => void;
}

export function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }: VolumeControlProps) {
    return (
        <div className="flex items-center gap-3 px-2 group">
            <button onClick={onToggleMute} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full relative">
                <div
                    className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-green-500/80 rounded-full"
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
        </div>
    );
}
