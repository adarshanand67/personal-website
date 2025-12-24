
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
                <div className={`relative w-48 md:w-64 aspect-[2/3] bg-gradient-to-br ${getBookGradient(item.title)} rounded-2xl flex flex-col items-center justify-center p-6 mb-8 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transform hover:scale-[1.02] transition-transform duration-500`}>
                    <div className="absolute inset-0 bg-black/10 rounded-2xl" />
                    <div className="relative z-10 text-center space-y-4">
                        <BookOpen className="text-white mx-auto" size={48} strokeWidth={1.5} />
                        <div className="space-y-2">
                            <h3 className="text-white font-bold text-lg leading-tight line-clamp-4 px-2">
                                {item.title}
                            </h3>
                            <p className="text-white/80 text-sm font-medium">
                                {item.author}
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent rounded-b-2xl" />
                </div>
            )}

            <div className="w-full space-y-3 relative z-10">
                <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-500/20">
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
                    href={item.amazonLink || `https://www.amazon.com/s?k=${encodeURIComponent(item.title + " " + item.author)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-gray-900/20 group transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                    Get it on Amazon
                </a>
            </div>
        </div>
    );
}
