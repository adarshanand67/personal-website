/**
 * @fileoverview Anime Modal Content Component - displays anime details, tags, and key learnings.
 * Renders the main content area of the anime modal including title, metadata, description,
 * category tags, and key takeaways.
 */

import { Calendar, Star, Film, Tv } from "lucide-react";

/**
 * Props for AnimeContent component.
 * @interface AnimeContentProps
 * @property {any} item - Anime data object with title, year, rating, seasons, description, tags, and learnings
 * @property {Function} onTagClick - Callback function when a category tag is clicked
 */
interface AnimeContentProps {
    item: any;
    onTagClick: (tag: string) => void;
}

/**
 * Anime Content Component - displays detailed anime information and insights.
 * Features scrollable content area with anime title, metadata badges (year, rating, seasons),
 * description, clickable category tags, and key learnings/takeaways list.
 *
 * @component
 * @param {AnimeContentProps} props - Component props
 * @returns {JSX.Element} Rendered content area with anime details
 */
export function AnimeContent({ item, onTagClick }: AnimeContentProps) {
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 md:p-10 space-y-8">
                {/* Header */}
                <div>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {item.year && (
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                                <Calendar size={10} /> {item.year}
                            </span>
                        )}
                        {item.rating && (
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                                <Star size={10} /> {item.rating}
                            </span>
                        )}
                        {item.seasons && (
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-foreground/50 bg-foreground/5 px-2.5 py-1 rounded-full border border-foreground/10 tracking-widest">
                                <Film size={10} /> {item.seasons}
                            </span>
                        )}
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        {item.title}
                    </h2>

                    {item.description && (
                        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                            {item.description}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                    <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                            Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag: string) => (
                                <button
                                    key={tag}
                                    onClick={() => onTagClick(tag)}
                                    className="px-4 py-2 bg-transparent border-2 border-foreground/10 rounded-full text-[10px] font-black text-foreground/40 hover:border-foreground/60 hover:text-foreground transition-all uppercase tracking-widest hover:scale-105 shadow-sm active:scale-95"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Learnings */}
                {item.keyLearnings && item.keyLearnings.length > 0 && (
                    <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                                <Tv size={16} className="text-foreground/60" />
                            </div>
                            <h3 className="text-[9px] font-black text-foreground/80 uppercase tracking-widest">
                                Key Takeaways
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {item.keyLearnings.map((learning: string, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
                                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                        {learning}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
