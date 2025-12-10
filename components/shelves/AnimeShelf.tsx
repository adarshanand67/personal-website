
"use client";

import { useState } from 'react';
import { EntertainmentItem, EntertainmentType, WatchStatus } from '@/types';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import Image from 'next/image';
import { Check, Star, X, Tag, Calendar, Layers } from 'lucide-react';

interface AnimeShelfProps {
    items: EntertainmentItem[];
}

export const AnimeShelf = ({ items }: AnimeShelfProps) => {
    const [selectedItem, setSelectedItem] = useState<EntertainmentItem | null>(null);

    const filterItems = (
        items: EntertainmentItem[],
        type: EntertainmentType,
        status: WatchStatus
    ) => {
        return items.filter((item) => item.type === type && item.status === status);
    };


    const formatSeasons = (notes: string | undefined) => {
        if (!notes) return null;
        // Robust regex to collapse long sequences of "S1,2,3...N" into "S1-N"
        // Matches "S" number, followed by 7+ commas+numbers, ending with a number.
        // Handles optional spaces.
        // Example: "S1,2,3,4,5,6,7,8,9, Super S1" -> "S1-9, Super S1"
        return notes.replace(/(S\d+)(?:,\s*\d+){7,},\s*(\d+)/g, "$1-$2");
    };

    // Tag Filtering Logic
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract unique tags from all items
    const allTags = Array.from(new Set(items.flatMap(item => item.tags || []))).sort();

    // Apply filters
    const filteredItems = items.filter(item => {
        if (!selectedTag) return true;
        return item.tags?.includes(selectedTag);
    });

    const toggleTag = (tag: string) => {
        setSelectedTag(prev => (prev === tag ? null : tag));
    };

    const animeWatching = filterItems(filteredItems, EntertainmentType.Anime, WatchStatus.Watching);
    const animeCompleted = filterItems(filteredItems, EntertainmentType.Anime, WatchStatus.Completed);
    const animePlanning = filterItems(filteredItems, EntertainmentType.Anime, WatchStatus.Planning);
    const movieWatching = filterItems(filteredItems, EntertainmentType.Movie, WatchStatus.Watching);
    const movieCompleted = filterItems(filteredItems, EntertainmentType.Movie, WatchStatus.Completed);
    const moviePlanning = filterItems(filteredItems, EntertainmentType.Movie, WatchStatus.Planning);

    const AnimeCard = ({ item }: { item: EntertainmentItem }) => (
        <div onClick={() => setSelectedItem(item)} className="cursor-pointer h-full">
            <SpotlightCard className="h-full flex flex-col p-4 relative overflow-hidden group">
                {item.image ? (
                    <div className="w-full aspect-[2/3] mb-4 overflow-hidden rounded-md relative shadow-lg">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Hover overlay hint */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold uppercase tracking-wider border border-white/50 px-2 py-1 rounded-full backdrop-blur-sm">View Details</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full aspect-[2/3] mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center p-4">
                        <span className="text-gray-400 text-sm text-center">{item.title}</span>
                    </div>
                )}
                <h3 className="font-bold text-lg leading-tight mb-2 flex items-center gap-2">
                    <span className="truncate">{item.title}</span>
                    {item.status === WatchStatus.Completed && (
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-0.5 shrink-0">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
                        </div>
                    )}
                    {item.recommended && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />}
                </h3>
                {item.notes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto font-mono break-words line-clamp-2">
                        {formatSeasons(item.notes)}
                    </p>
                )}
                {/* Mini tags preview */}
                {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                        {item.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded-full">{tag}</span>
                        ))}
                        {item.tags.length > 2 && <span className="text-[10px] text-gray-400">+{item.tags.length - 2}</span>}
                    </div>
                )}
            </SpotlightCard>
        </div>
    );

    const Section = ({
        title,
        sectionItems,
    }: {
        title: string;
        sectionItems: EntertainmentItem[];
    }) => {
        if (sectionItems.length === 0) return null;
        return (
            <div className="mb-12">
                <h2 className="text-xl font-bold mb-4 font-mono">
                    <span className="text-gray-500">##</span> {title}
                    <span className="text-gray-500 text-sm ml-2">({sectionItems.length})</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sectionItems.map((item, index) => <AnimeCard key={index} item={item} />)}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Tag Filter Grid */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                        <Tag size={16} /> Filter by Tags
                    </h3>
                    {selectedTag && (
                        <button
                            onClick={() => setSelectedTag(null)}
                            className="text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                    {allTags.map(tag => {
                        const isSelected = selectedTag === tag;
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`text-xs px-2.5 py-1.5 rounded-full border transition-all duration-200 
                                    ${isSelected
                                        ? 'bg-green-600 text-white border-green-600 shadow-md transform scale-105'
                                        : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-green-500 hover:text-green-500'
                                    }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Section title="Anime - Watching" sectionItems={animeWatching} />
            <Section title="Anime - Watched" sectionItems={animeCompleted} />
            <Section title="Anime - Planning" sectionItems={animePlanning} />
            <Section title="Movies - Watching" sectionItems={movieWatching} />
            <Section title="Movies - Watched" sectionItems={movieCompleted} />
            <Section title="Movies - Planning" sectionItems={moviePlanning} />

            {/* Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedItem(null)}
                    ></div>

                    <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-fade-in border border-gray-200 dark:border-gray-800">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Image (Full height on desktop) */}
                        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                            {selectedItem.image ? (
                                <Image
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-500">{selectedItem.title}</span>
                                </div>
                            )}
                            {/* Gradient overlay for mobile text visibility if needed, or visual style */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
                            <div className="absolute bottom-4 left-4 md:hidden">
                                <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">{selectedItem.title}</h2>
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-white dark:bg-gray-900">
                            <div className="hidden md:block mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                    {selectedItem.title}
                                    {selectedItem.recommended && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                                </h2>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                                    {selectedItem.year && <span className="flex items-center gap-1"><Calendar size={14} /> {selectedItem.year}</span>}
                                    {selectedItem.rating && <span className="font-semibold text-green-600">{selectedItem.rating}</span>}
                                    <span>{selectedItem.type}</span>
                                </div>
                                <a
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedItem.title + " trailer")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-semibold transition-colors shadow-sm"
                                >
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                                    Watch Trailer
                                </a>
                            </div>

                            <div className="space-y-6">
                                {/* Tags */}
                                {selectedItem.tags && selectedItem.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md border border-green-200 dark:border-green-800/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Synopsis</h4>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                        {selectedItem.description || "No description available."}
                                    </p>
                                </div>

                                {/* Seasons / Notes */}
                                {selectedItem.notes && (
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                                            <Layers size={14} /> Seasons
                                        </h4>
                                        <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                                            {formatSeasons(selectedItem.notes)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
