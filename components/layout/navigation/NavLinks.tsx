"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/constants";
import { FileText, Book, MonitorPlay, Palette } from "lucide-react";

/**
 * Props for NavLinks component.

 * @property {string} [className] - Optional CSS classes
 * @property {Function} [onItemClick] - Optional callback when link is clicked
 */
interface NavLinksProps {
    className?: string;
    onItemClick?: () => void;
}

/**
 * Modern Navigation Links Component with active state indicators.

 */
export function NavLinks({ className, onItemClick }: NavLinksProps) {
    const pathname = usePathname();

    const links = [
        { href: routes.articleShelf, label: "Articles", icon: FileText },
        { href: routes.bookShelf, label: "Books", icon: Book },
        { href: routes.animeShelf, label: "Anime", icon: MonitorPlay },
        { href: routes.hobbyShelf, label: "Hobby", icon: Palette },
    ];

    return (
        <div className={`flex items-center gap-1 md:gap-2 ${className || ""}`}>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                            isActive
                                ? "text-foreground"
                                : "text-foreground/60 hover:text-foreground"
                        }`}
                        onClick={onItemClick}
                    >
                        <link.icon
                            size={18}
                            className={`transition-transform duration-300 group-hover:scale-110 text-black dark:text-gray-400`}
                        />
                        <span
                            className={`text-[11px] uppercase tracking-widest whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}
                        >
                            {link.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
