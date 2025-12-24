/**
 * @fileoverview Anime Tag Filter Component - provides tag-based filtering for anime lists.
 * Displays clickable tag buttons to filter anime by category, with "All" option and clear filters button.
 */

"use client";

import React from "react";
import { X } from "lucide-react";

/**
 * Props for AnimeTagFilter component.
 * @interface AnimeTagFilterProps
 * @property {any[]} items - Array of anime items to extract tags from
 * @property {string | null} selectedTag - Currently selected tag filter
 * @property {Function} onTagSelect - Callback when a tag is selected or deselected
 * @property {boolean} showClear - Whether to show the clear filters button
 * @property {Function} onClear - Callback when clear filters button is clicked
 */
interface AnimeTagFilterProps {
    items: any[];
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
    showClear: boolean;
    onClear: () => void;
}

/**
 * Anime Tag Filter Component - interactive tag filtering UI.
 * Extracts unique tags from anime items, displays them as clickable buttons,
 * and provides "All" option and clear filters functionality.
 * 
 * @component
 * @param {AnimeTagFilterProps} props - Component props
 * @returns {JSX.Element | null} Rendered tag filter or null if no tags exist
 * 
 * @example
 * ```tsx
 * <AnimeTagFilter 
 *   items={animeList}
 *   selectedTag={currentTag}
 *   onTagSelect={(tag) => setCurrentTag(tag)}
 *   showClear={!!currentTag}
 *   onClear={() => resetFilters()}
 * />
 * ```
 */
export function AnimeTagFilter({ items, selectedTag, onTagSelect, showClear, onClear }: AnimeTagFilterProps) {
    const hasRecommended = items.some(item => item.recommended);
    const allTags = Array.from(new Set(
        items.flatMap(item => item.tags || [])
    )).sort();

    if (hasRecommended) {
        allTags.unshift("Recommended");
    }

    if (allTags.length === 0) return null;

    return (
        <div className="mb-8">
            {showClear && (
                <div className="mb-4 flex justify-end">
                    <button onClick={onClear} className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-red-500/20 hover:border-red-500/40">
                        <X size={14} /> Clear Filters
                    </button>
                </div>
            )}
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Filter by Tag</h4>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onTagSelect(null)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!selectedTag ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                >
                    All
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTag === tag ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}
