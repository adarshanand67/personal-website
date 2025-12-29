/**
 * @fileoverview Consolidated shelf utility components - header, skeleton, and tag filter.
 */

"use client";

import React from "react";
import { Search } from "lucide-react";
import { PillTag, RandomizerButton } from "@/components/ui";

// ============================================================================
// AnimeTagFilter
// ============================================================================

interface AnimeTagFilterProps {
    items: any[];
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
}

export function AnimeTagFilter({ items, selectedTag, onTagSelect }: AnimeTagFilterProps) {
    const hasRecommended = items.some((item) => item.recommended);
    const allTags = Array.from(new Set(items.flatMap((item) => item.tags || []))).sort();

    if (hasRecommended) {
        allTags.unshift("Recommended");
    }

    if (allTags.length === 0) return null;

    return (
        <div className="mb-8">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Filter by Tag
            </h4>
            <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                    <PillTag
                        key={tag}
                        label={tag}
                        selected={selectedTag === tag}
                        dimmed={selectedTag !== tag}
                        onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                        variant="filter"
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// ShelfHeader
// ============================================================================

interface ShelfHeaderProps {
    title: string;
    description?: string;
    count: number;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    onPickRandom?: (item: unknown) => void;
    items?: unknown[];
    showClear?: boolean;
    onClear?: () => void;
}

export function ShelfHeader({
    title,
    description,
    count,
    searchValue,
    onSearchChange,
    searchPlaceholder,
    onPickRandom,
    items,
    showClear,
    onClear,
}: ShelfHeaderProps) {
    const displayCount = typeof count === "number" ? count : 0;
    const currentSearchValue = searchValue || "";

    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
                        {title || "Shelf"}
                    </h1>
                    {description && (
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed font-medium">
                            {description}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {showClear && onClear && (
                        <button
                            onClick={onClear}
                            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all uppercase tracking-wider"
                        >
                            Clear Filters
                        </button>
                    )}
                    <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {displayCount} {displayCount === 1 ? "Item" : "Items"}
                    </div>
                    {onPickRandom && items && Array.isArray(items) && items.length > 0 && (
                        <RandomizerButton items={items} onPick={onPickRandom} />
                    )}
                </div>
            </div>
            <div className="relative group">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black dark:text-gray-400 group-focus-within:text-black dark:group-focus-within:text-gray-200 transition-colors"
                    size={20}
                />
                <input
                    type="text"
                    value={currentSearchValue}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder || "Search..."}
                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all shadow-sm group-hover:shadow-md"
                />
            </div>
        </div>
    );
}

// ============================================================================
// ShelfSkeleton
// ============================================================================

export function ShelfSkeleton() {
    return (
        <div className="section max-w-6xl mx-auto px-6 md:px-12 mt-12 mb-12 font-mono">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
            <div className="space-y-4 mb-12">
                <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
