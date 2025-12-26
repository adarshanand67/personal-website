/**
 * @fileoverview Anime Modal Sidebar Component - displays anime poster, status badges, and trailer link.
 * Renders the left sidebar of the anime modal with poster image, completion/recommendation badges,
 * and YouTube trailer link.
 */

import Image from "next/image";
import { Tv, Check, Star, Play } from "lucide-react";
import { WatchStatus } from "@/types/definitions";

/**
 * Props for AnimeSidebar component.
 * @interface AnimeSidebarProps
 * @property {any} item - Anime data object containing title, image, status, and recommendation info
 */
interface AnimeSidebarProps {
    item: any;
}

/**
 * Anime Sidebar Component - displays anime poster and action buttons.
 * Features gradient background, responsive poster display with fallback,
 * completion/recommendation status badges, and YouTube trailer search link.
 *
 * @component
 * @param {AnimeSidebarProps} props - Component props
 * @returns {JSX.Element} Rendered sidebar with anime poster and actions
 *
 * @example
 * ```tsx
 * <AnimeSidebar item={{
 *   title: "Attack on Titan",
 *   image: "/anime/aot.jpg",
 *   status: WatchStatus.Completed,
 *   recommended: true
 * }} />
 * ```
 */
export function AnimeSidebar({ item }: AnimeSidebarProps) {
    return (
        <div className="md:w-[350px] bg-foreground/[0.02] p-8 flex flex-col items-center justify-start border-r border-foreground/10 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none" />

            {item.image ? (
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " anime official trailer")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-48 md:w-64 aspect-[2/3] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 mb-8 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer group"
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play
                            size={48}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                            fill="currentColor"
                        />
                    </div>
                </a>
            ) : (
                <div className="w-48 md:w-64 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                    <Tv className="text-gray-400" size={56} />
                </div>
            )}

            <div className="w-full space-y-3 relative z-10">
                {item.status === WatchStatus.Completed && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground/5 text-foreground/80 rounded-xl text-[10px] font-black uppercase tracking-widest border border-foreground/10">
                        <Check size={16} strokeWidth={3} />
                        <span>Completed</span>
                    </div>
                )}
                {item.recommended && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground/5 text-foreground/80 rounded-xl text-[10px] font-black uppercase tracking-widest border border-foreground/10">
                        <Star size={16} fill="currentColor" />
                        <span>Highly Recommended</span>
                    </div>
                )}

                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " anime official trailer")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 text-foreground/60 hover:text-foreground rounded-xl text-[10px] font-black uppercase tracking-widest group transition-all hover:scale-[1.02] active:scale-[0.98] border border-foreground/10 hover:border-foreground hover:bg-foreground/5"
                >
                    <Play
                        size={16}
                        className="fill-current group-hover:scale-110 transition-transform"
                    />
                    Watch Trailer
                </a>
            </div>
        </div>
    );
}
