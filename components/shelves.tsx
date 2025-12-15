"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Search, Check, Star, X, Tag, Layers, Cloud, CloudRain, Sun, Moon, Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { AnimeItem, AnimeType, WatchStatus } from '@/types/definitions';
import { ShelfConfig } from "@/lib/config";
import { ShelfStrategyFactory, ShelfItem } from "@/lib/shelfStrategies";
import { RandomizerButton } from "@/components/randomizer-button";

interface ShelfHeaderProps {
    title: string;
    description?: string;
    count: number;
    command: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    onPickRandom?: (item: unknown) => void;
    items?: unknown[];
}
export function ShelfHeader({
    title,
    description,
    count,
    command,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    onPickRandom,
    items = []
}: ShelfHeaderProps) {
    return (
        <>
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">
                    <span className="text-gray-500">#</span> {title}
                    <span className="text-gray-500 text-lg ml-2">({count})</span>
                </h1>
                {onPickRandom && items.length > 0 && (
                    <RandomizerButton items={items} onPick={onPickRandom} />
                )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">$ {command}</p>
            {description && (
                <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm italic">&gt; {description}</p>
            )}
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
            </div>
        </>
    );
}

interface UniversalShelfProps {
    config: ShelfConfig;
    items: unknown[];
}
export function UniversalShelf({ config, items }: UniversalShelfProps) {
    const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);
    const { searchQuery, setSearchQuery, hobbySelectedItem, setHobbySelectedItem } = useStore();

    useEffect(() => {
        setSearchQuery("");
    }, [config.type, setSearchQuery]);

    // Icon map for Hobby Modal
    const iconMap: Record<string, React.ElementType> = {
        Dumbbell, Tv, Book: Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
    };
    const getIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" /> : <span className="text-4xl mb-4">🎮</span>;
    };

    const filteredItems = useMemo(() => strategy.filter(items as ShelfItem[], searchQuery), [items, searchQuery, strategy]);
    return (
        <div className="section max-w-4xl mx-auto px-4 mt-12 mb-12 font-mono">
            <ShelfHeader
                title={config.title}
                description={config.description}
                count={filteredItems.length}
                command={config.command}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={config.searchPlaceholder}
                items={filteredItems}
                onPickRandom={(item) => {
                    if (config.type === 'anime') {
                        const { setAnimeSelectedItem } = useStore.getState();
                        setAnimeSelectedItem(item);
                    } else if (config.type === 'hobby') {
                        setHobbySelectedItem(item);
                    } else {
                        const element = document.getElementById(`shelf-item-${(item as any).title}`);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            element.classList.add('ring-4', 'ring-green-500', 'ring-offset-2');
                            setTimeout(() => element.classList.remove('ring-4', 'ring-green-500', 'ring-offset-2'), 2000);
                        }
                    }
                }}
            />
            {filteredItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    No items found matching &quot;{searchQuery}&quot;
                </p>
            ) : (
                strategy.renderList(filteredItems)
            )}

            {/* Hobby Modal */}
            {hobbySelectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setHobbySelectedItem(null)}
                    ></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-in border border-green-500/30 p-8 flex flex-col items-center text-center">
                        <button
                            onClick={() => setHobbySelectedItem(null)}
                            className="absolute top-3 right-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
                            {getIcon((hobbySelectedItem as any).icon)}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {(hobbySelectedItem as any).name}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {(hobbySelectedItem as any).description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}



