/**
 * @fileoverview Pill Tag Component - reusable pill-shaped tag button.
 * Provides consistent styling for tags across the application.
 */

import React from "react";

/**
 * Props for PillTag component.
 */
interface PillTagProps {
    label: string;
    selected?: boolean;
    dimmed?: boolean;
    onClick?: () => void;
    variant?: "default" | "filter";
}

/**
 * Pill Tag Component - clean black/white pill-shaped tag button.
 */
export function PillTag({
    label,
    selected = false,
    dimmed = false,
    onClick,
    variant = "default",
}: PillTagProps) {
    const displayLabel = label || "Tag";

    // Base styles
    const baseClasses =
        "px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap";

    // Light mode: black text, Dark mode: white text
    const variantClasses = selected
        ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md scale-105 opacity-100"
        : `${
              dimmed
                  ? "bg-gray-100/60 dark:bg-gray-800/60 text-black/40 dark:text-white/40 opacity-70"
                  : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          } hover:bg-gray-200 dark:hover:bg-gray-700 hover:opacity-100 hover:scale-102`;

    const classes = `${baseClasses} ${variantClasses}`;

    if (onClick) {
        return (
            <button
                onClick={(e) => {
                    try {
                        onClick();
                    } catch (error) {
                        console.error("Error clicking PillTag:", error);
                    }
                }}
                className={classes}
            >
                {displayLabel}
            </button>
        );
    }

    return <span className={classes}>{displayLabel}</span>;
}
