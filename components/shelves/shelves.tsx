"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Search, Check, Star, X, Tag, Layers, Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic, ExternalLink, BookOpen } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { AnimeItem, AnimeType, WatchStatus, Hobby, Book } from '@/types/definitions';
import { ShelfConfig } from "@/lib/config";
import { ShelfStrategyFactory, ShelfItem } from "@/lib/shelfStrategies";
import { RandomizerButton } from "@/components/ui";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { routes } from "@/lib/constants";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ShelfHeaderProps {
    title: string;
    description?: string;
    count: number;
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
    searchValue,
    onSearchChange,
    searchPlaceholder,
    onPickRandom,
    items
}: ShelfHeaderProps) {
    return (
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {count} {count === 1 ? 'Item' : 'Items'}
                    </div>
                    {onPickRandom && items && items.length > 0 && (
                        <RandomizerButton
                            items={items}
                            onPick={onPickRandom}
                        />
                    )}
                </div>
            </div>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder || "Search..."}
                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-sm group-hover:shadow-md"
                />
            </div>
        </div>
    );
}

interface UniversalShelfProps {
    config: ShelfConfig;
    items: unknown[];
}

export function UniversalShelf(props: UniversalShelfProps) {
    return <UniversalShelfBase {...props} />;
}

function UniversalShelfBase({ config, items }: UniversalShelfProps) {
    const {
        searchQuery,
        setSearchQuery,
        hobbySelectedItem,
        setHobbySelectedItem,
        bookSelectedItem,
        setBookSelectedItem
    } = useStore();

    const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        setSearchQuery("");
    }, [config.type, setSearchQuery]);

    const filteredItems = useMemo(() => strategy.filter(items as ShelfItem[], searchQuery), [items, searchQuery, strategy]);

    const randomizerItems = useMemo(() => {
        if (config.type === 'anime') {
            return filteredItems.filter((item: any) => item.status === WatchStatus.Completed);
        }
        return filteredItems;
    }, [filteredItems, config.type]);

    if (!mounted) {
        return (
            <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-12 font-mono">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
                <div className="space-y-4 mb-12">
                    <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    const iconMap: Record<string, React.ElementType> = {
        Dumbbell, Tv, Book: Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
    };

    const getIcon = (iconName: string) => {
        const IconComponent = (iconMap as any)[iconName];
        if (!IconComponent) return <span className="text-4xl mb-4">🎮</span>;
        return <IconComponent className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />;
    };

    return (
        <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-24 font-mono relative">
            <Breadcrumbs items={[{ label: config.title }]} />

            <ShelfHeader
                title={config.title}
                description={config.description}
                count={filteredItems.length}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={config.searchPlaceholder}
                items={randomizerItems}
                onPickRandom={(item) => {
                    if (config.type === 'anime') {
                        const { setAnimeSelectedItem } = useStore.getState();
                        setAnimeSelectedItem(item as any);
                    } else if (config.type === 'hobby') {
                        setHobbySelectedItem(item as any);
                    } else if (config.type === 'book') {
                        setBookSelectedItem(item as any);
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
                <div className="py-24 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No items found matching &quot;{searchQuery}&quot;
                    </p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {strategy.renderList(filteredItems as any[])}
                </motion.div>
            )}

            {/* Related Navigation */}
            <div className="mt-32 pt-16 border-t border-gray-100 dark:border-white/5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">Related Shelves</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(routes)
                        .filter(([key, path]) => path !== routes.home && path !== `/${config.type + 'shelf'}`)
                        .map(([key, path]) => (
                            <Link
                                key={key}
                                href={path}
                                className="group relative p-8 glass rounded-3xl border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/5 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700 -rotate-12">
                                    <ExternalLink size={64} className="text-green-500" />
                                </div>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 block group-hover:text-green-500 transition-colors font-bold">Browse</span>
                                <h4 className="text-xl font-bold capitalize mb-2">{key.replace('Shelf', '')}</h4>
                                <p className="text-xs text-gray-500 line-clamp-1 group-hover:text-gray-400 transition-colors">Explore my curated collection.</p>
                            </Link>
                        ))
                    }
                </div>
            </div>

            {/* Modal Components */}
            <AnimatePresence>
                {hobbySelectedItem && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setHobbySelectedItem(null)}
                        />
                        <motion.div
                            layoutId={`hobby-${hobbySelectedItem.name}`}
                            className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-white/10"
                        >
                            <button
                                onClick={() => setHobbySelectedItem(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
                            >
                                <X size={20} />
                            </button>
                            <div className="p-10">
                                <div className="flex flex-col items-center text-center">
                                    {getIcon(hobbySelectedItem.icon)}
                                    <h2 className="text-3xl font-bold mb-3">{hobbySelectedItem.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                        {hobbySelectedItem.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {bookSelectedItem && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setBookSelectedItem(null)}
                        />
                        <motion.div
                            layoutId={`book-${bookSelectedItem.title}`}
                            className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row border border-gray-200 dark:border-white/10"
                        >
                            <button
                                onClick={() => setBookSelectedItem(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="md:w-1/3 bg-gray-50 dark:bg-white/5 p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5">
                                {bookSelectedItem.image ? (
                                    <div className="relative w-48 aspect-[2/3] shadow-2xl rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
                                        <Image
                                            src={bookSelectedItem.image}
                                            alt={bookSelectedItem.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <BookOpen className="text-gray-400" size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="md:w-2/3 p-10">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Featured Book</span>
                                <h2 className="text-3xl font-bold mb-2">{bookSelectedItem.title}</h2>
                                <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-medium">by {bookSelectedItem.author}</h3>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Recommended</div>
                                        <div className={`text-sm font-bold ${bookSelectedItem.recommended ? 'text-green-600' : 'text-gray-400'}`}>
                                            {bookSelectedItem.recommended ? 'Yes' : 'No'}
                                        </div>
                                    </div>
                                </div>

                                {bookSelectedItem.description && (
                                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                                        {bookSelectedItem.description}
                                    </p>
                                )}

                                {bookSelectedItem.notes && (
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base italic border-l-4 border-green-500/30 pl-4 py-2">
                                        {bookSelectedItem.notes}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
