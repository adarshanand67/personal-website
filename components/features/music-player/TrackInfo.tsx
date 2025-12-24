import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { trackNames, trackImages } from "@/lib/constants";

interface TrackInfoProps {
    index: number;
    onClose: () => void;
}

export function TrackInfo({ index, onClose }: TrackInfoProps) {
    return (
        <div className="flex gap-4 items-start">
            <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/20">
                <Image
                    src={trackImages[index] || "/icon.png"}
                    alt="Album Art"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold line-clamp-2 text-gray-900 dark:text-white leading-tight">
                    {trackNames[index]}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                    Adarsh Anand
                </span>
            </div>
            <button
                onClick={onClose}
                className="ml-auto p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors shrink-0"
            >
                <ChevronDown size={18} className="text-gray-400" />
            </button>
        </div>
    );
}
