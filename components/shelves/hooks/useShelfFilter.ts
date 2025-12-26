"use client";

import { useMemo, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { ShelfType, WatchStatus } from "@/types/definitions";
import { ShelfItem } from "@/lib/shelfStrategies";

export function useShelfFilter(items: unknown[], configType: ShelfType, strategy: any) {
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
