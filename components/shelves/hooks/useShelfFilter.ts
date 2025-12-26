"use client";

import { useMemo, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { ShelfType, WatchStatus } from "@/types/definitions";
import { ShelfItem } from "@/lib/shelfStrategies";

/**
 * Strategy interface for filtering shelf items.
 */
interface FilterStrategy {
    filter(items: ShelfItem[], query: string, tag: string | null): ShelfItem[];
}

/**
 * Custom hook for filtering and managing shelf item display.
 * Handles search queries, tag filtering, and randomizer item selection.
 * Automatically resets filters when shelf type changes.
 *
 * @param {unknown[]} items - Array of shelf items to filter
 * @param {ShelfType} configType - Type of shelf (Anime, Books, etc.)
 * @param {FilterStrategy} strategy - Filtering strategy implementation
 *
 * @returns {Object} Filtered items and filter controls
 * @returns {ShelfItem[]} returns.filteredItems - Items after applying filters
 * @returns {ShelfItem[]} returns.randomizerItems - Items available for randomizer
 * @returns {string} returns.searchQuery - Current search query
 * @returns {Function} returns.setSearchQuery - Update search query
 * @returns {string | null} returns.animeSelectedTag - Selected anime tag filter
 * @returns {Function} returns.setAnimeSelectedTag - Update anime tag filter
 *
 * @example
 * ```tsx
 * const { filteredItems, searchQuery, setSearchQuery } = useShelfFilter(
 *   items,
 *   ShelfType.Anime,
 *   animeStrategy
 * );
 * ```
 */
export function useShelfFilter(items: unknown[], configType: ShelfType, strategy: FilterStrategy) {
    const { searchQuery, setSearchQuery, animeSelectedTag, setAnimeSelectedTag } = useStore();

    useEffect(() => {
        setSearchQuery("");
        if (configType === ShelfType.Anime) {
            setAnimeSelectedTag(null);
        }
    }, [configType, setSearchQuery, setAnimeSelectedTag]);

    const filteredItems = useMemo(() => {
        return strategy.filter(items as ShelfItem[], searchQuery, animeSelectedTag);
    }, [items, searchQuery, strategy, animeSelectedTag]);

    const randomizerItems = useMemo(() => {
        if (configType === ShelfType.Anime) {
            return filteredItems.filter((item: any) => item.status === WatchStatus.Completed);
        }
        return filteredItems;
    }, [filteredItems, configType]);

    return {
        filteredItems,
        randomizerItems,
        searchQuery,
        setSearchQuery,
        animeSelectedTag,
        setAnimeSelectedTag,
    };
}
