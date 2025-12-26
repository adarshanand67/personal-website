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
    onClick?: () => void;
}

/**
 * Pill Tag Component - clean black/white pill-shaped tag button.
 */
export function PillTag({ label, selected = false, onClick }: PillTagProps) {
    const displayLabel = label || "Tag";

    // Base styles
    const baseClasses =
        "px-4 py-2 rounded-full text-xs transition-all duration-300 whitespace-nowrap";

    // Light mode: black text, Dark mode: white text
    const variantClasses = selected
        ? "text-black dark:text-white scale-110 font-black"
        : "text-black/50 dark:text-white/40 font-bold hover:text-black dark:hover:text-white hover:scale-105";

    const classes = `${baseClasses} ${variantClasses}`;

    if (onClick) {
        return (
            <button
                onClick={() => {
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
