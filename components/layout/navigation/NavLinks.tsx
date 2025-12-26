"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
 * Modern Navigation Links Component with active state indicators.
 * @component
 */
export function NavLinks({ className, onItemClick }: NavLinksProps) {
    const pathname = usePathname();

    const links = [
        { href: routes.articleShelf, label: "Articles" },
        { href: routes.bookShelf, label: "Books" },
        { href: routes.animeShelf, label: "Anime" },
        { href: routes.hobbyShelf, label: "Hobby" },
    ];

    return (
        <div className={className}>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`
                            relative px-4 py-2 rounded-xl font-medium text-sm
                            transition-all duration-300 group
                            ${
                                isActive
                                    ? "text-blue-600 dark:text-blue-400 bg-blue-500/10"
                                    : "text-foreground/70 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/5"
                            }
                        `}
                        onClick={onItemClick}
                    >
                        {link.label}
                        {isActive && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
