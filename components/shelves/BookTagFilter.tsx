/**
 * @fileoverview Book Tag Filter Component - provides tag-based filtering for book lists.
 */

"use client";

import React from "react";
import { PillTag } from "@/components/ui/PillTag";
import { Book } from "@/types/definitions";

interface BookTagFilterProps {
    items: Book[];
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
}

export function BookTagFilter({ items, selectedTag, onTagSelect }: BookTagFilterProps) {
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
                        onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                        variant="filter"
                    />
                ))}
            </div>
        </div>
    );
}
