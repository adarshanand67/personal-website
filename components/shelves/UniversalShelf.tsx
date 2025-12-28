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
    const [mounted, setMounted] = useState(false);

    // Validate config and items
    const isValidConfig = config && config.type && config.title;
    const isValidItems = Array.isArray(items);

    const strategy = useMemo(() => {
        try {
            if (!isValidConfig) return null;
            return ShelfStrategyFactory.getStrategy(config.type);
        } catch (error) {
            console.error("Failed to get shelf strategy:", error);
            return null;
        }
    }, [config?.type, isValidConfig]);

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
    } = useShelfFilter(isValidItems ? items : [], config?.type, strategy);

    const handlePickRandom = (item: any) => {
        if (!item) return;

        try {
            if (config.type === ShelfType.Anime) store.setAnimeSelectedItem(item);
            else if (config.type === ShelfType.Hobby) store.setHobbySelectedItem(item);
            else if (config.type === ShelfType.Book) store.setBookSelectedItem(item);
            else {
                const title = item.title || item.name;
                if (title) {
                    const element = document.getElementById(`shelf-item-${title}`);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                        element.classList.add("ring-2", "ring-foreground");
                        setTimeout(
                            () => element.classList.remove("ring-2", "ring-foreground"),
                            2000
                        );
                    }
                }
            }
        } catch (error) {
            console.error("Error picking random item:", error);
        }
    };

    if (!mounted) return <ShelfSkeleton />;

    if (!isValidConfig || !strategy) {
        return (
            <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-24 font-mono text-center py-24">
                <h1 className="text-2xl font-bold mb-4">Shelf Configuration Error</h1>
                <p className="text-gray-500">
                    The shelf could not be loaded due to an invalid configuration.
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-block px-6 py-2 bg-foreground text-background rounded-full font-bold"
                >
                    Go Back Home
                </Link>
            </div>
        );
    }

    return (
        <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-24 font-mono relative">
            <Breadcrumbs items={[{ label: config.title || "Shelf" }]} />
            <ShelfHeader
                title={config.title || "Shelf"}
                description={config.description}
                count={filteredItems?.length || 0}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={config.searchPlaceholder}
                items={randomizerItems}
                onPickRandom={handlePickRandom}
                showClear={config.type === ShelfType.Anime && !!(searchQuery || animeSelectedTag)}
                onClear={() => {
                    setSearchQuery("");
                    setAnimeSelectedTag(null);
                }}
            />

            {config.type === ShelfType.Anime && (
                <AnimeTagFilter
                    items={isValidItems ? items : []}
                    selectedTag={animeSelectedTag}
                    onTagSelect={setAnimeSelectedTag}
                />
            )}

            {!filteredItems || filteredItems.length === 0 ? (
                <div className="py-24 text-center text-gray-500">
                    {searchQuery
                        ? `No items found matching "${searchQuery}"`
                        : "No items available in this shelf."}
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
