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
    variant?: "default" | "filter";
}

/**
 * Pill Tag Component - clean black/white pill-shaped tag button.
 */
export function PillTag({ label, selected = false, onClick, variant = "default" }: PillTagProps) {
    // Base styles
    const baseClasses =
        "px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap";

    // Light mode: black text, Dark mode: white text
    const variantClasses = selected
        ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md scale-105"
        : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700";

    const classes = `${baseClasses} ${variantClasses}`;

    if (onClick) {
        return (
            <button onClick={onClick} className={classes}>
                {label}
            </button>
        );
    }

    return <span className={classes}>{label}</span>;
}
