/**
 * @fileoverview Shelf Skeleton Component - loading placeholder for shelf pages.
 * Displays animated skeleton UI while shelf content is loading.
 */

"use client";

import React from "react";

/**
 * Shelf Skeleton Component - loading state placeholder.
 * Renders animated skeleton elements mimicking the shelf layout
 * including header, search bar, and grid of item placeholders.
 * 
 * @component
 * @returns {JSX.Element} Rendered skeleton loading UI
 * 
 * @example
 * ```tsx
 * {!isLoaded ? <ShelfSkeleton /> : <ShelfContent />}
 * ```
 */
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
                    <div key={i} className="aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                ))}
            </div>
        </div>
    );
}
