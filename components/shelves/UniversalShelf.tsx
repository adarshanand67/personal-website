/**
 * @fileoverview Universal Shelf Component - flexible shelf display using strategy pattern.
 * Provides a unified shelf interface that adapts rendering based on content type
 * (books, anime, hobbies, etc.) using the strategy pattern.
 */

"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store/useStore";
import { ShelfType } from "@/types/definitions";
import { ShelfConfig } from "@/lib/config";
import { ShelfStrategyFactory } from "@/lib/shelfStrategies";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShelfHeader } from "./ShelfHeader";
import { ShelfSkeleton } from "./ShelfSkeleton";
import { AnimeTagFilter } from "./AnimeTagFilter";
import { useShelfFilter } from "./hooks/useShelfFilter";
import { HobbyModal } from "./modals/HobbyModal";
import { BookModal } from "./modals/BookModal";
import { AnimeModal } from "./modals/AnimeModal";

/**
 * Props for UniversalShelf component.
 * @interface UniversalShelfProps
 * @property {ShelfConfig} config - Shelf configuration object defining type, title, description, etc.
 * @property {unknown[]} items - Array of items to display in the shelf
 */
interface UniversalShelfProps {
    config: ShelfConfig;
    items: unknown[];
}

/**
 * Universal Shelf Component - adaptive shelf display using strategy pattern.
 * Dynamically renders shelf content based on configuration type, with support for
 * search filtering, tag filtering (anime), randomizer, breadcrumbs, and modals.
 * Uses strategy pattern to delegate rendering to type-specific strategies.
 *
 * @component
 * @param {UniversalShelfProps} props - Component props
 * @returns {JSX.Element} Rendered shelf with header, filters, content grid, and modals
 *
 * @example
 * ```tsx
 * <UniversalShelf
 *   config={{
 *     type: ShelfType.Book,
 *     title: "My Library",
 *     description: "Books I've read",
 *     searchPlaceholder: "Search books..."
 *   }}
 *   items={bookList}
 * />
 * ```
 */
export function UniversalShelf({ config, items }: UniversalShelfProps) {
    const store = useStore();
    const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        filteredItems,
        randomizerItems,
        searchQuery,
        setSearchQuery,
        animeSelectedTag,
        setAnimeSelectedTag,
    } = useShelfFilter(items, config.type, strategy);

    const handlePickRandom = (item: any) => {
        if (config.type === ShelfType.Anime) store.setAnimeSelectedItem(item);
        else if (config.type === ShelfType.Hobby) store.setHobbySelectedItem(item);
        else if (config.type === ShelfType.Book) store.setBookSelectedItem(item);
        else {
            const element = document.getElementById(`shelf-item-${item.title}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.classList.add("ring-4", "ring-green-500");
                setTimeout(() => element.classList.remove("ring-4", "ring-green-500"), 2000);
            }
        }
    };

    if (!mounted) return <ShelfSkeleton />;

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
                onPickRandom={handlePickRandom}
            />

            {config.type === ShelfType.Anime && (
                <AnimeTagFilter
                    items={items}
                    selectedTag={animeSelectedTag}
                    onTagSelect={setAnimeSelectedTag}
                    showClear={!!(searchQuery || animeSelectedTag)}
                    onClear={() => {
                        setSearchQuery("");
                        setAnimeSelectedTag(null);
                    }}
                />
            )}

            {filteredItems.length === 0 ? (
                <div className="py-24 text-center text-gray-500">
                    No items found matching "{searchQuery}"
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

            <AnimatePresence>
                {store.hobbySelectedItem && (
                    <HobbyModal
                        item={store.hobbySelectedItem}
                        onClose={() => store.setHobbySelectedItem(null)}
                    />
                )}
                {store.bookSelectedItem && (
                    <BookModal
                        item={store.bookSelectedItem}
                        onClose={() => store.setBookSelectedItem(null)}
                    />
                )}
                {store.animeSelectedItem && (
                    <AnimeModal
                        item={store.animeSelectedItem}
                        onClose={() => store.setAnimeSelectedItem(null)}
                        onTagClick={(tag) => {
                            setAnimeSelectedTag(tag);
                            store.setAnimeSelectedItem(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
