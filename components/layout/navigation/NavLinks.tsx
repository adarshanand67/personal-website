"use client";

import Link from "next/link";
import { routes } from "@/lib/constants";

/**
 * Props for NavLinks component.
 * @interface NavLinksProps
 * @property {string} [className] - Optional CSS classes
 * @property {Function} [onItemClick] - Optional callback when link is clicked
 */
interface NavLinksProps {
    className?: string;
    onItemClick?: () => void;
}

/**
 * Navigation Links Component - renders shelf navigation links.
 * Displays links to Articles, Books, Anime, and Hobby shelves.
 * @component
 * @param {NavLinksProps} props - Component props
 */
export function NavLinks({ className, onItemClick }: NavLinksProps) {
    const links = [
        { href: routes.articleShelf, label: "Articles" },
        { href: routes.bookShelf, label: "Books" },
        { href: routes.animeShelf, label: "Anime" },
        { href: routes.hobbyShelf, label: "Hobby" },
    ];

    return (
        <div className={className}>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-xl text-foreground/70 hover:text-green-500 hover:bg-green-500/5 transition-all"
                    onClick={onItemClick}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
