import Image from "next/image";
import { BookOpen, Star, ExternalLink } from "lucide-react";
import { getBookGradient } from "@/lib/utils/color";

interface BookSidebarProps {
    item: any;
}

export function BookSidebar({ item }: BookSidebarProps) {
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
                <div
                    className={`relative w-48 md:w-64 aspect-[2/3] bg-gradient-to-br ${getBookGradient(item.title)} rounded-r-md rounded-l-sm flex flex-col p-6 mb-8 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform hover:scale-[1.02] transition-transform duration-500`}
                >
                    <div className="absolute top-1 left-0 w-4 h-[98%] -translate-x-3 bg-black/20 dark:bg-black/40 blur-[1px] rounded-l-sm" />
                    <div className="flex-1 border-2 border-white/20 p-4 flex flex-col items-center justify-center text-center">
                        <BookOpen className="text-white/40 mb-4" size={32} />
                        <h3 className="text-white font-serif font-bold text-xl leading-tight line-clamp-4 drop-shadow-md">
                            {item.title}
                        </h3>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-white/80 font-mono uppercase tracking-widest truncate">
                            {item.author}
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
                </div>
            )}

            <div className="w-full space-y-3 relative z-10">
                <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/10 text-green-500 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-500/20">
                    <BookOpen size={14} strokeWidth={3} />
                    <span>Featured Book</span>
                </div>

                {item.recommended && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                        <Star size={14} fill="currentColor" />
                        <span>Must Read</span>
                    </div>
                )}

                {/* Get it on Amazon Button */}
                <a
                    href={
                        item.amazonLink ||
                        `https://www.amazon.com/s?k=${encodeURIComponent(item.title + " " + item.author)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-500 hover:bg-green-400 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(34,197,94,0.3)] group transition-all hover:scale-[1.02] active:scale-[0.98] border border-green-400/30"
                >
                    <ExternalLink
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                    />
                    <span>Get it on Amazon</span>
                </a>
            </div>
        </div>
    );
}
