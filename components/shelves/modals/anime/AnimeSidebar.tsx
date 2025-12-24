
import Image from "next/image";
import { Tv, Check, Star, Play } from "lucide-react";
import { WatchStatus } from "@/types/definitions";

interface AnimeSidebarProps {
    item: any;
}

export function AnimeSidebar({ item }: AnimeSidebarProps) {
    return (
        <div className="md:w-[400px] bg-gray-100/50 dark:bg-white/5 p-8 md:p-10 flex flex-col items-center justify-start border-r border-gray-200/50 dark:border-white/5 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/80 dark:to-black/20 pointer-events-none" />

            {item.image ? (
                <div className="relative w-48 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-8 transform hover:scale-[1.02] transition-transform duration-500">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : (
                <div className="w-48 md:w-64 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                    <Tv className="text-gray-400" size={56} />
                </div>
            )}

            <div className="w-full space-y-3 relative z-10">
                {item.status === WatchStatus.Completed && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-500/20">
                        <Check size={14} strokeWidth={3} />
                        <span>Completed</span>
                    </div>
                )}
                {item.recommended && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                        <Star size={14} fill="currentColor" />
                        <span>Highly Recommended</span>
                    </div>
                )}

                {/* Watch Trailer Button */}
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " trailer")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-600/20 group transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Play size={16} className="fill-current group-hover:scale-110 transition-transform" />
                    Watch Trailer
                </a>
            </div>
        </div>
    );
}
