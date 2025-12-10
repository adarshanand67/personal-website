
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

    const animeWatching = filterItems(items, EntertainmentType.Anime, WatchStatus.Watching);
    const animeCompleted = filterItems(items, EntertainmentType.Anime, WatchStatus.Completed);
    const animePlanning = filterItems(items, EntertainmentType.Anime, WatchStatus.Planning);
    const movieWatching = filterItems(items, EntertainmentType.Movie, WatchStatus.Watching);
    const movieCompleted = filterItems(items, EntertainmentType.Movie, WatchStatus.Completed);
    const moviePlanning = filterItems(items, EntertainmentType.Movie, WatchStatus.Planning);

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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto font-mono break-words line-clamp-2">{item.notes}</p>
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
            <Section title="Anime - Watched" sectionItems={animeCompleted} />
            <Section title="Anime - Planning" sectionItems={animePlanning} />
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
                                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                    {selectedItem.year && <span className="flex items-center gap-1"><Calendar size={14} /> {selectedItem.year}</span>}
                                    {selectedItem.rating && <span className="font-semibold text-green-600">{selectedItem.rating}</span>}
                                    <span>{selectedItem.type}</span>
                                </div>
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
                                            <Layers size={14} /> Seasons / Progress
                                        </h4>
                                        <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                                            {selectedItem.notes}
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