const Section = ({
    title,
    sectionItems,
    AnimeCard,
}: {
    title: string;
    sectionItems: AnimeItem[];
    AnimeCard: React.ComponentType<{ item: AnimeItem }>;
}) => {
    if (sectionItems.length === 0) return null;
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                {title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {sectionItems.map((item, index) => (
                    <AnimeCard key={`${item.title}-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
};

interface AnimeShelfProps {
    items: AnimeItem[];
}
export const AnimeShelf = ({ items }: AnimeShelfProps) => {
    const {
        animeSelectedItem: selectedItem,
        setAnimeSelectedItem: setSelectedItem,
        animeSelectedTag: selectedTag,
        setAnimeSelectedTag: setSelectedTag
    } = useStore();

    const filterItems = (
        items: AnimeItem[],
        type: AnimeType,
        status: WatchStatus
    ) => {
        return items.filter((item) => item.type === type && item.status === status);
    };
    const formatSeasons = (notes: string | undefined) => {
        if (!notes) return null;
        return notes.replace(/(S\d+)(?:,\s*\d+){7,},\s*(\d+)/g, "$1-$2");
    };

    const allTags = Array.from(new Set(items.flatMap(item => item.tags || []))).sort();
    const filteredItems = items.filter(item => {
        if (!selectedTag) return true;
        return item.tags?.includes(selectedTag);
    });
    const toggleTag = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
    };
    const animeWatching = filterItems(filteredItems, AnimeType.Anime, WatchStatus.Watching);
    const animeCompleted = filterItems(filteredItems, AnimeType.Anime, WatchStatus.Completed);
    const animePlanning = filterItems(filteredItems, AnimeType.Anime, WatchStatus.Planning);
    const movieWatching = filterItems(filteredItems, AnimeType.Movie, WatchStatus.Watching);
    const movieCompleted = filterItems(filteredItems, AnimeType.Movie, WatchStatus.Completed);
    const moviePlanning = filterItems(filteredItems, AnimeType.Movie, WatchStatus.Planning);
    const AnimeCard = ({ item }: { item: AnimeItem }) => (
        <div onClick={() => setSelectedItem(item)} className="cursor-pointer h-full">
            <div className="h-full flex flex-col p-4 relative overflow-hidden group glass hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors duration-300 rounded-xl">
                {item.image ? (
                    <div className="w-full aspect-[2/3] mb-4 overflow-hidden rounded-md relative shadow-lg">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay */}
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
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                        {item.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded-full">{tag}</span>
                        ))}
                        {item.tags.length > 2 && <span className="text-[10px] text-gray-400">+{item.tags.length - 2}</span>}
                    </div>
                )}
            </div>
        </div>
    );
    return (
        <>
            {/* Filter Section */}
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
            <Section title="Anime - Watching" sectionItems={animeWatching} AnimeCard={AnimeCard} />
            <Section title="Anime - Watched" sectionItems={animeCompleted} AnimeCard={AnimeCard} />

            <Section title="Movies - Watching" sectionItems={movieWatching} AnimeCard={AnimeCard} />
            <Section title="Movies - Watched" sectionItems={movieCompleted} AnimeCard={AnimeCard} />

            {/* Modal */}
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
                        {/* Left Side - Image */}
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
                            {/* Overlay Gradient for mobile title readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
                            <div className="absolute bottom-4 left-4 md:hidden">
                                <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">{selectedItem.title}</h2>
                            </div>
                        </div>
                        {/* Right Side - Content */}
                        {/* ... existing content ... */}
                        <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-white dark:bg-zinc-900 flex flex-col text-center">
                            <div className="mb-6">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                                    {selectedItem.title}
                                    {selectedItem.recommended && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                                </h2>
                                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400 font-medium">
                                    {selectedItem.year && <span>{selectedItem.year}</span>}
                                    {selectedItem.rating && <span className="border border-gray-600 px-1 rounded text-xs">{selectedItem.rating}</span>}
                                    <span>{selectedItem.type}</span>
                                </div>
                            </div>
                            <div className="space-y-6 flex-grow">
                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                    {selectedItem.description || "No description available."}
                                </p>
                                {/* Tags */}
                                {selectedItem.tags && selectedItem.tags.length > 0 && (
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {selectedItem.tags.map((tag: string) => (
                                            <button
                                                key={tag}
                                                onClick={() => {
                                                    setSelectedTag(tag);
                                                    setSelectedItem(null);
                                                }}
                                                className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {/* Seasons */}
                                {selectedItem.notes && (
                                    <div className="py-2">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center justify-center gap-2">
                                            <Layers size={14} /> Seasons
                                        </h4>
                                        <p className="font-mono text-lg font-bold text-gray-800 dark:text-white">
                                            {formatSeasons(selectedItem.notes)}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Trailer Button */}
                            <div className="mt-8 pt-4">
                                <a
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedItem.title + " anime trailer official")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-base font-bold transition-all transform hover:scale-[1.02] shadow-lg"
                                >
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5"></div>
                                    Watch Trailer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
