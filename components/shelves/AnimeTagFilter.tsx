/**
 * @fileoverview Anime Tag Filter Component - provides tag-based filtering for anime lists.
 * Displays clickable tag pills to filter anime by category.
 */

"use client";

import React from "react";

/**
 * Props for AnimeTagFilter component.
 * @interface AnimeTagFilterProps
 * @property {any[]} items - Array of anime items to extract tags from
 * @property {string | null} selectedTag - Currently selected tag filter
 * @property {Function} onTagSelect - Callback when a tag is selected or deselected
 */
interface AnimeTagFilterProps {
    items: any[];
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
}

/**
 * Anime Tag Filter Component - interactive tag filtering UI.
 * Extracts unique tags from anime items and displays them as clickable pill buttons.
 *
 * @component
 * @param {AnimeTagFilterProps} props - Component props
 * @returns {JSX.Element | null} Rendered tag filter or null if no tags exist
 */
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
                    <button
                        key={tag}
                        onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                        className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-wider transition-all bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 ${
                            selectedTag === tag
                                ? "font-black text-zinc-900 dark:text-white"
                                : "font-medium text-zinc-600 dark:text-zinc-400"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}
