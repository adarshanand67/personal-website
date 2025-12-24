
import { Calendar, Star, Film, Tv } from "lucide-react";

interface AnimeContentProps {
    item: any;
    onTagClick: (tag: string) => void;
}

export function AnimeContent({ item, onTagClick }: AnimeContentProps) {
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 md:p-12 space-y-8">
                {/* Header */}
                <div>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {item.year && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                <Calendar size={12} /> {item.year}
                            </span>
                        )}
                        {item.rating && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                <Star size={12} /> {item.rating}
                            </span>
                        )}
                        {item.seasons && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                <Film size={12} /> {item.seasons}
                            </span>
                        )}
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        {item.title}
                    </h2>

                    {item.description && (
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                            {item.description}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag: string) => (
                                <button
                                    key={tag}
                                    onClick={() => onTagClick(tag)}
                                    className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 hover:scale-105 transition-all"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Learnings */}
                {item.keyLearnings && item.keyLearnings.length > 0 && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Tv size={18} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                Key Takeaways
                            </h3>
                        </div>
                        <ul className="space-y-3 list-disc pl-5 marker:text-gray-400">
                            {item.keyLearnings.map((learning: string, idx: number) => (
                                <li key={idx} className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                    {learning}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
