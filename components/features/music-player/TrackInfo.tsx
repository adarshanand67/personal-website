import Image from "next/image";
import { ChevronDown, Maximize2 } from "lucide-react";
import { tracks } from "@/lib/constants/music";
import Link from "next/link";

/**
 * Props for TrackInfo component.

 * @property {number} index - Current track index in playlist
 * @property {Function} onClose - Callback to close/minimize music player
 */
interface TrackInfoProps {
    index: number;
    onClose: () => void;
}

/**
 * Track Info Component - displays current track metadata and album art.
 * Shows track name, artist, and album artwork with maximize and close buttons.

 * @param {TrackInfoProps} props - Component props
 */
export function TrackInfo({ index, onClose }: TrackInfoProps) {
    const trackList = tracks || [];
    const track = trackList[index];

    if (!track) {
        return (
            <div className="flex gap-4 items-center animate-pulse">
                <div className="w-20 h-20 shrink-0 bg-foreground/5 rounded-[1.5rem]" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 w-24 bg-foreground/5 rounded" />
                    <div className="h-3 w-16 bg-foreground/5 rounded" />
                </div>
                <button onClick={onClose} className="p-1.5">
                    <ChevronDown size={20} className="text-foreground/20" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-4 items-center">
            <div className="relative w-20 h-20 shrink-0 rounded-[1.5rem] overflow-hidden shadow-xl border border-foreground/10 group-hover:scale-105 transition-all duration-700">
                <Image
                    src={track.image || "/icon.png"}
                    alt={track.title || "Album Art"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-lg font-black line-clamp-1 text-foreground leading-tight tracking-tighter">
                    {track.title || "Unknown Track"}
                </span>
                <span className="text-xs text-foreground/40 font-bold mt-0.5 line-clamp-1 uppercase tracking-[0.2em]">
                    {track.artist || "Unknown Artist"}
                </span>
            </div>
            <div className="flex gap-1">
                <Link
                    href="/music"
                    className="p-1.5 hover:bg-foreground/5 rounded-full transition-all shrink-0 hover:scale-110 active:scale-90 group/maximize"
                    aria-label="Open Full Player"
                >
                    <Maximize2
                        size={20}
                        className="text-foreground/20 group-hover/maximize:text-foreground transition-colors"
                    />
                </Link>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-foreground/5 rounded-full transition-all shrink-0 hover:scale-110 active:scale-90 group/close"
                    aria-label="Minimize Player"
                >
                    <ChevronDown
                        size={20}
                        className="text-foreground/20 group-hover/close:text-foreground transition-colors"
                    />
                </button>
            </div>
        </div>
    );
}
