/**
 * @fileoverview Breadcrumbs Component - navigation breadcrumb trail.
 * Displays hierarchical navigation path with home icon and clickable links.
 */

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/**
 * Props for Breadcrumbs component.
 * @interface BreadcrumbsProps
 * @property {Array<{label: string, href?: string}>} items - Array of breadcrumb items
 */
interface BreadcrumbsProps {
    items: {
        label: string;
        href?: string;
    }[];
}

/**
 * Breadcrumbs Component - hierarchical navigation trail.
 * Displays home icon followed by breadcrumb items separated by chevrons.
 * Items can be links or plain text for the current page.
 *
 * @component
 * @param {BreadcrumbsProps} props - Component props
 * @returns {JSX.Element} Rendered breadcrumb navigation
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[
 *   { label: "Books", href: "/books" },
 *   { label: "Fiction" }
 * ]} />
 * ```
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6 bg-gray-50/50 dark:bg-white/5 py-2 px-4 rounded-full w-fit">
            <Link
                href="/"
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-1"
            >
                <Home size={12} />
                <span>~</span>
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight size={12} className="text-gray-300 dark:text-gray-700" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 dark:text-gray-200 font-bold">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
